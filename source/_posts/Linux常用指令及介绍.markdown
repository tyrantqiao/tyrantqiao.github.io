---
title: Linux常用指令及介绍
author: tyrantqiao
tags:
  - linux
categories: []
copyright: true
toc: true
abbrlink: 28f5ba0a
date: 2019-05-19 14:03:00
---

# Linux

> Linux（聆听i/ˈlɪnəks/ lin-əks）是一种自由和开放源码的类UNIX 操作系统。该操作系统的内核由林纳斯·托瓦兹在 1991 年 10 月 5 日首次发布[5][6]，在加上用户空间的应用程序之后，成为 Linux 操作系统。Linux 也是自由软件和开放源代码软件发展中最著名的例子。只要遵循 GNU 通用公共许可证（GPL），任何个人和机构都可以自由地使用 Linux 的所有底层源代码，也可以自由地修改和再发布。大多数 Linux 系统还包括像提供 GUI 的 X Window 之类的程序。除了一部分专家之外，大多数人都是直接使用 Linux 发行版，而不是自己选择每一样组件或自行设置。  
>
> -- ***wiki***

## vi和vim

> 所有unix系的系统都会有vi，vim就是它的彩色版本

### vi界面崩溃

当崩溃时，会产生.swap文件进入暂存状态，根据工作条件选择不同状态即可

## 编码

### 语系

- `/etc/locale.conf`预设语系
- 使用的终端shell语系LANG.LC.ALL
- 文件encoding
- 使用终端软件

## shell语句

### 设置快捷

```bash
# 是否要删除文件提示，以防删库跑路
alias rm = "rm -i"
unalias
```

### 逻辑

- `[><==]` 判断
- $# 个数
- $@ 变数
- $* 所有
- ${param} 指定变量

### 输入

`read -p "提示语句" param_name`

### `/dev/null`

做个空的文件夹来存些不需要存的东西

> 空设备通常被用于丢弃不需要的输出流，或作为用于输入流的空文件。这些操作通常由重定向完成。
> ***wiki***

### case语句

```bash
cervwcwe =`xxxx $0 .sh`
case $1 in
 first)
        echo "I'm first"
        ;;
 second)
        echo "I'm second"
        ;;
 *)
        echo "Usage: $name [first|second]"
        exit 1
        ;;
esac
```

### while语句

```bash
while [condition]
do
    ~
done
```

### for

```bash
for var in con1 con2 con3
do
    ~
done
```

## 常用文件夹

### `/etc/passwd`

> 存放id，每一行即每一个账号

`name:password:UID:GID:user_message_manual:home_directory:shell`

1. password 显示为x，存放与`/etc/shadow`下
2. UID
    - 0 root
    - 1~200 distribution
    - 201~999 系统账号
    - 1000~ 自定义
3. GID `/etc/group`

### `/etc/shadow`

`name:password:latest_date:cannot_change_days:warning_days:Password_expiration_date:account_expiration_date:reserved`

1. 密码经过MD5/SHA加密
2. 从1970.1.1计算日期

### 安装包

1. kubuntu的安装文件为.deb
    - `dpkg -i name.deb`
    - `apt-get remove name`
2. Red Hat Package为.rpm格式
    - 安装alien程序
    - alien name.rpm
3. `.tar.gz`和`tar.bz2`以tarballs或source形式发行安装包
    - 编译源文件形式安装
