title: 动手写mybatis
author: tyrantqiao
tags:
- java
- mybatis
- 源码
categories: []
date: 2019-04-28 10:52:00
copyright: true
toc: true
---

# mybatis

MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生类型、接口和 Java 的 POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

> 这篇文章基于公众号Java技术栈《从 0 开始手写一个 Mybatis 框架，三步搞定！》 [详情点我](https://mp.weixin.qq.com/s/EzkQHVmW2deBXlmj9jIOAg)

这里做了个项目demo，在子module下
{% githubCard user:tyrantqiao repo:Java-Algorithms %}

## 原理以及架构图

> 这里就主要以架构图和原理来进行讲解引述。

![架构图](动手写mybatis/mybatis架构图.jpg)

### Bean类

- Function
    > 存储sql
- MapperBean
    > Interface+ `List<Function>`
- Mapper【UserMapper】
    > 做一个mapper接口类，关联到mapper.xml
- User
    > 用户bean

### 执行器

- Executor
    > ```<T> T query(String statement, Object parameter);```
- MyExecutor
    > 实现接口，建立connection，并执行sql
