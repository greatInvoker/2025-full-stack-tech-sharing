二、数组的合并与拆分

### 1. concat()

- **功能**：合并多个数组，返回新数组

- **示例**：

```
const arr1 = \[1, 2];


const arr2 = \[3, 4];


const newArr = arr1.concat(arr2); // 返回 \[1, 2, 3, 4]
```

### 2. slice()

- **功能**：截取数组部分元素（包含起始索引，不包含结束索引）

- **示例**：

```
const fruits = \['apple', 'banana', 'orange', 'grape'];


const citrus = fruits.slice(1, 3); // 返回 \['banana', 'orange']
```

三、数组的转换操作

### 1. join()

- **功能**：将数组元素拼接为字符串（默认用逗号分隔）

- **示例**：

```
const fruits = \['apple', 'banana', 'orange'];


const str = fruits.join(', '); // 返回 'apple, banana, orange'
```

### 2. map()

- **功能**：对每个元素执行函数，返回新数组

- **示例**：

```
const numbers = \[1, 2, 3];


const squared = numbers.map(x => x \* x); // 返回 \[1, 4, 9]
```

### 3. split()

- **功能**：字符串转数组（与 join () 反向操作）

- **示例**：

```
const str = 'apple, banana, orange';


const fruits = str.split(', '); // 返回 \['apple', 'banana', 'orange']
```

四、数组的迭代方法

### 1. forEach()

- **功能**：遍历数组每个元素，执行回调函数（无返回值）

- **示例**：

```
const numbers = \[1, 2, 3];


numbers.forEach(num => console.log(num)); // 输出 1, 2, 3
```

### 2. filter()

- **功能**：过滤出满足条件的元素，返回新数组

- **示例**：

```
const numbers = \[1, 2, 3, 4, 5];


const even = numbers.filter(num => num % 2 === 0); // 返回 \[2, 4]
```

五、数组的排序与反转

### 1. sort()

- **功能**：对数组元素排序（默认按字符串 Unicode 顺序）

- **示例**：

```
const fruits = \['banana', 'apple', 'orange'];


fruits.sort(); // 返回 \['apple', 'banana', 'orange']
```

### 2. reverse()

- **功能**：反转数组元素顺序

- **示例**：

```
const numbers = \[1, 2, 3];


numbers.reverse(); // 返回 \[3, 2, 1]
```

六、数组的查找操作

### 1. indexOf()

- **功能**：查找元素首次出现的索引（不存在返回 - 1）

- **示例**：

```
const fruits = \['apple', 'banana', 'orange'];


const index = fruits.indexOf('banana'); // 返回 1
```

### 2. includes()

- **功能**：判断数组是否包含指定元素（返回布尔值）

| 方法类型     | 方法名     | 操作特点       | 是否修改原数组 | 返回值                |
| ------------ | ---------- | -------------- | -------------- | --------------------- |
| **增删操作** | push()     | 末尾新增元素   | 是             | 新数组长度            |
|              | pop()      | 删除末尾元素   | 是             | 被删除元素            |
|              | shift()    | 删除开头元素   | 是             | 被删除元素            |
|              | unshift()  | 开头新增元素   | 是             | 新数组长度            |
|              | splice()   | 任意位置增删改 | 是             | 被删除元素组成的数组  |
| **合并拆分** | concat()   | 合并数组       | 否             | 新数组                |
|              | slice()    | 截取数组部分   | 否             | 新数组                |
| **转换操作** | join()     | 数组转字符串   | 否             | 字符串                |
|              | map()      | 元素映射转换   | 否             | 新数组                |
| **迭代操作** | forEach()  | 遍历执行回调   | 否             | undefined             |
|              | filter()   | 条件过滤元素   | 否             | 新数组                |
| **排序反转** | sort()     | 数组元素排序   | 是             | 排序后的数组          |
|              | reverse()  | 反转元素顺序   | 是             | 反转后的数组          |
| **查找操作** | indexOf()  | 查找元素索引   | 否             | 索引（-1 表示不存在） |
|              | includes() | 判断元素存在   | 否             | 布尔值                |
| **扁平化**   | flat()     | 嵌套数组降维   | 否             | 新数组                |
