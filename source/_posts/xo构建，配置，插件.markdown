title: hexo构建，配置，插件
author: tyrantqiao
tags:
  - hexo
  - ssh
  - blog
categories: []
date: 2018-08-05 13:58:00
copyright: true
toc: true
---

# hexo

## 需要安装

- 软件
  - Node.js
  - hexo

### 安装指令

> 通过yarn或者npm安装，推荐使用yarn，下载速度比npm稳定而且快太多了

``` bash
npm install hexo-cli --save
yarn add hexo-cli --save 
```

## 让hexo变得更好用

### hexo插件

> 同样通过npm或者yarn下载安装即可，当然要有选择性地安装，不然插件太多时，也会占据和产生大量资源的。

``` code
"dependencies": {
    "hexo": "^3.3.9",
    "hexo-deployer-git": "^0.3.1",
    "hexo-deployer-rsync": "^0.1.3",
    "hexo-filter-flowchart": "^1.0.4",
    "hexo-generator-archive": "^0.1.4",
    "hexo-generator-category": "^0.1.3",
    "hexo-generator-feed": "^1.2.2",
    "hexo-generator-index": "^0.2.1",
    "hexo-generator-json-content": "^3.0.1",
    "hexo-generator-json-feed": "^1.0.0",
    "hexo-generator-sitemap": "^1.2.0",
    "hexo-generator-tag": "^0.2.0",
    "hexo-git-backup": "^0.1.2",
    "hexo-helper-qrcode": "^1.0.2",
    "hexo-renderer-ejs": "^0.3.1",
    "hexo-renderer-marked": "^0.3.0",
    "hexo-renderer-stylus": "^0.3.3",
    "hexo-server": "^0.2.2"
  }
```

### hexo上传备份

``` code
deploy:
    type: git
    repo: git@github.com:xxx/Blog.git
    branch: master
    message: update blog
```

### 设置文章密码

> 下载安装hexo-blog-encrypt插件后

在标题前栏目中设置password： xxx即可启用加密

### 设置文章的概述

> 在文章的栏目中设置类似内容

``` code
abstract: This is a encrypted blog, you need password to access it.
message: This is a encrypted blog, you need password to access it.
```

### 设置ssh

> 设置ssh key后可以通过走git协议，而不用走http协议，更加稳定快速一点
请参考文章

{% post_link ssh-key构建以及连接github操作 ssh设置详细过程 %}

### 引用其他文章内容

``` code
  {% post_link xxxx description %}
```

#### 流程图展示【flow-chart插件】

```flow
st=>start: eval `ssh-agent -s`(开启ssh-agent)
op1=>operation: chmod 600 id_rsa(允许基本读写,提高文件权限)
op2=>operation: ssh-add id_rsa(添加)
e=>end: ssh -T git@github.com(选择yes即可,如果不行去掉-T命令)

st->op1->op2->e
```

### 注意事项

#### deploy不保留源文件！

> deploy后提交的只是生成后的网页文件,而真正的源文件仍然在你的主机上,所以假如你有可能丢失文件的话,最好将你的源文件进行备份

#### 文章的标签栏

``` code
tags:
- sdd
- ddd
```