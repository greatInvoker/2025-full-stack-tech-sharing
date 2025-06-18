# 数组去重

## 仅基本数据类型元素的数组

```js
// Set
const result = Array.from(new Set(仅基本数据类型元素的数组));
```

## 含引用数据类型元素的数组

```js
// Set + JSON
const result = Array.from(
	new Set(含引用数据类型元素的数组.map(JSON.stringify)),
	JSON.parse
);
```

⚠️：该方法无法处理数组元素为 undefined、bigint、循环引用的数组。
