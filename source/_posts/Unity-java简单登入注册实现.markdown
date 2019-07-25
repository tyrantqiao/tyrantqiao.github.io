title: Unity+java简单登入注册实现
author: tyrantqiao
tags:
  - java
  - spring
  - unity
  - mysql
categories: []
date: 2018-08-05 14:09:00
copyright: true
toc: true
---
实现条件：MySQL+Spring+Unity

流程：

``` flow
st=>start: 实现Mysql的表格
op1=>operation: create table user(id ````)
op2=>operation: 实现网络层spring搭建
op3=>operation: SpringBoot实现
op4=>operation: Unity实现
op5=>operation: 通过WWW简易实现登录注册
e=>end

st->op1->op2->op3->op4->op5->e
```

首先实现InputField来做输入框
（编写script时应注意调用using ````.UI）
（然后应将InputField 设为public，或者自己find object来实现）

然后发送请求
```
string username=inputField1.text;

WWWForm form=new WWWForm();
form.AddField("username",username);

WWW www=new WWW(url,form);
//url 是你需要发送请求的地方，就spring层
yield return www;
if(string.isNullOrEmpty(www.error))
    SceneManager.loadScene(scene_name);
//你的游戏场景
else
    Debug.log(www.error);
    //或者自己做一些提示框用于提醒
```

绑定script流程可以这样

```flow
st=>start: create empty
op1=>operation: create script to empty
op2=>operation: create button
op3=>operation: button.OnClick() add empty and its' function
e=>end

st->op1->op2->op3->e
```
