title: shadowsocks一些解决方案
author: tyrantqiao
tags:
  - shadowsocks
categories: []
date: 2018-08-05 14:07:00
copyright: true
toc: true
---
if your shadowsocks is very slow,and this is not your net's wrong.
You can try the below tests to fast your ss.

    1.change your ss server's config which is located in /etc/shadowsocks.json
       --The port change to 443 will be helpful,as the default web service port is 443(i mean the website etc) 
vim /etc/shadowsocks.json

-->port:443,
-->timeout:800
ssserver -c /etc/shadowsocks restart (if don't have the bash restart,stop->start)

    2.change your local(client) application and some useful tips
    proxy mode -->PAC (inside the wall will not use proxy)
                      (outside the wall will use proxy)
               -->ALL (wherever the site is,will surf by the server)
               (if u cannot surf the domestic site,use the pac)
    use the show statics to look what make your network so slow,and correct it,
    server  -->if u are getting stuck,change the server setting alternatively.It might be helpful.
    
this article is in order to record how to set up ssserver,and is writtened by win_turn.

need a vps,u would better to get a vps in western countries.
There are some vps recommended,vultr,banwagong,HostUS,DO```````
(first ping the server,as the great wall and different operator cause different speed.)
(!ps,if u use the putty or pietty,better choose those whose ping is less than 160ms,or u will feel crashed)
```
yum install gcc
yum install openssl-devel

wget http://python.org/ftp/python/2.7.3/Python-2.7.3.tar.bz2
tar -jxvf Python-2.7.3.tar.bz2 
cd Python-2.7.3  
./configure
make all
make install 
mv /usr/bin/python /usr/bin/python2.6.6
ln -s /usr/local/bin/python2.7 /usr/bin/python 
```
```
vi /usr/bin/yum
#!/usr/bin/yum2.6.6

cd
yum install python-setuptools
wget https://bootstrap.pypa.io/ez_setup.py -O - | python
wget http://pypi.python.org/packages/source/d/distribute/distribute-0.6.10.tar.gz
tar zxvf distribute-0.6.10.tar.gz
cd distribute-0.6.10
python setup.py install
cd
easy_install pip
pip install shadowsocks
```
```
vi /etc/shadowsocks.json

{
"server":"xxx.xx.x.xx",
"server_port":7777,
"password":"xxxxxxx",
"timeout":300,
"method":"aes-256-cfb",
"fast_open":false,
"workers": 1
}

setup openserver auto open shacksocks
vi /etc/rc.local
ssserver -c /etc/shadowsocks.json -d start
```