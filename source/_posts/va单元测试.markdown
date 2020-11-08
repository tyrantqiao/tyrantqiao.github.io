---
title: java单元测试
author: tyrantqiao
tags:
  - test
  - java
categories: []
copyright: true
toc: true
abbrlink: ae68e151
date: 2018-08-05 14:02:00
---

- @Test -- 转为测试method
  
- @ParameterizedTest

    **method必须设为public void**

- 搭配Stream,快速测试各种数据.
  
@ValueSource(ints, strings={})
@MethodSource("method_name")

``` java
public Stream<String> method_name(){
    return Stream.of(``,``);
}
```