---
title: Linux常见配置
author: tyrantqiao
tags:
  - Linux
categories: []
copyright: true
toc: true
abbrlink: f873dfb4
date: 2018-08-05 14:04:00
---
You have to make your server or linux safer,u might find such log text like below:
There were xx times failed login until the last successful login
That is because many people use scripts to scan computer's port,some for learning to hack,some for hacking
your computer for money and etc.(what's worst,because of the lack of safety consciousness,many people set
their account name as root,and password like 'admin',123456`````,or the listening port always is 22)Sound 
like a family put their valuables on the front door and hope no one will stole it.

- So we should change our login account and some settings

   ``` bash
   adduser xxx
   passwd xxx
   setpassword xxxxxx
   ```

- But the account still have no root right(i mean the root of system)

   ``` bash
   cd home
   ls -al (look all users' privilege)
   vim /etc/pam.d/sshd 
   (add 'auth requied pam_listfile.so item=user sense=allow file=/etc/sshuser onerr=fail)
   vim /etc/sudoers (this need root's privilege)
   (find #Allow root)
   (add 'xxx ALl=(ALL) ALL)
   (and its' below configure should delete the annotation '#')
   vim /etc/ssh/sshd_config 
   (add 'AllowUsers xxx' and prohibit the root login,and set the max login sessions to 2 or 1)
   ```

- test your network how fast
   `wget http://cachefly.chachefly.net/100mb.test`
- snapshot your cpuinfo
   `cat /proc/cpuinfo/`

- check the log file in order to prevent your machine

``` bash
   cd /var/log/
      -->xferlog (ftp logs)
      -->access-log (HTTP/WEB)
      -->utmp  (current)
   (check who login your machine)
```

