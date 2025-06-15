# 实现 new 方法

## 思路

1. 理解 JS 在执行 new 操作符时都做了什么？
2. 确定函数参数 -- 构造函数、初始化属性
3. 模拟 new 的执行过程编写相关代码
4. 测试函数，优化和完善

## 1.JavaScript 在执行 new 操作符时都做了什么?

```
1.开辟内存空间，创建一个空对象
2.将构造函数的this指向空对象
3.初始化构造函数的属性
4.构造空对象的原型链
5.根据构造函数的类型确定是否需要返回新的实例
```

## 2.实现 new 方法过程详解

### 2-1 开辟内存空间，创建一个空对象

```js
const obj = {}; // 字面量方式
const obj = new Object(); // 通过Object对象创建空对象（自己实现的new方法里最好不要出现new）
```

### 2-2 将构造函数的 this 指向空对象，初始化构造函数的属性

使用 apply 或 call 方法改变 this 的指向，并传递初始化属性参数，注意第二个参数开始 apply 接收的是参数序列，call 是参数类数组

```js
构造函数.apply(空对象, 参数1, 参数2, ...... ,参数n);
构造函数.call(空对象, 参数数组)
```

### 2-3 构造空对象的原型链

```js
const obj = Object.create(构造函数.prototype); // 🙆推荐：JS官方方法，性能方面做了优化，在创建新对象时就指定了原型链，精简了代码

空对象.__proto__ = 构造函数.prototype; // 🙅不推荐：非JS官方方法，会破坏原型链结构，存在兼容性、性能等问题
Object.setPrototypeOf(空对象, 构造函数.prototype); // 🙅不推荐：性能开销大
```

### 2-4 根据构造函数的类型确定是否需要返回新的实例

除了通过 new 方法创建新实例外，还需兼容只对参数进行加工的工厂模式函数来确定返回值

```js
// 注意typeof null的返回值是'object'，所以需要先判空
result !== null && typeof result === "object";
```

### 2-5 测试函数，优化和完善

实现自己的 new 方法后，还需判断传参错误时的处理方式，模拟原 new 方法在操作非构造函数时抛出的类型错误

```js
if (typeof constructor !== "function") {
	throw new TypeError(`${constructor} is not a constructor`);
}
```

## 3.最终完整版代码呈现

“实现 new 方法”是一个非常经典的前端八股文面试题，但在它背后更多的是考察程序员的编程思路和 JS 的掌握基础，所以这篇文档我写了非常详细的过程，是想让大家体会整个编程过程的思考与决策以及完成后的成就感，而这就是代码的艺术！（仅仅是为了应试背诵其实没有任何意义）

```js
function myNew(constructor, ...args) {
	// 未传递正确的构造函数时，抛出错误
	if (typeof constructor !== "function") {
		throw new TypeError(`${constructor} is not a constructor`);
	}
	// 1.根据constructor的原型创建一个新对象
	const obj = Object.create(constructor.prototype);
	// 2.使用apply将this指向obj，并初始化参数
	const result = constructor.apply(obj, args);
	// 3.根据constructor类型确定是否返回新的实例
	return result !== null && typeof result === "object" ? result : obj;
}

function Person(name, age) {
	this.name = name;
	this.age = age;
}

console.log(myNew(Person, "吕威鹏", 18));
console.log(myNew(10)); // 测试错误传参数
```
