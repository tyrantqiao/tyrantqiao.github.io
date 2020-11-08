---
title: xunit读书笔记--01
copyright: true
toc: true
author: tyrantqiao
categories: []
abbrlink: b10eb5b2
date: 2020-10-11 23:59:10
tags:
---

Xunit test Patterns阅读笔记
=======

重构测试案例
-------

- 关于测试案例代码冗余
    ```java
    XXXObject testObj=new XXXObject();
    testOb.setXXX(1);
    testOb.setXXX2(2);
    testOb.setXXX3(3);
    testOb.setXXX4(4);

    assertEquals(testObj.getXXX(),1);
    assertEquals(testObj.getXXX2(),2;
    assertEquals(testObj.getXXX3(),3);
    assertEquals(testObj.getXXX4(),4);
    ```
    > 这样子比较，会导致制造测试代码以及校验结果的代码**assert**的代码过于冗余，且这部分代码可能另外一个测试案例也是会使用的。
    >    > 所以更推荐的是将校验结果的代码or造的数据代码抽成一个方法或者类进行存储，便于复用代码，同时也使得在校验结果时，直接校验两个对象即可，节省精力。
    `assertEquals(testObj,targetObj);`

更新于10-11晚11.58分，下次继续更新 [nextTime]

[nextTime]: 如何继续重构测试案例
