---
title: 'Vite 打包出来的文件如何兼容旧版浏览器？'
description: '使用 @vitejs/plugin-legacy 使 Vite 项目兼容旧版浏览器。'
pubDate: '2024-12-10'
heroImage: '/src/assets/img/vite.png'
date: 2024-12-10
lastMod: 2024-12-10T07:29:49.820Z
tags: [vite]
category: 例子
summary: 本文介绍如何在 Vite 项目中使用 @vitejs/plugin-legacy 插件，使打包出来的文件兼容旧版浏览器。
---

用于生产环境的构建包会假设目标浏览器支持现代 JavaScript 语法。默认情况下，Vite 的目标是能够 [支持原生 ESM script 标签](https://caniuse.com/es6-module)、[支持原生 ESM 动态导入](https://caniuse.com/es6-module-dynamic-import) 和 [import.meta](https://caniuse.com/mdn-javascript_operators_import_meta) 的浏览器：

- Chrome >=87
- Firefox >=78
- Safari >=14
- Edge >=88

你也可以通过 [build.target 配置项](https://cn.vitejs.dev/config/build-options.html#build-target) 指定构建目标，最低支持 es2015。想要让 Vite 项目能兼容低版本浏览器，这时候 @vitejs/plugin-legacy 插件便派上用场。

### @vitejs/plugin-legacy 是什么？

@vitejs/plugin-legacy 是一个 Vite 插件，用来解决在旧版浏览器上的兼容性问题，它主要做了以下几件事：

1. **Polyfills 注入**：根据目标浏览器自动注入所需的 Polyfills，以支持 ES6+ 语法。
2. **转换现代语法**：使用 [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) 将现代 JavaScript 语法转换为 ES5，使其能够在不支持新语法的浏览器上运行。
3. **动态加载兼容性脚本**：自动生成一个兼容性检查脚本，用于判断浏览器是否支持 ES6 模块，如果不支持，则加载转译后的脚本。
4. **环境变量注入**：在生产环境中 `import.meta.env.LEGACY` 变量为 `true`。

### 安装与配置

#### 1. 安装依赖

```bash
pnpm install -D @vitejs/plugin-legacy
pnpm install -D terser
```

> 必须安装 Terser，因为旧版插件使用 Terser 进行缩小。

#### 2. 配置插件

```javascript
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['ie >= 11', 'chrome 52', 'Android 4.1', 'iOS 7.1'],
      modernPolyfills: true,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  build: {
    target: ['es2015', 'chrome52'],
    minify: 'terser',
  },
})
```

#### 配置说明

@vitejs/plugin-legacy 的配置：

- **targets**: 指定需要支持的目标浏览器。如果未设置，插件将加载 browserslist 配置来源或者加载 package.json 中的 browserslist。
- **modernPolyfills**: 可以手动指定要包括的 modernPolyfills。默认值：`true`
- **additionalLegacyPolyfills**: 额外需要的 polyfills，例如，在上述配置中，我们添加了 `regenerator-runtime/runtime`，用于支持异步函数（async/await）。默认值：`null`
- **renderLegacyChunks**: 决定是否生成单独的传统（Legacy）代码块。如果设定为 `true`，插件将为每个输入文档额外生成一个兼容旧版浏览器的代码块。
- **polyfills**: 自动注入需要的 polyfills。默认值：`true`

### ModernPolyfills与 Polyfills 的差异

Polyfills 通常是指为旧版浏览器或不支持某些现代 API 的环境提供的补丁程序。这些 Polyfills 会在你的应用中引入，从而使旧版浏览器能够支持最新的语法或 API。这些通常是针对 ES5 及更早版本的浏览器（如 IE11）所需的。

#### 常见的 polyfills 包括：

- **core-js**：用来实现多数 ES6+ 的特性，如 Promise、Array.from、Object.assign 等。
- **regenerator-runtime**：用于支持 async/await 语法
- **fetch**：提供 window.fetch API 的支持，用于替代 XMLHttpRequest。

ModernPolyfills 是针对现代浏览器中尚未普及的最新特性而设计的补丁。这些特性可能是相对新的 JavaScript 语法或 Web API，已在部分现代浏览器中实现，但还未在所有现代浏览器中统一支持。

#### 常见的 modernPolyfills 包括：

- **IntersectionObserver**：在旧版 Chrome 或 Safari 中为 IntersectionObserver 提供支持。
- **ResizeObserver**：用于观察元素大小变化的 API，可能需要在某些稍微过时的现代浏览器中补充支持。

#### 差异总结

- **目标浏览器不同**：polyfills 主要针对较旧的浏览器（如 IE11），而 modernPolyfills 则是针对较新的浏览器版本，解决某些新特性未完全支持的情况。
- **支持的语法或 API 不同**：polyfills 通常涉及 ES5 及之前语法的支持，而 modernPolyfills 更专注于 ES6 及更高版本，或新的 Web API 的补充。
- **应用场景不同**：polyfills 更适用于需要广泛兼容性的项目，而 modernPolyfills 则针对一些仍需支持较新特性但又未完全普及的应用。

#### Polyfill 说明符

Polyfills 和 modernPolyfills 的 Polyfill 说明符字符串可以使用下面两种写法：

- 使用文件夹路径：例如 `es/symbol` 将导入 `core-js/es/symbol`
- 使用模块名称：例如 `es.object.has-own` 将导入 `core-js/modules/es.object.has-own.js`

> 参考：[说明符字符串参考网站](https://unpkg.com/browse/core-js@3.38.0/)

### 如何运作？

@vitejs/plugin-legacy 插件会生成一个脚本，该脚本会在页面加载时检查浏览器是否支持 ES 模块。如果不支持，则动态加载经过转译的脚本。

#### 如何查看是否有成功使用 Polyfills？

- 在打包生成的 assets 文件夹里确认是否有 `polyfills-xxxxxxx.js`，并且在 `index.html` 中找到下面的代码
- `polyfills-xxxxxxx.js` 是根据 modernPolyfills 手动指定的项目所生成的
- 在打包生成的 assets 文件夹里确认是否有 `polyfills-legacy-xxxxxxx.js`，并且在 `index.html` 中找到下面的代码
- `index-legacy-xxxxxxx.js` 是根据项目的主要业务逻辑代码，这些代码已经过转译来支持旧版浏览器
- `polyfills-legacy-xxxxxxx.js` 是根据 targets 以及 polyfills 手动指定的项目所生成的
- `index-legacy-xxxxxxx.js` 通常在 `polyfills-legacy-xxxxxxx.js` 之后被加载，因为项目主代码依赖于这些 Polyfills

### 结论

在使用 Vite 开发项目时，如果目标用户群中包含了使用旧版浏览器的案例，@vitejs/plugin-legacy 无疑是必须考虑的插件之一。通过本文的介绍，希望能够更好地理解并使用这个工具，从而打造出兼具现代化与兼容性的前端应用。

### 参考

- [Vite 官方文档](https://vitejs.dev/)
- [@vitejs/plugin-legacy GitHub](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)
