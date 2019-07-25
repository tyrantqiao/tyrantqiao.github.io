title: zookeeper学习笔记之一
author: tyrantqiao
toc: true
date: 2019-01-08 11:39:58
copyright: true
tags:
- 中间件
---

# zookeeper

## 组成

### znode

- 持久节点+持久顺序编号节点
- 临时节点+临时顺序编号节点
> 事件通知： session建立，znode+变更，列表变化

### 服务注册中心

![CP_system](zookeeper学习笔记之一/CP_system.png)

### Eureka

应用服务-> Eureka Server注册服务与Eureka Server做备份

![Eureka_system](zookeeper学习笔记之一/Eureka_system.png)

#### zookeeper分布式锁

![分布式](zookeeper学习笔记之一/分布式锁.png)

- 依赖于临时顺序节点，判断当前client顺序，以此来决定锁的持有权
- 没有获取到锁的节点监听最小节点的删除事件(`lock_key_001`)
- 锁释放->删除最小节点->剩余节点获取锁

#### 集群管理与master选举

- 依赖于临时节点
- 创建成功的为master节点
- 非master监听delete事件
- master挂掉后，重新选举

### 高性能集群

![高性能集群](/zookeeper学习笔记之一/高性能集群.png)