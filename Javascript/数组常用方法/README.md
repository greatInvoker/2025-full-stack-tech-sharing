JavaScript 数组常用方法

一、数组元素的增删操作

### 1. push()

- **功能**：在数组末尾添加一个或多个元素，返回更新后的数组长度

- **示例**：

```
const fruits = \['apple', 'banana'];


fruits.push('orange'); // 返回 3，数组变为 \['apple', 'banana', 'orange']
```

### 2. pop()

- **功能**：移除数组最后一个元素，返回被移除的元素（空数组返回 undefined）

- **示例**：

```
const fruits = \['apple', 'banana', 'orange'];


const last = fruits.pop(); // 返回 'orange'，数组变为 \['apple', 'banana']
```

### 3. shift()

- **功能**：移除数组第一个元素，返回该元素

- **示例**：

```
const fruits = \['apple', 'banana', 'orange'];


const first = fruits.shift(); // 返回 'apple'，数组变为 \['banana', 'orange']
```

### 4. unshift()

- **功能**：在数组开头添加一个或多个元素，返回更新后的数组长度

- **示例**：

```
const fruits = \['banana', 'orange'];


fruits.unshift('apple'); // 返回 3，数组变为 \['apple', 'banana', 'orange']
```

### 5. splice()

- **功能**：删除 / 替换 / 添加数组元素（参数：起始索引，删除数量，替换元素）

- **示例**：

```
const fruits = \['apple', 'banana', 'orange'];


// 从索引1开始删除1个元素，插入'grape'


fruits.splice(1, 1, 'grape'); // 返回 \['banana']，数组变为 \['apple', 'grape', 'orange']
```

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

- **示例**：

```
const numbers = \[1, 2, 3];


const hasTwo = numbers.includes(2); // 返回 true
```

七、数组的扁平化

### flat()

- **功能**：将嵌套数组转为一维数组（参数指定扁平化深度）

- **示例**：

```
const nested = \[1, \[2, 3], \[4, \[5]]];


const flat = nested.flat(2); // 返回 \[1, 2, 3, 4, 5]
```

八、常用方法对比表

| 方法类型     | 方法名     | 操作特点       | 是否修改原数组 | 返回值                |
| ------------ | ---------- | -------------- | -------------- | --------------------- |
| **增删操作** | push()     | 末尾添加元素   | 是             | 新数组长度            |
|              | pop()      | 移除末尾元素   | 是             | 被移除元素            |
|              | shift()    | 移除开头元素   | 是             | 被移除元素            |
|              | unshift()  | 开头添加元素   | 是             | 新数组长度            |
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
