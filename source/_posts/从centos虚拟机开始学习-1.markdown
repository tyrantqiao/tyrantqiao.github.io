---
title: 从centos虚拟机开始学习--1
copyright: true
toc: true
author: tyrantqiao
categories: []
abbrlink: f40195e5
date: 2020-01-01 00:21:21
tags:
---

# centos

> 本文主要是想从虚拟机搭建的centos系统开始，尝试一些相关难题的复现以及攻关难题上，可能是生活中、或者工作中的突发奇想。  -- 配置：vmware+centos7+mysql5.8

## 环境搭建

```sh
cd ~
# 相关插件以及配置的安装，mysql，npm，zsh，vim之类的，可自由选择
wget https://raw.githubusercontent.com/tyrantqiao/dataPlatform/master/install.sh
chomod +x ./install.sh
# zsh安装完后会跳到zsh窗口，ctrl+D跳回继续安装即可
# lamp安装时同理，ctrl+D跳回继续安装即可
# ant-design 、以及dataPlatform是自己写的项目，自行抉择
./install.sh
# 设置登录端口22，允许登录，账号密码，开放host以及端口
# 注明sudo su升上去时，会出现vim不存在的情况，请手动设置，或者通过`su`命令转用户
vim /etc/ssh/sshd_config
# 此处不做进一步阐述
service sshd restart
service network restart
# 开启启动ssh
systemctl enable sshd.service
# 如果ssh还是失败的，执行以下步骤进行检查
# 查看ens33 也没有inet的ip地址，若没有需要去查询网上的设置虚拟机的网络通信模式
ip addr
```

## mysql连接

> mysql安装在上步的install.sh中已经完成了，现在做的是机器连接虚拟机的数据库。

- 第一步（用户权限）
    - ```sql
         use mysql;
         select user,host from user;
         -- 若无相应权限的用户，则创建权限
         grant all on *.* to %@'%' identified by "password";
         flush privileges;
      ```
- 第二步（防火墙）
    - /etc/my.cnf修改监听host为相应的ip或者0.0.0.0全部
        - `netstat -anp | grep 3306`查询port是否开启
    - 安装防火墙
        ```sh
        systemctl stop firewalld.service
        systemctl disable firewalld.service
        systemctl mask firewalld.service
        yum install iptables-services -y
        systemctl enable iptables
        systemctl start iptables
        vi /etc/sysconfig/iptables #编辑防火墙配置文件
        -A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
        -A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
        -A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT
        :wq! #保存退出
        systemctl restart iptables.service #重启防火墙使配置生效
        systemctl enable iptables.service #设置防火墙开机启动
        ```
    