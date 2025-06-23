## 如何优雅且高性能地生成百万级数据

```js
// 测试环境：Chrome 115 / Node.js 20
// 测试数据：生成100万个对象

// 方法1：Array.from().map()
console.time("Array.from + map");
const data1 = Array.from({ length: 1000000 }).map((_, i) => ({
	id: i,
	text: `Item ${i}`,
}));
console.timeEnd("Array.from + map"); // 约100-150ms

// 方法2：for循环 + push
console.time("for + push");
const data2 = [];
for (let i = 0; i < 1000000; i++) {
	data2.push({ id: i, text: `Item ${i}` });
}
console.timeEnd("for + push"); // 约80-120ms

// 方法3：预分配数组 + 索引赋值
console.time("for + pre-allocation");
const data3 = new Array(1000000);
for (let i = 0; i < 1000000; i++) {
	data3[i] = { id: i, text: `Item ${i}` };
}
console.timeEnd("for + pre-allocation"); // 约60-100ms（最快）
```

- 通过`Array.form()`转换`{ length: 1000000 }`的方式创建长度为 1000000 的数组，操作很花哨，但性能不如`new Array(1000000)`;
- `map()`是高阶函数，每次遍历都会执行传入的回调函数，这意味着 JS 会为`map()`创建一个函数栈，每次遍历时又会创建和销毁回调函数的函数栈，多余的开栈关栈操作导致了更多的性能消耗，所以性能不如`for循环`中新增数组元素；
- `push()`的性能不如直接通过数组索引新增元素，且创建空数组再`push()`的方法，会在每次遍历中不断修改数组的 length 属性，带来额外的性能开销，故不如预先分配预期长度的数组，性能会更优。
