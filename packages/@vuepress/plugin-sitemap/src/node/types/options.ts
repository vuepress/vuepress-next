import type { PageData } from '@vuepress/core'

export type DateFormatter = (
  page: PageData & { lastUpdatedTime?: number }
) => string

/** Sitemap 配置选项 */
export interface SitemapOptions {
  /**
   * 网站域名
   *
   * domain which to be deployed to
   */
  hostname: string
  /**
   * 需要额外包含的网址
   *
   * Extra urls to be included
   */
  urls?: string[]
  /**
   * 不被收录的页面
   *
   * Urls to be excluded
   */
  exclude?: string[]
  /**
   * 输出的文件名
   *
   * Output file name
   *
   * @default 'sitemap.xml'
   */
  outFile?: string
  /**
   * 页面默认更新频率
   *
   * Page default update frequency
   *
   * @default "daily"
   */
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  /**
   * 时间格式化器
   *
   * Date format function
   */
  dateFormatter?: DateFormatter
  xslUrl?: string
  /** XML namespaces to turn on - all by default */
  xmlNameSpace?: {
    news: boolean
    video: boolean
    xhtml: boolean
    image: boolean
    custom?: string[]
  }
}
