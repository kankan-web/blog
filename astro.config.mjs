import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
//关于markdown相关的配置
import remarkMath from 'remark-math' //数学表达式
import remarkDirective from 'remark-directive' //自定义指令
import { remarkEmbed } from './src/plugins/remarkEmbed' //允许插入外部资源
import { remarkSpoiler } from './src/plugins/remarkSpoiler' //允许创建可折叠信息
import { remarkReadingTime } from './src/plugins/remarkReadingTime'
//关于markdown渲染相关配置
import { rehypeHeadingIds } from '@astrojs/markdown-remark' //为每个标题新建一个id
import rehypeKatex from 'rehype-katex' //渲染数学公式
import { rehypeLink } from './src/plugins/rehypeLink' //链接增强
import { rehypeImage } from './src/plugins/rehypeImage' //图片增强
import { rehypeHeading } from './src/plugins/rehypeHeading' //标题头部增强
import { rehypeCodeBlock } from './src/plugins/rehypeCodeBlock' //代码渲染优化
import { rehypeCodeHighlight } from './src/plugins/rehypeCodeHighlight' //语法高亮

// https://astro.build/config
export default defineConfig({
  site: 'https://kankan-blog.vercel.app/',
  base: '/',
  integrations: [mdx(), sitemap(), react(), tailwind(), icon()],
  markdown: {
    syntaxHighlight: false,
    //高亮语法配置
    smartypants: false,
    // 定制 Markdown 构建方式
    //https://docs.astro.build/zh-cn/reference/configuration-reference/#markdownremarkplugins
    remarkPlugins: [remarkMath, remarkDirective, remarkEmbed, remarkSpoiler, remarkReadingTime],
    //定制对你的 Markdown 输出内容的处理方式
    //https://docs.astro.build/zh-cn/reference/configuration-reference/#markdownrehypeplugins
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeKatex,
      rehypeLink,
      rehypeImage,
      rehypeHeading,
      rehypeCodeBlock,
      rehypeCodeHighlight,
    ],
  },
})
