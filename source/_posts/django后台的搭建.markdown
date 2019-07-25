---
title: django后台的搭建
date: 2019-07-11 23:40:47
tags:
author: tyrantqiao
categories: []
toc: true
copyright: true
---

# django后台

> 许久没有写博客了，这里带来的是django作为后台服务器的实现方式，有一个已经实现的项目是react的前端+django的后端+部署以docker的形式搭建。

这个项目是为了实现物联网平台的需求，前后端分离，支持与mqtt服务器进行连接，项目中也接入了高德地图api进行位置的标记，在部署和安装上通过一键脚本sh以及docker进行部署管理。

{% githubCard user:tyrantqiao repo:dataPlatform %}

## 环境

> 这个晚点贴上来，或者查看项目中的requirments.txt文件查看

## 注意事项

### mysql

使用mysql要有配套的软件mysqlclient等

### Host配置

如果需要对外服务的，那么服务就要配置`allowedHost: ['*']`

> 这里配置的是对所有的ip都允许访问

### app_name

django2.0后改为`include('api.urls')`

> 同时应注意django2.0后很多api发生了改变，所以本篇文章将不适配2.0前的版本，同时也会与很多老文章有很大的差入。

## 配置

> 这里晚点再贴一份使用文档进行说明
