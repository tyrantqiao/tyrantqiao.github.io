title: Mysql学习笔记
author: tyrantqiao
tags:
- mysql
categories: []
date: 2018-08-05 14:05:00
copyright: true
toc: true
---
# mysql

## install

### windows

mysql installer can finish almost all of the things of configuring and installing. There have two programs should be noticed,MySQL Server which is the main application to deploy your database or something else. MySQL WorkBench is a program graphical to control your database, server etc. Remember when your configure the MySQL Server, the user should act the actual effects, such as Admin or Database manager.

## connect

- When u connect to the server.

`create databese xxx;  (ctrl+enter execute current line)`

## usage

- create table for the database

``` sql
create table `database's name`.`table's name`(
    command
)
```

## TIPS

- tips:when u write your page with idea,and indent the row too behind,it will be automaticaliy code snippet

- `FUNCTION`和`PROCEDURE`，除了function只能返回一个函数外，其他基本一样

- `while`和创建过程

```flow
st=>start: create function name (params) returns type charset name;
op1=>operation: begin
op2=>operation: declare name type;
op3=>operation: statement
op4=>operation: end while
op5=>operation: statement
cond1=>condition: while condition do
e1=>end: end:>http://tyrantqiao.github.io/Blog[blank]

st->op1->op2->cond1
cond1(yes)->op4->e1
cond1(no)->op5->cond1
```

- `repeat`

``` sql
repeat
    statement
until condition
end repeat
```

- `if-else`

``` sql
if condition then
    statement
else
    statement
end if
```

## 密码设置

### 忘记密码

- 首先找到`.cnf`配置文件，有很多个，按优先次序寻找即可。

![cnf照片](/cnf.png)

- 然后打开cnf文件在里面添加以下代码

``` code
[mysqld]
skip-grant-tables
```

> 加入这段语句后执行`/etc/init.d/mysql restart`重启mysql服务后登陆mysql时将不需要密码，即执行`mysql -u root -p`然后回车即可登录

### 修改密码

> 执行以下语句更改密码`update mysql.user set authentification_string=password('xxxxxx') where user='root' and host='localhost'`

然后执行`flush privileges`即可更改密码

> 当更改完密码后记得将前面设置的内容删除，不然登录仍然是不用密码的

### 修改登录权限

> 赋予所有人登录权限，以root+密码的形式登录

``` sql
grant all privileges on *.* to 'root'@'%' INDETIFIED BY 'password' WITH GRANT OPTION;
flush privileges;
```