import { logger } from '@vuepress/utils'
import { cyan } from 'chalk'
import { generateSiteMap } from './sitemap'

import type { Plugin } from '@vuepress/core'
import type { SitemapOptions } from './types'

export * from './types'

const sitemapPlugin: Plugin<SitemapOptions> = (options, app) => {
  const { themeConfig } = app.options
  const hostname = options.hostname || (themeConfig.hostname as string)

  if (!hostname) {
    logger.error(`${cyan('Sitemap')}: Required 'hostname' option is missing!`)

    return { name: '@vuepress/plugin-sitemap' }
  }

  const sitemapOptions =
    Object.keys(options).length > 0
      ? { ...options, hostname }
      : { ...((themeConfig.sitemap as SitemapOptions) || {}), hostname }

  return {
    name: '@vuepress/plugin-sitemap',

    async onGenerated(): Promise<void> {
      await generateSiteMap(sitemapOptions, app)
    },
  }
}

export default sitemapPlugin
