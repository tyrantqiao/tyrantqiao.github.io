---
title: IDEA maven无法更新indices解决办法
author: tyrantqiao
toc: true
date: 2019-01-05 10:35:26
copyright: true
tags:
---
# IDEA-MAVEN

> 本章主要介绍一下idea的maven配置，还有一些常见问题的解决方案

## maven配置界面

![配置界面图片](/maven_settings.png)

- 更换镜像源则需要更改`settings.xml`内容，可以选择更改原文件（在.m2文件下）若不想找，也可以创建自己`settings.xml`进行替换，记得点上override
- 可以选择把本地`repositories`放在一个更好管理的地方，如图所示
- 可以更换maven的版本，最好使用官网最新的版本，默认的有时会有一些小问题

### maven_settings

![maven镜像照片](/maven_repositories.png)

> 更改maven的设置内容，可以设置profile或者mirror避免使用无法访问或者访问缓慢的源

```xml
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
```

上述这段是我唯一能更新完indices的镜像源，其他源可以使用，但是没办法更新完其他内容，附带其他镜像源的配置。(选择最适合你网络环境的)

```xml
<mirror>
  <id>alimaven</id>
  <mirrorOf>central</mirrorOf>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
</mirror>
<mirror>
  <id>alimaven</id>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>
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
```

### maven无法检索一些资源

看上述更换镜像源，一定要remote的那一栏显示更新完成，不然是没办法检索所有版本的。

![maven远程图片](/IDEA-maven无法更新indices解决办法/remote_repositories.png)