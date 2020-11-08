---
title: mysql亿级数据迁移
copyright: true
toc: true
author: tyrantqiao
categories: []
abbrlink: 31da59f7
date: 2020-06-14 19:00:06
tags:
- mysql
---

# 亿级数据迁移

> 背景：Mysql5.6 + 分库分表 + 跨数据库实例，要求线上迁移+切换功能

## 总体实现方式

```flow
st=>start: 记录导出位点（用于做增量同步内容）
op1=>operation: 开始导出数据
op2=>operation: 将导出的数据文件上传到解析服务器
in1=>inputoutput: 解析文件入库
con1=>condition: 判断文件是否均入库
in2=>inputoutput: 增量同步数据入库
op3=>operation: 限流迁移方接口（或消息队列堆积）
con2=>condition: 判断增量数据是否一致
op4=>operation: 开关切换
en=>end: 迁移结束

st->op1->op2->in1->con1
con1(yes)->in2
con1(no)->op1
in2->op3->con2
con2(yes)->op4
con2(no)->op1
op4->en
```

## Mysql迁移问题

### 磁盘空间

```sql
-- 查看各数据库占用磁盘空间大小
select
TABLE_SCHEMA,
concat(truncate(sum(data_length)/1024/1024,2),' MB') as data_size,
concat(truncate(sum(index_length)/1024/1024,2),'MB') as index_size
from information_schema.tables
group by TABLE_SCHEMA
ORDER BY data_size desc
```

| TABLE\_SCHEMA | data\_size | index\_size |
| :--- | :--- | :--- |
| learn | 27.62 MB | 0.06MB |
| mysql | 2.23 MB | 0.22MB |
| information\_schema | 0.15 MB | 0.00MB |
| sys | 0.01 MB | 0.00MB |
| performance\_schema | 0.00 MB | 0.00MB |

```sql
--  查看数据库中各表所占磁盘空间大小
select
TABLE_NAME,
concat(truncate(data_length/1024/1024,2),' MB') as data_size,
concat(truncate(index_length/1024/1024,2),' MB') as index_size
from information_schema.tables
where TABLE_SCHEMA = 'learn'
order by data_size desc;
```

| TABLE\_NAME | data\_size | index\_size |
| :--- | :--- | :--- |
| test\_index | 27.56 MB | 0.00 MB |
| pay\_deduction\_flow | 0.01 MB | 0.01 MB |
| nmc\_task\_prog | 0.01 MB | 0.03 MB |
| nmc\_task\_act | 0.01 MB | 0.01 MB |
| nmc\_act\_mab | 0.01 MB | 0.00 MB |

如果有mysql控制台，直接观察肯定是更好的了，像GodenDB，DRDS之类的，都可以在控制台看到磁盘空间水位

### 计算表占用空间大小

> 数据迁移一定要预估迁移处位置是否足够，防止撑爆磁盘空间

- 算法公式： 
    - 字段空间大小=`字段字节数` * 行数 
    - 索引空间大小=`(key_length+4)/0.67`
        - primaryKey不占用空间，算在字段空间内
        - 但若有符合索引，是夹带了主键字段的，`(key_length+4)*3/0.67`

具体计算方式可以参考这篇博客，有提供相应的建表语句，以及索引建造及查看表空间大小的测验---> [mysql表空间大小计算](https://tyrantqiao.com/archives/tyrantqiao/75e44e9d/%E5%A6%82%E4%BD%95%E8%AE%A1%E7%AE%97mysql%E8%A1%A8%E7%A9%BA%E9%97%B4%E5%A4%A7%E5%B0%8F/)

### 如何快速迁移

- 自增序号
    - 若需要自增序号也会导致插入频繁，迁移数据时最好带上主键id，可以先把auto_increment去掉，等迁移完成后再设置auto_increment，除此以外，也应考虑数据迁移时，表之间是否有用主键id做关联，若有的话，那么主键id是必须在迁移范围之内的。
- 唯一索引
    - 能去掉的话最好还是去掉，如果去不掉的话，`先迁移数据后插入索引`与`先插入索引后迁移数据`时间上相差无几，如果实在避免不了唯一索引的场景，那就只能按原样迁移了。
- 数据清理
    - 最好在迁移前，先对数据源进行数据清理，一般不会全部数据都是有效的，尽量减少迁移数据量，减少操作时间
- 迁移方式
    - `select import csv` 由于我用的mysql产品不带导出csv内容，所以此处是在linux服务器上`select concat(字段,',')`通过concat语句全量导出到txt文件中的
    - `mysqldump` 注意启用单线程，此种方式按阿里的推荐来说，适用于2千万数据量以下，同时此处2千万导出数据依然是需要耗时挺久的。
    - `select concat` 导出成文件，然后通过程序解析文件入库的，适用于大于2千万的数据源迁移
        - 文本容量大小，1亿行txt文本相当于1G，用程序处理下，也应注意资源的合理读取以及及时释放等。
        - 将解析文本以及入库步骤分离，解析文本后发到消息队列，消息队列异步入库，加快导入速度。
            - 消息队列应注意消费线程问题，防止线程过多，拖垮应用，消费速度跟不上生产速度的情况
        - 如果是分库分表的数据源，可以考虑将导出语句下发到指定的分库分表下，按分库或者分表导出多个文件，同时解析多个文件，加快解析文件的速度。

### 数据解析导入

- 预设好读入文件的模板程序，通过在数据库或者在配置文件配置好文件字段的顺序、字段的大小、字段间的间隔符等，通过这预设好的模板解析文件
- 除了解析文件模板外，还可以配置处理程序模板
    - 比如配置spring服务，通过Spring获取bean进行处理业务逻辑
    - 通过Reflection反射获取服务进行处理
    - 配置消息队列内容，发送给消息队列，自己再实现一套处理逻辑订阅消息队列

### 数据解析导入

- 预设好处理逻辑，配置好字段名、顺序、长度、分隔符等，通过JSON的形式实现可定制化，拓展化，每当需要多解析一个文件时，只需要配置好处理的逻辑名、SQL名、相关字段等即可。

