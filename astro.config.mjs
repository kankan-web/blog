// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

import react from '@astrojs/react'

//关于markdown相关的配置
import remarkMath from 'remark-math' //数学表达式
import remarkDirective from 'remark-directive' //自定义指令
import { remarkEmbed } from './src/plugins/remarkEmbed' //允许插入外部资源
import { remarkSpoiler } from './src/plugins/remarkSpoiler' //允许创建可折叠信息
import { remarkReadingTime } from './src/plugins/remarkReadingTime' //计算阅读时间
//关于markdown渲染相关配置
import { rehypeHeadingIds } from '@astrojs/markdown-remark' //为每个标题新建一个id
import rehypeKatex from 'rehype-katex' //渲染数学公式
import { rehypeLink } from './src/plugins/rehypeLink' //链接增强
import { rehypeImage } from './src/plugins/rehypeImage' //图片增强
import { rehypeHeading } from './src/plugins/rehypeHeading' //标题头部增强
import { rehypeCodeBlock } from './src/plugins/rehypeCodeBlock' //代码渲染优化

// https://astro.build/config
export default defineConfig({
  base: '/',
  integrations: [tailwind(), react()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-dark',
        dark: 'github-dark',
      },
      wrap: true,
    },
    remarkPlugins: [remarkMath, remarkDirective, remarkEmbed, remarkSpoiler, remarkReadingTime],
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeKatex,
      rehypeLink,
      rehypeImage,
      rehypeHeading,
      rehypeCodeBlock,
    ],
  },
})
