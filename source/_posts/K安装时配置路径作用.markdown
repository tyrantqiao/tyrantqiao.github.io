title: JDK安装时配置路径作用
author: tyrantqiao
tags:
  - java
categories: []
date: 2018-08-05 14:01:00
copyright: true
toc: true
---
java path is aiming to conveniently open :
 - `java.exe` which is designed for compiling .java to .class.
 - `javac.exe` explain the .class file to executable binary file
 - `jvm.exe` jvm to load the binary code
In stead of using cmd to run the binary exe above with all path(such as : `c:/java/jdk/bin/java.exe etc.`

When build the path,`JAVA_HOME` jdk should save to a place different from the jre file.In order to prevent the lib path mixing up.
