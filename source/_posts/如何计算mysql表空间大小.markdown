---
title: 如何计算mysql表空间大小
copyright: true
toc: true
author: tyrantqiao
categories: []
abbrlink: 75e44e9d
date: 2020-06-14 19:52:05
tags:
- mysql
---

# 表空间大小

## 磁盘空间

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

## 表空间计算方式

```sql
-- 建表语句如下
CREATE TABLE `test_index` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a` varchar(20) DEFAULT NULL,
  `b` tinyint(3) DEFAULT NULL,
  `c` varchar(4) DEFAULT NULL,
  `d` tinyint(4) DEFAULT NULL,
  `e` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=500001 DEFAULT CHARSET=utf8

-- insert 50 0000 (50w的数据)
-- 然后查询下表空间大小
select count(*) from test_index;
-- 500000
```

| TABLE\_NAME | data\_size | index\_size |
| :--- | :--- | :--- |
| test\_index | 27.56 MB | 0.00 MB |

> 主键索引中会嵌入数据，此处空间是算在字段数据空间内的，而表本身无其他索引，所以目前这张表的索引空间是空的

基于现在这张无索引的表，我们计算下大小空间的公式：

```sql
-- int + varchar20                        + tinyint + varchar4 + tinyint + varchar5
-- 4   + UTF-8下每个字符最多3个字节 20*3+1  + 1       + 4*3+1    + 1       + 5*3+1 = 249

-- PS: 当然此处是假设varchar字段全部用满的情况
-- 单行249字节 * 50 0000 =  1 2450 0000 /1024[kb] /1024[MB] = 118MB

-- # 以此类推一亿行数据大小，大概为
-- 23,746 MB /1024 [GB] = 23GB

-- # 此外若是按每行数据用分隔符隔开，存在txt文本中，一亿数据大概是1G左右
select concat (id,',',a,',',b,',',c,',',d,',',e) from test_index;
```

| concat \(id,',',a,',',b,',',c,',',d,',',e\) |
| :--- |
| 1,IyvECYO1uevFInzB5v4J,11,WKMw,100,BHwlX |
| 2,EbQwRCmLzqeKQPtGTeiC,98,dM77,96,EZP1s |
| 3,4RSFxvNgP95QPqsSQqsP,49,nVkI,32,TY3cE |
| 4,uk0Vo54Xq5Yuk21PW1aD,34,hQfu,50,nVjD3 |
| 5,dJT4xhFlyBc0ihkFaIS6,64,bAef,27,4YvuJ |

> 若你也需要这种导出文件方式时，请小心concat语句遇到null字段，会把整行变为空串，请注意使用`IF_NULL(a,'')`赋个默认值避免空串情况。

### 索引空间计算

```sql
-- 给表加个索引
alter table test_index add index idx_a (a);

-- 查询现在表结构
CREATE TABLE `test_index` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a` varchar(20) DEFAULT NULL,
  `b` tinyint(3) DEFAULT NULL,
  `c` varchar(4) DEFAULT NULL,
  `d` tinyint(4) DEFAULT NULL,
  `e` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_a` (`a`)
) ENGINE=InnoDB AUTO_INCREMENT=500001 DEFAULT CHARSET=utf8

-- 查询增加索引后，索引空间大小
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
| test\_index | 27.56 MB | 17.56 MB |

> 单索引增加了17.56MB，计算下表空间计算方式

```sql
-- - 模式1：索引空间大小=`(key_length+4)/0.67`
--     - primaryKey不占用空间，算在字段空间内
--     - 模式2：但若有符合索引，是夹带了主键字段的，`(key_length+4)*3/0.67`

-- 20+4 /0.67 * 50 0000= 17,910,447.76 /1024 [KB] /1024 [MB] = 17.08 MB 
-- 可以看出数据量差不多

-- 再试下如果是复合索引，且加了主键的
alter table test_index add index idx_id_b (id,b);

CREATE TABLE `test_index` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a` varchar(20) DEFAULT NULL,
  `b` tinyint(3) DEFAULT NULL,
  `c` varchar(4) DEFAULT NULL,
  `d` tinyint(4) DEFAULT NULL,
  `e` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_a` (`a`),
  KEY `idx_id_b` (`id`,`b`)
) ENGINE=InnoDB AUTO_INCREMENT=500001 DEFAULT CHARSET=utf8

-- 查询表空间大小
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
| test\_index | 27.56 MB | 24.07 MB |

比原先大了 24.07-17.56=6.51MB。

按模式2计算公式看`(key_length+4)*3/0.67`，tinyint一个字节，(1+4)*3/0.67*50 0000 = 11,194,02 /1024 [kB] /1024 [MB] = 10.6754MB

## 总结

如果是单字段索引，且不含主键索引的，计算方式为`(key_length+4)/0.67*rows`，若复合索引含有主键索引的，则计算方式为`(key_length+4)*3/0.67*rows`



