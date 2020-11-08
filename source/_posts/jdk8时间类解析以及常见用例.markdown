---
title: jdk8时间类解析以及常见用例
copyright: true
toc: true
author: tyrantqiao
categories: []
abbrlink: 3ea64f5b
date: 2020-06-07 16:05:10
tags:
---

# jdk8时间

> JDK8下可替换为新的类进行处理：`LocalDateTime`，`Instant`-> 时间戳，`Duration`时间段，`Clock`时钟类，`ZoneId`时区，`ZoneOffset`时区补偿

```java
    // 获取系统当前时间
    LocalDateTime now=LocalDateTime.now();

    // 底层代码
    // clock拿到当前时区，Zone做时区偏移量
    public static LocalDateTime now(Clock clock) {
        Objects.requireNonNull(clock, "clock");
        Instant now = clock.instant();
        ZoneOffset offset = clock.getZone().getRules().getOffset(now);
        return ofEpochSecond(now.getEpochSecond(), now.getNano(), offset);
    }

    // 通过instant算出date和时间对象，进行组装使用
    public static LocalDateTime ofEpochSecond(long epochSecond, int nanoOfSecond, ZoneOffset offset) {
        Objects.requireNonNull(offset, "offset");
        ChronoField.NANO_OF_SECOND.checkValidValue((long)nanoOfSecond);
        long localSecond = epochSecond + (long)offset.getTotalSeconds();
        long localEpochDay = Math.floorDiv(localSecond, 86400);
        int secsOfDay = Math.floorMod(localSecond, 86400);
        LocalDate date = LocalDate.ofEpochDay(localEpochDay);
        LocalTime time = LocalTime.ofNanoOfDay((long)secsOfDay * 1000000000L + (long)nanoOfSecond);
        return new LocalDateTime(date, time);
    }
```

## 对比之前版本优点

| 变化点 | 优点 |
| --- | --- | 
| 线程安全性 | 代码如下，所有类均为不可变的，包含对象，不像SimpleDateFormat |
| 可读性 | 比起之前的复杂转化模式，现在有具体的时间类对象实现业务逻辑，LocalDate，Clock，Duration等 |
| API | 所有时间类都有方便的时间操作API，`plusDays()`等等。 | 

```java
public final class LocalDateTime implements Temporal, TemporalAdjuster, ChronoLocalDateTime<LocalDate>, Serializable {
    public static final LocalDateTime MIN;
    public static final LocalDateTime MAX;
    private static final long serialVersionUID = 6207766400415563566L;
    private final LocalDate date;
    private final LocalTime time;
```

## 涉及API包

- 包
    - `java.time` 基础包
    - `java.time.chrono` 日历系统
    - `java.time.temporal` 时态对象，用起找到特定日期，时间等
    - `java.time.zone` 时区

## 涉及用例

- 时间转化

```java
LocalDateTime startTime=LocalDateTime.parse(str1,DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
```

- 间隔

```java
Duration duration=Duration.between(startTime,endTime);
// api参考截图
```

![20200607165407](https://raw.githubusercontent.com/tyrantqiao/picgo/master/img/20200607165407.png)