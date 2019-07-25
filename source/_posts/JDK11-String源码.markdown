title: JDK11-String源码
author: tyrantqiao
tags:
  - java
  - 面试
  - 源码
categories: []
toc: true
date: 2018-10-23 22:56:00
copyright: true
---

# 使用版本:JDK10.0.1

先从String的源码开始解析，然后再慢慢拓展到相关的部分

## 首先是从String开头源码开始解读

``` java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence
```

### Serializable

`Serializable` 实现这个接口可以使得对象序列化。

使用场景：

1. 像在使用MyBatis之类的映射时，我们往往需要让entity类实现这个接口。
2. 我们需要保存对象流时，就需要实现这个接口，然后通过以下代码实现

``` java
FileOutputStream fileOutputStream=new FileOutputStream(".");
ObjectOutputStream objectOutputStream=new ObjectOutputStream(fileOutputStream);
objectOutputStream.write(Integer.parseInt(a));
```

> 应该注意实现序列化接口，不代表就能序列，首先这个类的属性也得是序列化，比如String就是属于序列化属性的，或者像我们数据类`abstract class Number implements java.io.Serializable`。

### Comparable

`Comparable<String>` 使得String对象可以有各种各样的操作。

`String`通过复写`int compareTo(T o)`实现比较操作：

``` java
public int compareTo(String anotherString) {
        byte v1[] = value;
        byte v2[] = anotherString.value;
        if (coder() == anotherString.coder()) {
            return isLatin1() ? StringLatin1.compareTo(v1, v2)
                                : StringUTF16.compareTo(v1, v2);
        }
        return isLatin1() ? StringLatin1.compareToUTF16(v1, v2)
                            : StringUTF16.compareToLatin1(v1, v2);
}
```

> 像这里就可以问Comparable和Comparator的区别？
> 前者可以和自己比较，而后者则不行

### CharSequence

`CharSequence` 提供可读序列元素接口

方法:

1. charAt()
2. chars()
3. toString()等等

#### final

`final` 每个String类都是不可变的，我们日常对它的操作只是对引用操作。

``` java
String a="hello"
a="world"
```

这里a引用指向world而已，而hello就废置了，等待GC回收
  > final使得String不可变，每个String的值都会存入常量值，当调用时若相同值则两者是同一个对象。虽然**String**、**StringBuilder**、**StringBuffer**都是以final标注的，但后两者是以**AbstractStringBuilder**的`byte value[]`来存储字符串的

### 继续源码部分

#### 存放以及格式

``` java
@Stable
private final byte[] value;
private final byte coder;
/** Cache the hash code for the string */
private int hash; // Default to 0

/** use serialVersionUID from JDK 1.0.2 for interoperability */
private static final long serialVersionUID = -6849794470754667710L;
```

> `@Stable` 用来标注最多修改一次的变量，当用于数组时也就保证数组永远不为null，且虚拟机HotSpot VM通过这个注解确保non-null component to a constant。PS：这个标注仅针对了用启动类Bootstrap ClassLoader加载的类【java.开头的类】**coder** 【encoding】LATIN1和UTF16

``` java
static final boolean COMPACT_STRINGS;

static {
    COMPACT_STRINGS = true;
}
```

> 当为false时，以UTF16形式存在，不过通常这个东西其实意义不大，主要是当它为true时，然后我们在一些对性能敏感的操作时，可以通过检测这个是不是用LATIN1形式存在的，若是的话，则可以借此进行优化【JIT Compiler】

#### 流

``` java
private static final ObjectStreamField[] serialPersistentFields =
        new ObjectStreamField[0];
```

> 每个对象都会以流的形式存储，结构紧凑，高效阅读的缘故，想象一下字节流，就会好理解很多了。