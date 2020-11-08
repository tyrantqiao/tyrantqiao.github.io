---
title: hexo 一些故障处理与解决方案【持续更新】
author: tyrantqiao
tags:
  - hexo
  - bug
categories: []
copyright: true
toc: true
abbrlink: f2da8e98
date: 2018-10-16 14:00:00
---

# hexo故障解决方案

## npm缓慢

> 推荐转为使用yarn，安装完后在根目录下执行yarn install即可，一般这样就执行成功了。

## Bug1: yarn无法安装hexo-deployer-git

使用`yarn global add hexo-deployer-git`
> 当然这样就导致没办法指定版本了，或者可以选择再次切换回去。

## Bug2: hexo command not found

`yarn global add hexo-cli`

`npm install hexo-cli --save -g`
> 重点在于全局安装

### 希望备份博客，下载回来后无法安装

这里使用的是知乎张钊的方法
[知乎链接](https://www.zhihu.com/question/21193762)

```code
deploy:
  - type: git
    repo: git@github.com:xxx/xxx.github.io.git
    branch: master
  - type: git
    repo: git@github.com:xxx/xxx.github.io.git
    branch: src
    message: commit message
    extend_dirs: /
    ignore_hidden: false
    ignore_pattern:
        public: .
```

> 当deploy时会发现xxxgit失败，因为.deploy_git下会有部分文件无法覆盖提交= V =这就只能删掉.deploy_git才重新deploy了。目前没找到其他解决方案，欢迎提供。

#### 备份

当拉了备份文件时，记得要下载nodejs新版本以及在根目录下执行`npm install`或者`yarn install`安装依赖。