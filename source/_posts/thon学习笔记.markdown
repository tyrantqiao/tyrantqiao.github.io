---
title: python学习笔记
author: tyrantqiao
tags:
  - python
  - 爬虫
categories: []
copyright: true
toc: true
abbrlink: 743c31e9
date: 2018-08-05 14:05:00
---

# python

## `自动补全`（linux）

> vim内实现：(此方案来自[网址](http://xushaojie.blog.51cto.com/6205370/1783256)）

``` code
wget https://github.com/rkulla/pydiction/archive/master.zip
unzip -q master
mv pydiction-master pydiction
mkdir -p ~/.vim/tools/pydiction
cp -r pydiction/after ~/.vim
cp pydiction/complete-dict ~/.vim/tools/pydiction
```

vim ~/.vimrc

``` code
filetype plugin on
let g:pydiction_location = '~/.vim/tools/pydiction/complete-dict'
```

- terminal（交互模式下）

名字随意

``` code
#!/usr/bin/python
# python startup file

import sys
import readline
import rlcompleter
import atexit
import os
readline.parse_and_bind('tab: complete')
histfile = os.path.join(os.environ['HOME'], '.pythonhistory')
try:
    readline.read_history_file(histfile)
except IOError:
    pass
atexit.register(readline.write_history_file, histfile)

del os, histfile, readline, rlcompleter
```

- 查询本机python库（import sys; sys.path）

    `cp xx.py lib_path`
    加入到bashrc:`export PYTHONSTARTUP=lib_path/xx.py
    DONE

## `python version error`

    To begin with,Python now has two version,2 or 3.
    Although official is recommending coders to use Python3.But the transmit the 2 code to 3
    will cost too much,at the same time.The version 3 is no longer be compatible with 2.

## `yum's python version error`

> Until 17.04.29,My linux's yum still use the Python2...
if u had installed some Python3 ,and caused some error.
It might be the confusion of version,

    find your app config,such as yum
    vim /usr/bin/yum
    #!/usr/bin/yum2.7

    vim /usr/libexec/urlgrabber-ext-down
    #!/usr/bin/yum2.7

If your app needs Python3,first download and make the configure file.
(By the way,seems the pyenv can achieve auto-change Python)

## `python request`

User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36

``` python
def saveFile(text):
    save_path = 'grab1.out'
    f_obj = open(save_path, 'wb')
    f_obj.write(text)
    f_obj.close()
```

saveFile(data)

- requests
    ``` python
    import requests
    r = requests.get('https://stackoverflow.com/users')
    # print(r.text)

    def saveText(text):
        save_path = 'stackoverflowUsers.out'
        f_obj = open(save_path, 'wb')
        f_obj.write(text)
        f_obj.close()

    rData=r.text.encode('UTF-8')
    saveText(rData)
    ```

-worm
    ``` python
    import re
    from urllib.request import urlretrieve
    from worm.fileio import save_text

    with open('.\\graber\\users.out', 'r', encoding='UTF-8') as users_obj:
        # print(users_obj)
        html_list = users_obj.readlines()
        # print(type(html_str))
        html_str = "".join(html_list)
        # print(type(html_str))
        # print(html_str)

        image_matches = re.findall('<img src="(https://www.gravatar.*)" alt', html_str, re.M | re.I)
        index = 0
        for image_match in image_matches:
            index += 1
            print(image_match)
            urlretrieve(image_match, './graber/image/user' + str(index) + '.jpg')

            # image_urls_text = '''stackoverflow's users' image url:\n '''
            # for image_match in image_matches:
            #     image_urls_text = image_urls_text + image_match +'\n'
            # print(image_urls_text)

            # save_text(image_urls_text, './graber/imageURL.txt')
            # savefile(image_text.encode('UTF-8'),'image_url')
    ```

- df:

    ``` python
    pd.read_rsv('xxx')
    ```

- fill na_values:

    ``` python
    sentinels={'supple':['a','b']}
    pd.read_rsv('xx',na_values=sentinels)
    ```

- chunker(read file to chunks)

    ``` python
    chunker=pd.read_table('xxx',chunkSize=xx)
    ```

- soup:

    ``` python
    soup=BeautifulSoup(string,"html5lib")
    ```

- merge:

``` python
pd.merge(df1,df2,on="xx")
```

- stack() row->colum
- str.UPPER
- cat

``` python
bins=[0,10,20]
cats=pd.cut(data,bins)
```

- 图像

``` python
img=cv2.imgread('xsx',0) #grey
f=np.fft.fft2(img) #fourier
fshift=np.fft.fft2shift(f)
s=np.log(np.abs(fshift))      #实数
plt.subplot(211),plt.imshow(f,'gray')  #211--2*1 first
```

- [x] .hist 竖状图
- [x] .plot(xxx,'ro--')  #r--red; o--marker; '--' mean 虚线
- [x] fig,axes=plt.subplot(2,1)
- [x] stacked=True
- [x] .plot(kind='kde') #密度曲线
- [x] .scatter(column)
- [x] .scatter_matrix(df)
- [x] .describe()    # get std, mean which you can use to analyze the normal range of data


- 抛弃重复 `.drop_duplicate(column)`
- ix[] deprecated[ 改为.loc和.iloc]
  .loc --label
  .iloc -- positional

  ``` python
  .loc[i,x.split('|')] --i index, 再执行x.split()
  ```

- set

``` python
set.union(*cat_sets)
```

【配置: Python3 + re + requests + Chrome】

在imooc上学习的，写时最好分下模块，便于自己思路整理和编写

```flow
st=>start: engine(启动类)
op1=>operation: downloader(下载类)
op2=>operation: textManager(文字处理，负责提取信息部分)
op3=>operation: logManager(负责日志和文件输出部分)
op4=>operation: ThreadManager(负责线程开展)
cond=>condition: 确定无下一步链接
e=>end: 我的项目地址（点我）:> https://github.com/tyrantqiao/PythonGraber

st->op1->op2->cond
cond(yes)->op3->op4->e
cond(no)->op1
```

具体代码github上
[python_grab](https://github.com/tyrantqiao/PythonGraber)

以下是介绍一些注意事项：

- 打日志时，可以用`datetime.datetime.now().strftime("%Y====")`

- 为/item/dwdede这种只有一半的链接补充头时，可用enumerate来解决

``` python
for i,item in enumerate(your_list):
    item='dwdwdwdw'+item
    your_list[i]=item
```

- 关于URI={URL,URN} URN--只命名不标记

- 若是简单的字符还是可以使用re来进行使用regex，但是若是很复杂的html标签之类的不太建议使用regex，一是调试时间长，而且复用性差。可用beautifulsoul来代替。

当然若是执意要用re，这里可给出一些例子，提供你参考。

- regex
  - [x] re.match() return tuple 如果要使用list，用 `[i for i in tuple_name]`
  - [x] re.search() 比match()好一点，因为match()限定了string的开头开始匹配，大部分错误都是这开始的
  - [x] re.findall() 这个比较推荐，首先是返回list，好操作，然后不局限于开头这一段
  - [x] re.DOTALL 使点也能匹配newline， re.VERBOSE 忽略空格和行符 ,re.MULTIILINE 使多行匹配
  - [x] \* ? + 都是greedy, 关掉greedy模式，使得最短匹配，使用??、+?、*?
  - [x] (?=xxx)xx 环视，检索xxx开头的，再以xx开始匹配.
  - [x] (?<=xxx)xx 检索xxx开头，再跳过xx开始匹配
  - [x] or | 或
