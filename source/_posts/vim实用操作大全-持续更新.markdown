---
title: vim实用操作大全--持续更新
copyright: true
toc: true
author: tyrantqiao
categories:
  - vim
  - linux
tags:
  - linux
  - vim
abbrlink: a40dca6a
date: 2019-11-05 23:44:46
---
# vim

## 命令

### 快捷键

每当用鼠标或者一些重复工作过多时，可以查看是否有一些快捷键可以代劳，起到提高工作效率的效果。

- 窗口移动
    - 前后翻页 `ctrl+F/B` 
    - 到底部/头部 `g+G/g`
    - 前后翻半页
- 切屏
    - 左右分隔 `ctrl+w v`
    - 上下 `ctrl+w s`
    - 左右移动 `ctrl+w h/l`
    - 上下移动 `ctrl+w j/k`
    - 关闭分层 `ctrl+w c`
    - 左右分隔其他文件 `:vsp file`
- 显示
    - 行号 `:set nu/nonu`
- 执行
    - linux命令 `:r !command`
    - 替换
        - 全局替换 `:%s/xxx/replaceStr/gc/`全局替换字符串并带对话式确认
        - 部分替换 `:n1,n2s/···/···/g`
- 编辑
    - 另起上一行并编辑 `O`
    - 另起下一行并编辑 `o`
    - 前一个/当前/后一个字符编辑 `I/i/a`
- 移动
    - 上/下个单词开头 `b/w`
    - 上/下个单词尾部 `/e`
    - 上/下个单词搜索 `N/n`
    - 括号移动 `%({[]})`
    - 上/下个匹配当前光标 `#/*`