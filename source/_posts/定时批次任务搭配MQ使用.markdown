---
abbrlink: '0'
---
# 批次任务

## 总体流程

```flow
st=>start
e=>end

request=>operation: 前端发起批次任务请求
saveDB=>operation: 数据库存储批次信息【sql、时间、执行类】
getBatchMsg=>operation: mybatis获取批次信息
execSql=>operation: 执行#批次sql语句获取数据
saveBatchData=>operation: 将数据存入批次分区表
sendBatchMq=>operation: 将批次任务发到MQ
consumeBatchMq=>operation: 消费MQ的批次任务

inTask=>inputoutput: 输入批次任务名字
inBatchMsg=>inputoutput: 将获取到数据映射到dataUnique

st->saveDB->inTask->request(right) ->getBatchMsg->execSql->inBatchMsg->saveBatchData->sendBatchMq->consumeBatchMq->e
```

## 按模块划分

- 模块
  - 数据库存储
    - MQ TOPIC
    - 查询SQL【查出相关的数据，比如要刷新缓存的活动id】
    - 批次分区数量
    - 批次时间等
  - 查询sql
    - 由于查询sql查的对象名不一致，所以需要进行转换名字

    ```xml
    <resultMap id="xxxMap" type="Map">
        <result column="people_id" property="unique_id" jdbcType="INTEGER" />
    </resultMap>
    ```

  - mq-cosumer.xml订阅消费
  - 执行相关bl
    - 现根据partitionNo和BatchNo查询到相关的数据
    - 根据获取到的数据进行相应的代码操作
