---
title: Java面试题测试，你掌握了吗
author: tyrantqiao
toc: true
date: 2018-11-22 16:24:36
copyright: true
tags:
- 面试
- java
---

# 面试题目类型

## 笔试

### print函数内执行i++

``` java
int i=1;
System.out.println("num is "+ ++i);
```

- 上面代码输出的结果是2.
> PS当➕的顺序为 + + + i时,i就为1

### String是final类吗，final类可以继承吗

> 是，final类不能继承，具体String的详细内容可看另外一篇文章
{% post_link (JDK11)String及其他源码分析 点击我跳转 %}

### `%`与`_`在sql中各自代表了什么

> 前者任意数量任意字符，后者单指一个任意字符
