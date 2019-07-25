title: IDEA技巧【快捷键、插件等】
author: tyrantqiao
tags:
  - java
  - idea
categories: []
copyright: true
toc: true
date: 2018-08-05 14:00:00
---

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