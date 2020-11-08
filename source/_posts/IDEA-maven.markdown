---
title: IDEA-maven
author: tyrantqiao
toc: true
copyright: true
tags:
  - IDEA
  - maven
abbrlink: 3aac567e
date: 2019-01-05 10:35:26
---

# IDEA-MAVEN

> 本章主要介绍一下idea的maven配置，还有一些常见问题的解决方案

## maven配置界面

![配置界面图片](IDEA-maven/maven_settings.png)

- 更换镜像源则需要更改`settings.xml`内容，可以选择更改原文件（在.m2文件下）若不想找，也可以创建自己`settings.xml`进行替换，记得点上override
- 可以选择把本地`repositories`放在一个更好管理的地方，如图所示
- 可以更换maven的版本，最好使用官网最新的版本，默认的有时会有一些小问题

### maven_settings

![maven镜像照片](IDEA-maven/maven_repositories.png)

> 更改maven的设置内容，可以设置profile或者mirror避免使用无法访问或者访问缓慢的源

阿里云得设置最新的，然后就是校园网环境下挂阿里云真的一直失败，无法理解= =，所以后面就只能选择走以下的镜像源了。PS：阿里云建议百度官方的，年代变了配置的东西可能会改变(选择最适合你网络环境的)

```xml
    <mirrors>
        <mirror>
            <id>central</id>
            <name>Maven Repository Switchboard</name>
            <url>http://repo1.maven.org/maven2/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
        <mirror>
            <id>repo2</id>
            <mirrorOf>central</mirrorOf>
            <name>Human Readable Name for this Mirror.</name>
            <url>http://repo2.maven.org/maven2/</url>
        </mirror>
        <mirror>
            <id>ibiblio</id>
            <mirrorOf>central</mirrorOf>
            <name>Human Readable Name for this Mirror.</name>
            <url>http://mirrors.ibiblio.org/pub/mirrors/maven2/</url>
        </mirror>
        <mirror>
            <id>jboss-public-repository-group</id>
            <mirrorOf>central</mirrorOf>
            <name>JBoss Public Repository Group</name>
            <url>http://repository.jboss.org/nexus/content/groups/public</url>
        </mirror>
        <mirror>
            <id>google-maven-central</id>
            <name>Google Maven Central</name>
            <url>https://maven-central.storage.googleapis.com
            </url>
            <mirrorOf>central</mirrorOf>
        </mirror>
        <!-- 中央仓库在中国的镜像 -->
        <mirror>
            <id>maven.net.cn</id>
            <name>oneof the central mirrors in china</name>
            <url>http://maven.net.cn/content/groups/public/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
    </mirrors>
```

![设置动图](IDEA-maven/ideaProxy.gif)

### maven其他设置

- 可以设置maven repository，使得其不会放置在c盘，以及一些常见的配置

  ```xml
    <!-- 设置maven repository本地地址，同时这里也是archtypecatalog放置的地方，后面会引述到 -->
    <localRepository>E:\maven\localRepository</localRepository>

    <!-- 插件 -->
    <pluginGroups></pluginGroups>

    <!-- 若有ssr，可在此进行一个配置，或者在idea中配置也可以 -->
    <proxies>
        <!-- <proxy>
            <active>true</active>
            <protocol>http</protocol>
            <host>127.0.0.1</host>
            <port>1080</port>
        </proxy> -->
    </proxies>
  ```

### archetypeCatalog

当我们用maven搭建项目时，会远程寻找项目原型框架即`archetypeCatalog`这里可以有两种解决方案，下载到本地，或者指定国内镜像源。

- [] xx
  - [x] 下载到本地repository,下载地址→[下载archetype](http://repo.maven.apache.org/maven2/archetype-catalog.xml)
  - [x] 指定国内镜像源

    ```maven
      mvn archetype:generate \
      -DgroupId=com.mycom.helloworld \
      -DartifactId=helloworld \
      -DarchetypeArtifactId=maven-archetype-quickstart \
      -DinteractiveMode=false \
      -DarchetypeCatalog=http://maven.aliyun.com/nexus/content/groups/public/
    ```

### maven无法检索一些资源

看上述更换镜像源，一定要remote的那一栏显示更新完成，不然是没办法检索所有版本的。

![maven远程图片](IDEA-maven/remote_repositories.png)

### idea更新闪烁

清理cache

![cache](IDEA-maven/cache.jpg)