---
title: java日常业务开发注意点
copyright: true
toc: true
author: tyrantqiao
categories: []
tags:
  - java
  - 开发
  - 业务
abbrlink: 61e456e2
date: 2020-05-31 16:56:45
---

# java开发注意点

## io

- 读取文件

> 当使用BufferedReader.readLine()读取行时，应注意文件行内存溢出的问题，可以通过org.apache.commons.io.input.BoundedInPutStream对流进行大小限制，再进行readLine()读取

```java
BoundedInputStream bis=new BoundedInputStream(new FileInputStream(new File('xxxx')),10*1024*1024);
InputStreamReader reader=new InputStreamReader(bis,"UTF-8")
***
```

## 比较

- 字符串比较

> 当使用String.compareTo，对string排序时，应注意此处是按位比较，比如“1234” 和 “223”比较，“223”是比“1234”大的，因为它是首字母排序。

```java
    // 底层比较函数
    public static int compareTo(byte[] value, byte[] other, int len1, int len2) {
        int lim = Math.min(len1, len2);

        for(int k = 0; k < lim; ++k) {
            if (value[k] != other[k]) {
                return getChar(value, k) - getChar(other, k);
            }
        }

        return len1 - len2;
    }

    // 测试代码
    public static void main(String[] args) {
        String a = "223";
        String b = "1234";
        String c = "2234";
        System.out.println(a.compareTo(b));
        System.out.println(c.compareTo(b));
    }

    // 输出
    // 1
    // 1
```

## 时间

- SimpleDateFormat
    - 非线程安全，为解决这个问题，上锁或者创建新对象开销大
    - 对于时区以及api不优化，此处主要是兼容旧版api的缘故

```java
    // 类变量
    // public abstract class DateFormat extends Format {
    // protected Calendar calendar;

    private StringBuffer format(Date date, StringBuffer toAppendTo, FieldDelegate delegate) {
        // 私有变量设置时间，当对static修饰对象时产生多时间值
        this.calendar.setTime(date);
        boolean useDateFormatSymbols = this.useDateFormatSymbols();
        int i = 0;

        while(i < this.compiledPattern.length) {
            int tag = this.compiledPattern[i] >>> 8;
            int count = this.compiledPattern[i++] & 255;
            if (count == 255) {
                count = this.compiledPattern[i++] << 16;
                count |= this.compiledPattern[i++];
            }

            switch(tag) {
            case 100:
                toAppendTo.append((char)count);
                break;
            case 101:
                toAppendTo.append(this.compiledPattern, i, count);
                i += count;
                break;
            default:
                this.subFormat(tag, count, delegate, toAppendTo, useDateFormatSymbols);
            }
        }

        return toAppendTo;
    }
```

JDK8下可替换为新的类进行处理：`LocalDateTime`，`Instant`-> 时间戳，`Duration`时间段，`Clock`时钟类，`ZoneId`时区，`ZoneOffset`时区补偿


