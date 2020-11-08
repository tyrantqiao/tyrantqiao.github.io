---
title: vue编程知识点整理
copyright: true
toc: true
author: tyrantqiao
categories: []
abbrlink: 1786f11c
date: 2020-03-22 11:12:29
tags:
---

# vue

## 引用

- `ref`给元素或子组件注册引用信息。引用信息会注册在父组件的$refs对象上
    - 普通的DOM元素：引用指向DOM
    - 子组件：引用指向子组件实例

> `this.$refs`持有当有组件中注册过$refs特效的所有DOM元素和子组件实例