---
title: IDEA技巧【快捷键、插件等】
author: tyrantqiao
tags:
  - java
  - idea
categories: []
copyright: true
toc: true
abbrlink: 4e77c9d4
date: 2018-08-05 14:00:00
---

***
> 更新于2020年2月5日17:42:03，主要是更新了工作中比较实用的东西，搭配了IDEA-VIM

- `shift+shift` to anywhere（搜索）
- `ctrl+F/B` 向前/后翻页 vim
- `G/ g+g` 底部/头部 vim
- `ctrl+w v` 窗口左右切割 vim
- `:set nu`  `:set nonu` 设置行号/不设置 
- `:%s/target/replaceString/replaceFlag` 
  - replaceFlag： g 全局
- `n/N` 下个/上个搜索区域 vim
- `$/O` 行尾/行头
- `u/ctrl+r` 撤销/恢复操作
- `ctrl+shift+A` find action

IDEA自动补全功能：

- `"abcde".var` 与 `obj.var` 声明new语句
- `obj.null` 与 `obj.notNull` 与 `obj.nn` 声明判空语句
- `obj.for` 与 `obj.fori` 带索引
- `obj.a>0` 与 `obj.cast` if语句以及转型方法

vim记录命令的方法

```vim
# 记录到x缓存（寄存器）中
qx 
cmd1
cmd2
# ···
q

# 使用时用@x即可
@q
```

***

# 常用的快捷键

``` code
Alt+home home
Ctrl+Shift+C copy
Ctrl+Shift+V paste
Ctrl+Shift+N open
Ctrl+Shift+Alt+S project settings
Ctrl+O head
Ctrl+R End
Ctrl+F12 file structure
Ctrl+E Recent File
Ctrl+Q API search
Ctrl+ALT+S settings
F12 tools view
Tab implement codes
Ctrl+/ //code
Alt+F7 find who quote this
Alt+Shift+F9 Debug
Alt+shift+F10 Run
Ctrl+Shift+F9 compile
Ctrl+Shift+F10 build
Ctrl+ALT+Y sysn
Alt+1 project view
   +2 collect view
   +6 TODO
F2 error location
```

## 插件

- maven helper
> 检测maven资源冲突

- lombok
> 支持lombok使用，解放写一些重复代码，像`@Slf4j`搭配`log.info("xxx")`

- markdown
> 有免费版以及收费版的，不过其实viusal code的markdown插件也不错就是了

- GsonFormat
> json转为实体类

- Alibaba代码规范插件
> 代码检查，也可以使用其他的检查，checkBug之类的

- toolkit
> 实现接口快速调用，查询等等功能

- shortCut
> 当你使用鼠标点某项按钮过多时，提醒你相应的快捷键
，同时这里我推荐把窗口的关闭设置多一个快捷键像alt+C，这样就可以减少鼠标移去关窗口的时间

## template

- 生成格式
> 在fileTemplates可以对你常创建的class文件进行定制，像代码规范中往往要求要有author，你可以在这个基础上进行定制

``` java
/**
 * date: $DATE$
 * @author tyrantqiao
 * blog: tyrantqiao.com
 */
```

- 代码块，在file中可以定制自己想要的代码块，在user中创建，设置快捷方式，比如通过`.main`生成

``` java
public static void main(String[] args){
}
```