title: java单元测试
author: tyrantqiao
tags:
- test
- java
categories: []
date: 2018-08-05 14:02:00
copyright: true
toc: true
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