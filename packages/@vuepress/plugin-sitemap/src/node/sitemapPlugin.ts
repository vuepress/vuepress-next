import { logger } from '@vuepress/utils'
import { cyan } from 'chalk'
import { generateSiteMap } from './generateSitemap'

import type { Plugin } from '@vuepress/core'
import type { SitemapOptions } from './types'

export const sitemapPlugin: Plugin<SitemapOptions> = (options, app) => {
  if (!options.hostname) {
    logger.error(`${cyan('Sitemap')}: Required 'hostname' option is missing!`)

    return { name: '@vuepress/plugin-sitemap' }
  }

  return {
    name: '@vuepress/plugin-sitemap',

    async onGenerated(): Promise<void> {
      await generateSiteMap(options as SitemapOptions, app)
    },
  }
}
