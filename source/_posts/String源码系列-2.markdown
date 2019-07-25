---
title: string源码系列-2
author: tyrantqiao
tags:

- 源码
- java

categories: []
date: 2019-05-29 13:55:00
copyright: true
toc: true
---

# String

## 编码

### UTF8

> UTF-8（8-bit Unicode Transformation Format）是一种针对Unicode的可变长度字符编码， 也是一种前缀码。 它可以用来表示Unicode标准中的任何字符， 且其编码中的第一个字节仍与ASCII兼容， 这使得原来处理ASCII字符的软件无须或只须做少部分修改， 即可继续使用。 
> UTF-8使用一至六个字节为每个字符编码（尽管如此， 2003年11月UTF-8被RFC 3629重新规范， 只能使用原来Unicode定义的区域， U+0000到U+10FFFF， 也就是说最多四个字节）

>

> --- ***wiki***

### latin1

> ISO 8859-1， 正式编号为ISO/IEC 8859-1:1998， 又称Latin-1或“西欧语言”， 是国际标准化组织内ISO/IEC 8859的第一个8位字符集。 它以ASCII为基础， 在空置的0xA0-0xFF的范围内， 加入96个字母及符号， 藉以供使用附加符号的拉丁字母语言使用。 

>

> --- ***wiki***

## 方法解释

### indexOf()

> 检查边界、 编码， 然后从fromIndex迭代找出相等的， 然后返回下标index

```java
public static int indexOf(byte[] value, int ch, int fromIndex) {
    if (!canEncode(ch)) {
        return -1;
    }
    int max = value.length;
    if (fromIndex < 0) {
        fromIndex = 0;
    } else if (fromIndex >= max) {
        // Note: fromIndex might be near -1>>>1.
        return -1;
    }
    byte c = (byte)ch;
    for (int i = fromIndex; i < max; i++) {
        if (value[i] == c) {
            return i;
        }
    }
    return -1;
}
```

### subString()

> 检查边界， 然后以给定的边界值创建新的对象， 对象创建时最后是用Arrays.copyOfRange来实现的

```java
public String substring(int beginIndex, int endIndex) {
    int length = length();
    checkBoundsBeginEnd(beginIndex, endIndex, length);
    int subLen = endIndex - beginIndex;
    if (beginIndex == 0 && endIndex == length) {
        return this;
    }
    return isLatin1() ? StringLatin1.newString(value, beginIndex, subLen)
                        : StringUTF16.newString(value, beginIndex, subLen);
}

public static String newString(byte[] val, int index, int len) {
    return new String(Arrays.copyOfRange(val, index, index + len),
                        LATIN1);
}
```

### replace()

> pattern就不做多介绍了，以后再分析下pattern是如何实现匹配的

```java
public String replaceAll(String regex, String replacement) {
    return Pattern.compile(regex).matcher(this).replaceAll(replacement);
}
```