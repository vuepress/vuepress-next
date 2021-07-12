export interface SitemapImageOption {
  /** The URL of the image. */
  url: string
  /** The caption of the image. */
  caption?: string
  /** The title of the image. */
  title?: string
  /** The geographic location of the image. */
  geoLocation?: string
  /** A URL to the license of the image. */
  license?: string
}

export interface SitemapVideoOption {
  /** A URL pointing to the video thumbnail image file */
  'thumbnail_loc': string
  /** The title of the video. */
  'title': string
  /** A description of the video. Maximum 2048 characters. */
  'description': string
  /**
   * A URL pointing to the actual video media file. Should be one of the supported formats.
   * HTML is not a supported format. Flash is allowed, but no longer supported on most mobile platforms,
   * and so may be indexed less well. Must not be the same as the <loc> URL.
   */
  'content_loc'?: string
  /**
   * A URL pointing to a player for a specific video. Usually this is the information
   * in the src element of an <embed> tag. Must not be the same as the <loc> URL
   */
  'player_loc'?: string
  /** a string the search engine can append as a query param to enable automatic playback */
  'player_loc:autoplay'?: string
  /** duration of video in seconds */
  'duration'?: number
  /** The date after which the video will no longer be available */
  'expiration_date'?: string
  /** The number of times the video has been viewed. */
  'view_count': number
  /** The date the video was first published, in W3C format. */
  'publication_date'?: string
  /**
   * A short description of the broad category that the video belongs to.
   * This is a string no longer than 256 characters.
   */
  'category'?: string
  /** Whether to show or hide your video in search results from specific countries. */
  'restriction'?: string
  'restriction:relationship'?: string
  /** The price to download or view the video. Omit this tag for free videos. */
  'price'?: string
  /** Specifies the resolution of the purchased version. Supported values are hd and sd. */
  'price:resolution'?: string
  /** Specifies the currency in ISO 4217 format. */
  'price:currency'?: string
  /** Specifies the purchase option. Supported values are rent and own. */
  'price:type'?: string
  /** The video uploader's name. Only one video:uploader is allowed per video. String value, max 255 characters. */
  'uploader'?: string
  /** Whether to show or hide your video in search results on specified platform types. This is a list of space-delimited platform types. See https://support.google.com/webmasters/answer/80471?hl=en&ref_topic=4581190 for more detail */
  'platform'?: string
  'platform:relationship'?: 'Allow' | 'Deny'
  'id'?: string
  /**
   * An arbitrary string tag describing the video.
   * Tags are generally very short descriptions of key concepts associated with a video or piece of content.
   */
  'tag'?: string[]
  /** The rating of the video. Supported values are float numbers */
  'rating'?: number
  'family_friendly'?: 'YES' | 'NO'
  /** Indicates whether a subscription (either paid or free) is required to view the video. */
  'requires_subscription'?: 'YES' | 'NO'
  /** Indicates whether the video is a live stream. Supported values are yes or no. */
  'live'?: 'YES' | 'NO'
}

export interface SitemapLinkOption {
  lang: string
  url: string
}
