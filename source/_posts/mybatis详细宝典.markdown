---
title: mybatis详细宝典
copyright: true
toc: true
author: tyrantqiao
categories: []
abbrlink: 722524ab
date: 2020-02-07 21:03:58
tags:
---

# mybatis

> MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生类型、接口和 Java 的 POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

## 插入语句获取主键id

```xml
<!-- 将select last_insert_id的结果传入到设置的model的主键值中 -->
<selectKey>
    <!-- 对应的model主键名的属性值 -->
    keyProperty="xxx"
    <!-- 主键类别 AFTER/BEFORE -->
    order="AFTER"
    <!-- 主键数据类型 -->
    resultType="type"
<selectKey/>
```
