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

# 兼容旧浏览器

### 问题

**背景**：不支持`async/await`语法、没有提供对象和数组的各种 API ，甚至不支持箭头函数语法，代码会直接报错，从而导致线上白屏事故等发生。

旧浏览器兼容问题分为两类：

1.  **语法降级问题**：比如某些浏览器不支持箭头函数，则需要将其转为`function(){}`语法
1.  **`polyfill` 缺失**：`Polyfill` 是一种代码库或脚本，用于在不支持某些现代 API 或功能的浏览器中提供这些功能的实现。例如，`Promise`、`fetch`、`Array.prototype.includes`等在旧浏览器中可能不存在。Polyfill 会检测浏览器是否支持某个功能，如果不支持，就提供一个等效的实现。

### 解决方案

想要解决上述的两个兼容问题，那么需要用到工具有：

-   `babel`：可以将现代 `JavaScript` 代码转换为兼容旧浏览器的代码。通过配置 Babel，你可以指定目标浏览器版本，Babel 会自动将不兼容的语法（如箭头函数、let/const、模板字符串等）转换为旧版本的等效语法。代表库如下：

    -   `@babel/preset-env`
    -   `@babel/plugin-transform-runtime`

-   `polyfill`库：`Polyfill`是用来在旧浏览器中实现现代 API 的工具。代表库如下：

    -   `core-js`
    -   `regenerator-runtime`

### 简单实现

> 示例代码：[coding/webpack/babel-browser-support · kankan-web/coding](https://github.com/kankan-web/coding/tree/master/webpack/babel-browser-support)

1.  依赖安装

```bash
pnpm i @babel/cli @babel/core @babel/preset-env
```

-   `@babel/cli`: 为 babel 官方的脚手架工具。
-   `@babel/core`: babel 核心编译库。
-   `@babel/preset-env`: babel 的预设工具集，基本为 babel 必装的库。

2.  示例代码

```js
// index.js 开头加上
import 'core-js';
const func = async () => {
  console.log(12123)
}
Promise.resolve().finally();
```

2.  babel 配置

```json
{
  "presets": [
    [
      "@babel/preset-env", 
      {
        // 指定兼容的浏览器版本
        "targets": {
          "ie": "11"
        },
        // 基础库 core-js 的版本，一般指定为最新的大版本
        "corejs": 3,
        // Polyfill 注入策略，后文详细介绍
        // "useBuiltIns": "entry",
        "useBuiltIns": "usage",//按需导入的配置
        // 不将 ES 模块语法转换为其他模块语法
        "modules": false
      }
    ]
  ]
}
```

3.  代码解释

-   `@babel/preset-env`: 这是一个智能预设，可以根据目标环境自动确定需要的 Babel 插件。它会根据你指定的目标浏览器版本来决定需要转换哪些 JavaScript 特性。
-   `targets`: 这里指定了目标浏览器版本为 Internet Explorer 11。这意味着 Babel 会将代码转换为 IE 11 能够理解的 JavaScript 版本。

-   `corejs`: 指定了使用的 core-js 版本为 3。core-js 是一个 JavaScript 标准库的 polyfill，提供了对新特性的支持。
-   `useBuiltIns`: 设置为`usage`，表示 Babel 会根据代码中实际使用的特性来**按需引入**`polyfill`，而不是引入所有可能的 polyfill。这可以减少最终打包文件的大小。

-   `modules`: 设置为 false，表示不将 ES 模块语法转换为其他模块语法。这通常用于与 Webpack 等工具一起使用，因为它们可以处理 ES 模块。

# vite 兼容方案

用于生产环境的构建包会假设目标浏览器支持现代 JavaScript 语法。默认情况下，Vite 的目标是能够 [支持原生 ESM script 标签](https://caniuse.com/es6-module)、[支持原生 ESM 动态导入](https://caniuse.com/es6-module-dynamic-import) 和 [import.meta](https://caniuse.com/mdn-javascript_operators_import_meta) 的浏览器：

-   Chrome >=87
-   Firefox >=78
-   Safari >=14
-   Edge >=88

你也可以通过 [build.target 配置项](https://cn.vitejs.dev/config/build-options.html#build-target) 指定构建目标，最低支持 es2015。  
想要让vite项目能兼容低版本浏览器，这时候`@vitejs/plugin-legacy`插件便派上用场。

### @vitejs/plugin-legacy

@vitejs/plugin-legacy 是一个 Vite 插件，这个插件内部同样使用 `@babel/preset-env` 以及 `core-js`等一系列基础库来进行语法降级和 Polyfill 注入，以解决在旧版浏览器上的兼容性问题，它主要做了以下几件事：

1.  **配置解析**：插件会读取用户的配置，确定需要支持的浏览器版本和需要应用的 Polyfill。
1.  **Babel 转译**：在构建过程中，插件会使用`@babel/preset-env`将现代 JavaScript 代码转译为兼容旧版浏览器的代码。它会根据配置的目标浏览器版本自动选择需要的 Babel 插件和预设。
1.  **Polyfill 注入**：插件会根据代码中使用的特性和目标浏览器的支持情况，自动注入必要的 Polyfill。通常使用 `core-js`或`regenerator-runtime`来实现这一功能。

-   **Chunk 分离**：为了优化加载性能，插件会将现代代码和转译后的代码分离成不同的 chunk。现代浏览器会加载未转译的代码，而旧版浏览器会加载转译后的代码。
-   **动态加载**：通过在 HTML 中插入条件性脚本标签，插件确保浏览器根据其能力选择加载合适的代码版本。
-   **环境变量注入**：在生产环境中 `import.meta.env.LEGACY` 变量为 `true`。

### 安装与配置

> 示例代码仓库：[vue-template/scripts/config/vite.config.ts · kankan-web/vue-template](https://github.com/kankan-web/vue-template/blob/master/scripts/config/vite.config.ts)

##### 1. 安装依赖

```bash
pnpm install -D @vitejs/plugin-legacy
pnpm install -D terser
```

> 必须安装 Terser，因为旧版插件使用 Terser 进行缩小。

##### 2. 配置插件

```js
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

##### 3. 配置说明

-   **targets**: 指定需要支持的目标浏览器。支持[Browserslist](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbrowserslist%2Fbrowserslist) 配置语法
-   **modernPolyfills**: 可以手动指定要包括的 **modernPolyfills**。**默认值：true**
-   **additionalLegacyPolyfills**: 额外需要的 `polyfills`,例如，在上述配置中，我们添加了 r`egenerator-runtime/runtime`，用于支持异步函式（`async/await`）。**默认值：null**
-   **renderLegacyChunks**: 决定是否生成单独的传统（`Legacy`）代码块。 如果设定为 true，插件将为每个输入文档额外生成一个兼容旧版浏览器的代码块。
-   **polyfills**: 自动注入需要的`polyfills`。**默认值：true**

`Browserslist`是一个帮助我们设置目标浏览器的工具，不光是 `Babel` 用到，其他的编译工具如`postcss-preset-env`、`autoprefix`中都有所应用。对于`Browserslist`的配置内容，你既可以放到 Babel 这种特定工具当中，也可以在`package.json`中通过`browserslist`声明：

```.json
// package.json
{ 
  "browserslist": "ie >= 11"
}
```

或者通过`.browserslistrc`进行声明：

```.browserslistrc
// .browserslistrc
ie >= 11
```

在实际的项目中，一般我们可以将使用下面这些**最佳实践集合**来描述不同的浏览器类型，减轻配置负担:

```.browserslistrc
// 现代浏览器
last 2 versions and since 2018 and > 0.5%
// 兼容低版本 PC 浏览器
IE >= 11, > 0.5%, not dead
// 兼容低版本移动端浏览器
iOS >= 9, Android >= 4.4, last 2 versions, > 0.2%, not dead
```

> 参考： [browserslist.dev](https://link.juejin.cn/?target=https%3A%2F%2Fbrowserslist.dev)

##### 4. 成果检验

```html
<!doctype html>
<html lang="en">
  <head>
    <script type="module" crossorigin src="/static/js/polyfills-BkZzQrfE.js"></script>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue App</title>
    <script type="module" crossorigin src="/static/js/index-DWdc6w4K.js"></script>
    <script type="module">import.meta.url;import("_").catch(()=>1);(async function*(){})().next();if(location.protocol!="file:"){window.__vite_is_modern_browser=true}</script>
    <script type="module">!function(){if(window.__vite_is_modern_browser)return;console.warn("vite: loading legacy chunks, syntax error above and the same error below should be ignored");var e=document.getElementById("vite-legacy-polyfill"),n=document.createElement("script");n.src=e.src,n.onload=function(){System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))},document.body.appendChild(n)}();</script>
  </head>
  <body>
    <div id="app"></div>
    <script nomodule>!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",(function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()}),!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();</script>
    <script nomodule crossorigin id="vite-legacy-polyfill" src="/static/js/polyfills-legacy-ChcCnOOW.js"></script>
    <script nomodule crossorigin id="vite-legacy-entry" data-src="/static/js/index-legacy-BV5FR4q5.js">System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))</script>
  </body>
</html>
```

`index.html`的产物中会出现`Modern`模式和`Legacy`模式的产物。

-   `Modern`产物被放到 `type="module"`的 script 标签中
-   而`Legacy`产物则被放到带有`nomodule`的 script 标签中

<img width="758" alt="image" src="https://github.com/user-attachments/assets/9fc7dff9-bb2a-471d-9d22-b60c17035c3d" />

### polyfills

`polyfills`通常是指为旧版浏览器或不支持某些现代 API 的环境提供的补丁程序。 这些 Polyfills 会在你的应用中引入，从而使旧版浏览器能够支持最新的语法或 API。 这些通常是针对 ES5 及更早版本的浏览器（如 IE11）所需的。

**常见的 polyfills**

-   `core-js`：用来实现多数 ES6+ 的特性，如`Promise`、`Array.from`、`Object.assign` 等。
-   `regenerator-runtime`：用于支持`async/await` 语法
-   `fetch`：提供 ` window.fetch API  `的支持，用于替代`  XMLHttpRequest `。

### modernPolyfills

`modernPolyfills` 是针对现代浏览器中尚未普及的最新特性而设计的补丁。 这些特性可能是相对新的 `JavaScript`语法或 `Web API`，已在部分现代浏览器中实现，但还未在所有现代浏览器中统一支持。

**常见的 modernPolyfills**

-   `IntersectionObserver`：在旧版 Chrome 或 Safari 中为 IntersectionObserver 提供支持。
-   `ResizeObserver`：用于观察元素大小变化的API，可能需要在某些稍微过时的现代浏览器中补充支持。

### ModernPolyfills与 Polyfills 的差异

**相异：**

-   **目标浏览器不同**：`polyfills` 主要针对较旧的浏览器（如 IE11），而 `modernPolyfills` 则是针对较新的浏览器版本，解决某些新特性未完全支持的情况。
-   **支持的语法或API不同**：`polyfills`通常涉及ES5及之前语法的支持，而`modernPolyfills`更专注于ES6及更高版本，或新的Web API的补充。
-   **应用场景不同**：`polyfills` 更适用于需要广泛兼容性的项目，而 `modernPolyfills` 则针对一些仍需支持较新特性但又未完全普及的应用。

**相同：**

`polyfills`和`modernPolyfills`的 Polyfill 说明符字串可以使用下面2种写法：

-   使用文件夹路径：例如`es/symbol`将导入`core-js/es/symbol`
-   使用模块名称：例如`es.object.has-own`将导入`core-js/modules/es.object.has-own.js`

> 参考：[说明符字串参考网站](https://unpkg.com/browse/core-js@3.38.0/)

### 写在最后

> babel 示例代码仓库：[coding/webpack/babel-browser-support at master · kankan-web/coding](https://github.com/kankan-web/coding/tree/master/webpack/babel-browser-support)
> 
> vite 示例代码仓库：[vue-template/scripts/config/vite.config.ts at master · kankan-web/vue-template](https://github.com/kankan-web/vue-template/blob/master/scripts/config/vite.config.ts)

在使用 Vite 开发项目时，如果目标用户群中包含了使用旧版浏览器的案例，@vitejs/plugin-legacy 无疑是必须考虑的插件之一。

如果您看到这里了，并且觉得这篇文章对您有所帮助，希望您能够点赞👍和收藏⭐支持一下作者🙇🙇🙇，感谢🍺🍺！如果文中有任何不准确之处，也欢迎您指正，共同进步。感谢您的阅读，期待您的点赞👍和收藏⭐！

# 参考

1.  [Vite 打包出来的文件如何兼容旧版浏览器？](https://medium.com/@a0988426059/vite-%E6%89%93%E5%8C%85%E5%87%BA%E4%BE%86%E7%9A%84%E6%96%87%E4%BB%B6%E5%A6%82%E4%BD%95%E5%85%BC%E5%AE%B9%E8%88%8A%E7%89%88%E7%80%8F%E8%A6%BD%E5%99%A8-c7effb2bb659)
2.   [【原理揭秘】Vite 是怎么兼容老旧浏览器的？你以为仅仅依靠 Babel？](https://segmentfault.com/a/1190000043617262)
3. [语法降级与polyfill：联合前端编译工具链，消灭低版本浏览器兼容问题](https://juejin.cn/book/7050063811973218341/section/7066611951547187214?enter_from=course_center&utm_source=course_center#heading-8)
