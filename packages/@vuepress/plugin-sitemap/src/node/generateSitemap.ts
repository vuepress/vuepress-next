import { withSpinner } from '@vuepress/utils'
import { cyan } from 'chalk'
import { createWriteStream, readFile, existsSync, writeFile } from 'fs-extra'
import { SitemapStream } from 'sitemap'

import type { App, Page, PageData } from '@vuepress/core'
import type { GitData } from '@vuepress/plugin-git'
import type {
  SitemapFrontmatterOption,
  SitemapLinkOption,
  SitemapImageOption,
  SitemapVideoOption,
  SitemapOptions,
} from './types'

interface SitemapPageInfo {
  lastmod: string
  changefreq?: string
  priority?: number
  img?: SitemapImageOption[]
  video?: SitemapVideoOption[]
  alternateLinks?: SitemapLinkOption[]
}

const stripLocalePrefix = (
  page: Page
): {
  /** path of '/' */
  defaultPath: string
  /** Locale path prefix of the page */
  pathLocale: string
} => ({
  defaultPath: page.path.replace(page.pathLocale, '/'),
  pathLocale: page.pathLocale,
})

const generatePageMap = (
  options: SitemapOptions,
  app: App
): Map<string, SitemapPageInfo> => {
  const {
    changefreq = 'daily',
    exclude = [],
    dateFormatter = (page: PageData & { git?: GitData }): string => {
      const { git = {} } = page

      return git.updatedTime ? new Date(git.updatedTime).toISOString() : ''
    },
  } = options

  const {
    pages,
    options: { base, locales },
  } = app

  const pageLocalesMap = pages.reduce(
    (map: Map<string, string[]>, page) => {
      const { defaultPath, pathLocale } = stripLocalePrefix(page)
      const pathLocales = map.get(defaultPath) || []
      pathLocales.push(pathLocale)

      return map.set(defaultPath, pathLocales)
    },
    // a map with keys of defaultPath and string[] value with pathLocales
    new Map()
  )

  const pagesMap = new Map<string, SitemapPageInfo>()

  pages.forEach((page) => {
    const frontmatterOptions: SitemapFrontmatterOption =
      (page.frontmatter.sitemap as SitemapFrontmatterOption) || {}

    const metaRobotTags = (page.frontmatter.head || []).find(
      (head) => head[1].name === 'robots'
    )

    const excludePage = metaRobotTags
      ? ((metaRobotTags[1].content as string) || '')
          .split(/,/u)
          .map((content) => content.trim())
          .includes('noindex')
      : frontmatterOptions.exclude

    if (excludePage) exclude.push(page.path)

    const lastmodifyTime = dateFormatter(page)
    const { defaultPath } = stripLocalePrefix(page)
    const relatedLocales = pageLocalesMap.get(defaultPath) || []

    let alternateLinks: SitemapLinkOption[] = []

    if (relatedLocales.length > 1)
      alternateLinks = relatedLocales.map((localePrefix) => ({
        lang: locales[localePrefix].lang || 'en',
        url: `${base}${defaultPath.replace(/^\//u, localePrefix)}`,
      }))

    pagesMap.set(page.path, {
      alternateLinks,
      changefreq: changefreq,
      lastmod: lastmodifyTime,
      ...frontmatterOptions,
    })
  })

  return pagesMap
}

export const generateSiteMap = async (
  options: SitemapOptions,
  app: App
): Promise<void> => {
  const { urls = [], xslUrl, exclude = [], xmlNameSpace: xmlns } = options
  const hostname = options.hostname.replace(/\/$/u, '')
  const outFile = options.outFile
    ? options.outFile.replace(/^\//u, '')
    : 'sitemap.xml'
  const {
    dir,
    options: { base },
  } = app

  await withSpinner(`Generating sitemap to ${cyan(outFile)}`)(
    () =>
      new Promise<void>((resolve) => {
        const sitemap = new SitemapStream({
          hostname,
          xslUrl,
          xmlns,
        })
        const pagesMap = generatePageMap(options, app)
        const sitemapXMLPath = dir.dest(outFile)
        const writeStream = createWriteStream(sitemapXMLPath)

        sitemap.pipe(writeStream)

        pagesMap.forEach((page, path) => {
          if (!exclude.includes(path))
            sitemap.write({
              url: `${base}${path.replace(/^\//u, '')}`,
              ...page,
            })
        })

        urls.forEach((item) => sitemap.write(item))
        sitemap.end(() => {
          resolve()
        })
      })
  )

  await withSpinner(`Appended sitemap path to ${cyan('robots.txt')}`)(
    async () => {
      const robotTxtPath = dir.dest('robots.txt')
      const robotsTxt = existsSync(robotTxtPath)
        ? await readFile(robotTxtPath, { encoding: 'utf8' })
        : ''

      const newRobotsTxtContent = `${robotsTxt.replace(
        /^Sitemap: .*$/u,
        ''
      )}\nSitemap: ${hostname}${base}${outFile}\n`

      await writeFile(robotTxtPath, newRobotsTxtContent, { flag: 'w' })
    }
  )
}
