title: ssh-key构建以及连接github操作
author: tyrantqiao
tags:
- ssh
- git
categories: []
date: 2018-08-05 13:55:00
copyright: true
toc: true
---

# ssh【Secure Shell】

## ssh的介绍

> secure shell 应用层上实现安全交流的协议
- ssh连接方式
  - 基于口令【帐号密码】
  - 基于密钥【也就是我们连上git@github.com时所使用的方法】

## ssh的原理

- SSH:  
  - server create public key
  - receiver get the key and create its' public and private key.
  - resent the 'receiver'public key to server  
  > server will send the data which is encrypted (use the receiver's public key encrypt). Receiver get the data and decrypt it with receiver's private key.

### ssh安全问题

- 通过公钥进行伪装攻击怎么办？
  > 现在普遍的方法是通过将公钥存于证书中，而用户通过去相信一些大型的、可靠的证书机构GlobalSign、Comodo、Go Daddy、 Digicert等等

![证书示例](/certification.png)

## 连接事项

### 系统

- windows:
  - 注意使用git bash来进行连接操作，cmd下将无那些指令
  - 而用git bash默认生成时，文件存在于~/.ssh/id_rsa，需要用指令获取密钥
- Linux：
  - linux的话同git bash一步，按流程走即可
  
### 具体步骤

- How to connect to github by ssh:

``` bash
# 这里回车两次，不设置密令，同时这里可以设置生成路径以及密钥名字
ssh-keygen -t rsa -C "yourEmail"
# eval $(ssh-agent -s)等同于下面两句
ssh-agent -s
eval `ssh-agent`
# Linux： you need to make this file touchable
# chmod 600 id_rsa
# 若需要清除之前的key，可以执行ssh-add -D 清除所有key
ssh-add id_rsa
# (you need to add the id_rsa.pub to the github's deployer key)
ssh -T git@github.com
```

- Bug【无法添加】
  - 有多个key需要添加
  > 通过设置config，进行详细配置【在~/.ssh目录下 执行**touch config**，然后添加以下代码】

  ``` bash
  # github
  Host github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa
  # gitlab 以此类推进行添加
  Host gitlab.....
  ```

- 生成key给谁
  - 给对应的仓库repository，则添加到对应的deploy key
  - 但如果是像我们开发者这种，可以添加到user settings里面的deploy key，这样就可以一劳永逸地上传，更新库了

- ssh的指令解释
  - `ssh-key add id_rsa`
  > 添加私钥
  - `ssh -T git@github.com`
  > 激活密钥
  - `ssh-add -l`
  > 显示所有key
  - `ssh-add -D`
  > 清除所有key