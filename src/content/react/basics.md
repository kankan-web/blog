---
title: React 基础入门
description: 学习 React 的核心概念和基本用法
pubDate: 2024-03-20
category: react
tags: ["基础", "React"]
isBase: true
---

# React 基础入门

React 是一个用于构建用户界面的 JavaScript 库，让我们从基础概念开始学习。

## 组件

React 应用是由组件构建的。组件是可重用的 UI 片段，它可以接受输入（称为 props）并返回要显示的 React 元素。

### 函数组件

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 类组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## JSX

JSX 是 JavaScript 的语法扩展，它允许你在 JavaScript 代码中编写类似 HTML 的代码。

```jsx
const element = (
  <div>
    <h1>Welcome to React</h1>
    <p>This is JSX</p>
  </div>
);
```

## Props

Props 是组件的输入，它们是从父组件传递给子组件的数据。

```jsx
function User(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Age: {props.age}</p>
    </div>
  );
}

// 使用组件
<User name="John" age={25} />;
```
