---
title: (JDK11)类加载源码以及面试题
author: tyrantqiao
tags:
  - java
  - 面试
  - 源码
categories: []
copyright: true
toc: true
abbrlink: e2c80eed
date: 2018-10-23 22:50:00
---

# 类加载

- 核心: `loadClass(String name)`

``` java
protected Class<?> loadClass(String name, boolean resolve)
        throws ClassNotFoundException
{
    //锁定，防止重复加载
    synchronized (getClassLoadingLock(name)) {
        // First, check if the class has already been loaded
        Class<?> c = findLoadedClass(name);
        //是否已经加载
        if (c == null) {
            long t0 = System.nanoTime();
            try {
                //优先父类
                if (parent != null) {
                    c = parent.loadClass(name, false);
                }
                //若父类为null，则使用BootstrapClassLoader
                else {
                    c = findBootstrapClassOrNull(name);
                }
            } catch (ClassNotFoundException e) {
                // ClassNotFoundException thrown if class not found
                // from the non-null parent class loader
            }

            if (c == null) {
                // If still not found, then invoke findClass in order
                // to find the class.
                long t1 = System.nanoTime();
                c = findClass(name);

                //启用自己的，开始记录消耗时间，并且加一找到的类记录
                // this is the defining class loader; record the stats
                PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                PerfCounter.getFindClasses().increment();
            }
        }
        //若已加载的，则直接返回
        if (resolve) {
            resolveClass(c);
        }
        return c;
    }
}
```

- 若loadClass()失败则启用findClass()而这也是用户所应该复写的方法

``` java
protected Class<?> findClass(String name) throws ClassNotFoundException {
        throw new ClassNotFoundException(name);
    }
```

## 双亲委派机制[Parents Delegation Model]

> 这里我觉得理解上时不能纠结于双亲，感觉这里应该是翻译不当。毕竟在加载时首先会委托给*父辈s*【表多个父辈】，eg：用户自定义->应用类->扩展类->启动类  
而不是所谓的“双亲”委派，有时面试还会问为什么有双亲？:smile:

大部分使用双亲委派，还有很多不使用的场景JDK1.2前的findClass()、OSGI、JNDI的SPI接口