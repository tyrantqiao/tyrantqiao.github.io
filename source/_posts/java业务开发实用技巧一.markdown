---
title: java业务开发实用技巧一
copyright: true
toc: true
author: tyrantqiao
categories: []
abbrlink: c074f669
date: 2020-08-30 18:15:11
tags:
---

# java

> 基于JDK1.8

## 类型转换

```java
    /**
     * 自带去0的操作，转换时
     *             while (i < len) {
     *                 // Accumulating negatively avoids surprises near MAX_VALUE
     *                 int digit = Character.digit(s.charAt(i++), radix);
     *                 if (digit < 0 || result < multmin) {
     *                     throw NumberFormatException.forInputString(s, radix);
     *                 }
     *                 result *= radix;
     *                 if (result < limit + digit) {
     *                     throw NumberFormatException.forInputString(s, radix);
     *                 }
     *                 result -= digit;
     *             }
     *             
     */
    @Test
    public void testTransferZero() {
        String s = "000000001";
        String s2 = "00000001.2";
        Assertions.assertEquals(Integer.parseInt(s), 1);
        Assertions.assertEquals(new BigDecimal(s2).toString(), "1.2");
    }
```


## 正则

```java
    /**
     * split函数不加-1等限制分隔数目的话，对于s这类的字符串，末尾的空白是不会纳入期内的
     *
     * 
     * 结果如下：
     * [1, 2, 3]
     * [1, 2, , 3]
     * [1, 2, 3, ]
     */
    @Test
    public void testSplit() {
        String s = "1,2,3,";
        System.out.println(Arrays.toString(s.split(",")));
        String s2 = "1,2,,3";
        System.out.println(Arrays.toString(s2.split(",")));

        System.out.println(Arrays.toString(s.split(",", -1)));

        assert Arrays.asList(s.split(",", -1)).size() != 3;
    }
```

