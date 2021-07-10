# sitemap

<NpmBadge package="@vuepress/plugin-sitemap" />

为你的 VuePress 项目生成 Sitemap。

## Frontmatter 选项

### sitemap.changefreq

- 类型: `"always"|"hourly"|"daily"|"weekly"|"monthly"|"yearly"|"never"`
- 默认值: `"daily"`

页面默认更新频率

### sitemap.exclude

- 类型: `boolean`
- 默认值: `false`

Sitemap 是否不包含此页面

### sitemap.priority

- 类型: `number`
- 默认值: `0.5`

页面优先级，范围 0~1

## 插件选项

### hostname

- 类型: `string`
- 必填: 是

当前网站部署到的域名，请至少将其传入插件选项，或填写 `themeConfig.hostname`，否则插件将无法工作。

### urls

- 类型: `string[]`
- 必填: 否

需要额外包含的网址

### exclude

- 类型: `string[]`
- 必填: 否

不被收录的页面

### outFile

- 类型: `string`
- 默认值: `"sitemap.xml"`

输出的文件名

### changefreq

- 类型: `"always"|"hourly"|"daily"|"weekly"|"monthly"|"yearly"|"never"`
- 默认值: `"daily"`

页面默认更新频率

### dateFormatter

- 类型: `($page: PageComputed) => string`
- 必填: 否

时间格式化器。默认会自动生成时间戳，如果你遇到了时区问题，请设置这个选项。
