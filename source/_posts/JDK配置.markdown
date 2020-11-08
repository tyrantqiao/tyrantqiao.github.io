---
title: JDK配置
author: tyrantqiao
tags:
  - java
categories: []
copyright: true
toc: true
abbrlink: ddb8f3d2
date: 2018-08-05 14:01:00
---

# JDK

## JDK与JRE

- JDK
    > Java Development kit，开发工具包
- JRE
    > Java Runtime Environment，java环境【虚拟机、基础类库等】

![diagram](JDK配置/diagram.png)

## path

java path is aiming to conveniently open :

## java.exe

>`java.exe` which is designed for compiling .java to .class.

## javac.exe

> `javac.exe` explain the .class file to executable binary file

## jvm.exe

> `jvm.exe` jvm to load the binary code
In stead of using cmd to run the binary exe above with all path(such as : `c:/java/jdk/bin/java.exe etc.`

When build the path,`JAVA_HOME` jdk should save to a place different from the jre file.In order to prevent the lib path mixing up.

### 设置windowsPath

主要上图，附一些注意事项

![打开设置](JDK配置/openPath.png)
![环境变量](JDK配置/environmentPath.png)
![java和path](JDK配置/JAVA_AND_CLASSPATH.png)
![打开path](JDK配置/openPath.png)
![修改path](JDK配置/path.png)

应该注意修改path时不能加油多余的分号，以及一些就是安装目录路径，%xxx_name%不能写错就可以了