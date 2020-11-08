---
title: leetcode题目详细解答【java版】持续更新
author: tyrantqiao
toc: true
tags:
  - 算法
  - java
categories: []
copyright: true
abbrlink: 96d7c0a1
date: 2018-10-18 14:42:00
---

# leetcode题经

> 重在将自己解题的思路发上来，当然有时候是最快的解法加上一些我对它的想法，希望大家都能有所收获。若题目有更好的解法，欢迎一起交流。具体github项目专门放了我对算法的看法，leetcode结题，还有源码分析等等，持续更新中。

{% githubCard user:tyrantqiao repo:Java-Algorithms %}

```java
/**
* 注意HashMap的put(Key,Value)是可以替换旧值的，所以当我们遇到测试数据中包含重复数值时可以无视它。
* 所以其实判断条件里面的map.get(supplement)!=i其实也是可以无视的，因为我们的value已经更新为后面的值了
* @param nums
* @param target
* @return
*/
public int[] twoSum(int[] nums, int target) {
	HashMap<Integer, Integer> map = new HashMap<>(16);
	for (int i = 0; i < nums.length; i++) {
		int supplement = target - nums[i];
		if (map.containsKey(supplement) && map.get(supplement) != i) {
			return new int[]{i, map.get(supplement)};
		}
		map.put(nums[i], i);
	}
	return null;
}
```
