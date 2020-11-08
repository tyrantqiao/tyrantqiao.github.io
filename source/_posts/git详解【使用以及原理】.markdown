---
title: git详解【使用以及原理】
author: tyrantqiao
tags:
  - git
  - 学习笔记
categories: []
toc: true
copyright: true
abbrlink: 34b0f784
date: 2018-09-14 10:59:00
---

# git

>本文以平时工作经历+pro git书籍内容进行阐述，算是做个学习笔记。

## 版本控制系统

- 本地版本控制系统
> Mac OS X系统上通过rcs命令进行保存并且管理文件补丁，补丁记录着对应文件修订前后的变化
- 集中化版本控制系统
> 类似于CVS,Subversion,Perforce之类的,主要核心在于有一个核心服务器负责管理所有文件的修订版本。
- 分布式版本控制系统
> Git、Mercurial、Bazaar之类的,客户端不只提取最新的文件版本，而且把repository全部克隆下来

<!-- more -->

## **总结 :simle: **

种类 | 优点 | 缺点 | 特点
----  | ----  | ----- | -----
本地版本 | 简单，单机部署 | 不适合多人操作 | 使用补丁形式记录文件信息
集中化 | 容易管理，易于掌握其他人进度 | 但若服务器宕机，则服务中止，且易于丢数据，无法协同工作 | 记录各个文件的差异
分布式 | 即便服务器故障，也可以轻松commit或者回滚历史，操作方便，只要操作完后再push到repository即可，且即便服务器挂了，也可以上传本地 | 项目镜像庞大 | 把变化的文件做一次快照，不变的则指向上一个快照的，类似于文件系统

## git知识【只针对git进行讲解】

### 状态

- committed 已提交
> 数据已存放在本地数据库中
- modified 已修改
> 修改但未保存
- staged 已暂存
> 把已修改的文件放在下次提交时要保存的清单中
- untracked 未跟踪
> 不想要加入git的，创建.gitingnore文件，按照正则匹配模式设置一下即可

![git流程](git详解【使用以及原理】/gitProcess.jpg)

### 配置使用【安装略】

- git设置email以及name内容

```git
git config --global user.name "tyrantqiao"
git config --global user.email "tyrantqiao@email.com"
# 这句语句会将你输入的账号密码存下来，若是在Windows系统中还会作为凭据存储下来，当需要删除时需要在Windows的凭据管理器中进行删除。
git config --global credential.helper store
```

![credential1](git详解【使用以及原理】/credential.jpg)
![credential2](git详解【使用以及原理】/credential2.jpg)

若不用global则设定保存在当前项目的.git/config下

### git日志和提交

- 查看提交情况

`git log -p -2 --stat --pretty`

- 修改最后一次更改情况

`git commit --amend`

- 查看日志文件

`git show --name-status hash_id`

- 回退提交commit

`git reset --soft hash_id`
> 回退到，并将修改存入暂存区

### git存储数据

例如有test.log文件,执行`git add test.log`将test.log添加到暂存区中，这时会对文件进行校验和（SHA-1哈希字符字串）然后将当前版本的文件快照保存到git仓库中【快照以blob的形式存储下来】其后将校验和加入暂存区域。

当执行`git commit`时，git先计算每一个子目录的检验和，再将目录存为树对象，之后git创建提交对象，加上那些作者信息等等，包含指向树对象【根目录】的指针，这样就可以到时再回滚回来。

对象也就有： blob【test.log】 tree【根目录加子目录】 tree【根目录】

### git 删除数据

- `git reset file`删除git内容
  - `--mixed` 默认模式清除历史记录、staged区
  - `--soft` 只清除历史记录
  - `--hard` 清除历史记录、staged区以及工作区
- `git rm file`删除git+file 

### 分支

- master 默认分支
- head git系统的当前分支
- 合并分支问题：
  - fastforward master->hotfix 合并时，直接将两个指针指向hotfix的快照即可，而当操作完成后，即可以删除掉无用的分支例如hotfix
  - 分岔分支的合并：自动合并，且若有冲突时，需要解决，或者可以加上force的命令
- 分支模式种类
  - 长期分支： 拥有多个开放的分支，各个分支负责特定的任务，对于大型项目时这种易于管理，像可以分为基础，前端，后端，bug分支等等。
  - 特性分支【topic】：一个短期的，用来实现单一特性与其相关工作的分支，可以理解为一个任务的多种实现，然后在其中抉择较好的任务进行选择。

![gitflow](git详解【使用以及原理】/gitflow.jpg)

#### 合并分支操作

- rebase:
  使用另外一分支作为新基础，若需要清理历史情况时可以使用
- merge:
  若不需要变更历史历史情况，最稳的是使用merge，不会造成太大威胁

![origin](git详解【使用以及原理】/origin.jpg)
![rebase](git详解【使用以及原理】/rebase.jpg)
![merge](git详解【使用以及原理】/merge.jpg)

#### 克隆

- `git fork`复刻：
  远程上复制repository，对应的修改为pull request【简称PR】
- `git clone`：
  本地copy一份，然后修改就是merge上去即可【简称MR】

#### 拉特定分支到指定位置

- `git cherry -pick <commit-has>`
  将制定commit从一个分支拉倒另外一个分支

#### git拉远程

```git
git remote add remote_name xxxxxxxx
git fetch remote_name
# 若不是master分支的话，可切过去，当然如果master不用合并的话，就不切
git checkout master
git merge remote_name/branch
```