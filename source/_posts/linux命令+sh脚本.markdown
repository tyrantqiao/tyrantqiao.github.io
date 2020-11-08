---
title: linux命令+sh脚本
copyright: true
toc: true
author: tyrantqiao
categories: []
abbrlink: edb1ff49
date: 2019-09-17 23:27:07
tags:
---

# linux命令

## find

- 命令
  - 查找匹配文件并删除
    `find path -mtime +10 -name "name*" | xargs rm -f`
    > -mtime/-mmin 天/分钟  +10 超过10
    > -atime 访问时间 -mtime 修改时间 -ctime 变化时间
    > xargs 向其他命令传递参数的一个过滤器，将输入数据转换为命令行参数
  - 打印日志函数

    ```sh
    function logmsg(){
      CURTIME=$(date +'%Y-%m-%d-%H:%M:%S')
      echo ${CURTIME}'' $1
    }

    logmsg "xxxxxx"
    ```

    > `$( cmd )` 执行命令
    > `date +'format'` 时间格式
  - 打印信息等待输入

    ```sh
    echo -n "是否要用默认的值[y-yes n-no]"
    read -t 100 default
    if [ ${default} == 'y' ];then
        balabala
    fi
    if [ ${count} -eq 0 ]; then

    fi
    ```
  
    > `echo -n "xxxx"` 不打印换行字符
    > `read -t 100 param` 等待100s输入变量
    > `-eq` 数字比较
  - 执行sql

    ```sh
    exeSql="SELECT COUNT(*) FROM table WHERE a='haha;'
    sqlCount=$(mysql -h xxx -P -u -e "${exeSql}")
    sqlCount=${sqlCount:8}
    declare -i count=0;
    count+=1
    `expr count +=1`
    $(expr count += 1)
    ```

    > ${sqlCount:8:2} 从8开始截取2位字符串
    > declare -i count=0 声明变量为整数类型
    > +i 删除
    > `expr xx+x`  `$(expr xx + x)` 加减乘除表达式
  - 条件控制

    ```sh
    case $month in
        1|3|5|7|9|11) #doSomething;;
        2|4) #doSomethingB;;
        *) #doElseSomething;;
    esac
    ```

  - 创建文件夹

    ```sh
    if [ ! -d $cur_dir/$cur_date ]; then
        mkdir -p $cur_dir/$cur_date
        if [ $? -ne 0 ]; then
            echo "创建文件夹$cur_dir/$cur_date失败"
            echo "1"
            exit
        fi
        chmod 777 $cur_dir/$cur_date
        echo "创建文件夹$cur_dir/$cur_date成功"
    fi
    ```

    > -d 文件测试运算符 判断文件夹是否存在
    > $? 显示命令最后的退出状态，0-表示没有错误
    > 比较运算符
    > -ne 不等于 -eq 等于 -gt -lt 大于小于 -ge -le大于等于
  - sftp

    ```sh
    sftp user@addr << TMP >> ./sftp.log.`date +$Y-$m-$d`
        cd /home/qiao/learn_sh/data
        lcd /home/qiao/data
        get xxx.data
        bye
    TMP
    ```

    > `doSomethingA << TMP doSomethingB TMP` 将TMP内的输出作为doSomethingA后的输入参数
    > `>>` 表示将doSomethingA结果追加输入到sftp.log里面
  - 为json字符串加双引号

    ```sh
    while read -p "输入字符串，处理后返回结果，若不需要处理字符串了，按n离开即可   " rawData
    do
        if [ "$rawData" != 'n' ];then
            rawData=${rawData//\"/}
            rawData=${rawData//:,/:\"\",}
            rawData=${rawData//:\}/:\"\"\}}
            echo $rawData | sed 's/\w\+/\"&\"/g'
            echo "****************************************************************************"
            continue
        fi
        if [ "$rawData" == 'n' ];then
            echo "bye"
            exit
        fi
    done
    ```

    > read -p 提示语句 obj
    > ${obj/match_pattern/replace_str} 单次匹配
    > ${obj//match_pattern/replace_str} 全部匹配的替换
    > sed 's/\w+/\"&\"/g' 匹配单词后，用&取匹配的单词并加上双引号，g表示全局匹配，()匹配的那种用\1 \2 \3进行匹配
    > "$obj" == 'n' 用双引号括起来的原因是，如果字符串中还有空格或者制表键等，导致转义字符等使得bash无法识别，所以在比较时要把变量都用“”括起来，避免出问题。
    
  - wc 统计
    ```bash
    wcResult=$(wc xxx.txt)
    line=$(echo $wcResult| cut -d '' -f1)

    lines=$(wc xxx.txt | xargs cut -d '' -f1)
    ```

  - alias
    ```bash
    alias short="long command"

    # 保存到终端中
    vim .bashrc
    # 添加alias语句
    alias xxx="xxxx xxx"
    ```

  - 计时程序
    ```bash
    # 当前秒
    start=$(date "+%s")
    end=$(date "+%s")

    duration=$((end-start))
    echo "time passed:$time seconds"
    ```
  
  - 比较

    ```bash
    # 字符串判断
    if [ "$str1" = "$str2" ]; then

    fi

    # 数字判断
    if [ $num1 -eq $num2 ]; then

    fi
    ```

  - 提起文件行数

    ```bash
    #打印第一列
    awk '{print $1}' filename 
    
    #打印行数
    awk 'NR==xxx' file

    #结合wc -l 提取行数，提取正则匹配的wc中最后一行中的总行数
    wc -l xx*.txt | awk 'NR==xx' | xargs echo | cut -d ' ' -f1
    ```

  - 执行mysql
    ```bash
    # 执行mysq命令，返回作为变量值，-N不打印mysql的查询条件
    let mysqlCounts=`mysql -uuser -ppassword -P3306 -N -e "mysql_command"
    ```