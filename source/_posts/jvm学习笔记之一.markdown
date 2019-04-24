---
title: jvm学习笔记之一
author: tyrantqiao
toc: true
date: 2018-12-19 21:16:23
copyright: true
tags:
- java
- jvm
- 学习笔记
---
# JVM

> Java Virtual Machine,用户只需生成在java虚拟机上运行的代码，即可在多个平台上的虚拟机上运行(一次编译，到处运行)
> 这也是借助了class字节码文件的格式实现的

## Class

> 对应唯一的类or接口，但类和接口不一定要通过文件来生成，可以通过`class loader`生成

### class格式

> 大致由无符号数、表以及前置的容量计数器和数据项集合组成

#### class具体内容

- （前8字节）商标+版本号
  - （前4字节）Magic Num
    > 标记类型，第一次身份验证CAFEBABAY(这也是为什么java也叫做咖啡☕的原因)
  - （后4字节）Java version Num
    > 次版本+主版本
    > eg： 00 00 00 2D 后面的002D=45,对应于主办本JDK1.1。这也是一种保护，防止不匹配的版本代码被执行

- 常量池（存放data）
  > u2的常量池容量计数值(CONSTANT_POOL_COUNT)从1开始计算，0用作指向常量池的索引，同时也是只有这个是从1开始计算的
  - 字面量【literal】
    > 第一位为u1的标志位（标记为什么常量类型，属于CONSTANT_UTF8_info）
  - 符号引用【Symbolic Reference】
    - 类、接口全限定名【Fully Qualified Name】
    - 字段名称、描述符【Descriptor】
    - 方法名称、描述符