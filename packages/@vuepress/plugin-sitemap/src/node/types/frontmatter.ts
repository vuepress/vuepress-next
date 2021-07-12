import type { SitemapImageOption, SitemapVideoOption } from './sitemap'

export interface SitemapFrontmatterOption {
  /**
   * 更新频率
   *
   * Update Frequency
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
   * 是否不包含此页面
   *
   * Whether to exclude this page from sitemap
   */
  exclude?: boolean
  /**
   * 页面优先级，0.0 - 1.0
   *
   * Priority of this page, supports 0.0 -1.0
   */
  priority?: number
  /**
   * 图片配置
   *
   * Image config
   */
  img?: SitemapImageOption[]
  /**
   * 视频配置
   *
   * Video config
   */
  video?: SitemapVideoOption[]
}
