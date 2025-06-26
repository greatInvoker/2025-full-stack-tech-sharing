# ES5 继承

```js
function Parent(name) {
	this.type = "parent";
	this.hobby = ["唱", "跳"];
	this.name = name;
	this.foo = function () {
		console.log("被调用");
	};
}
Parent.prototype.sayName = function () {
	console.log("我叫" + this.name);
};
```

## 1.原型链继承

```js
function Child() {}
Child.prototype = new Parent(); // 【关键】子类原型指向父类实例
```

- 优点：
  1. 实现简单，直接通过原型链共享属性和方法，节省内存
  2. **可继承原型方法**：通过原型链继承，子类能使用父类原型上的方法
- 缺点：
  1. **无法传参**：创建子类实例时，无法向父类构造函数传参
  2. **共享引用类型属性**：所有子类实例共享父类的引用类型属性
- 适用场景：当不需要向父类构造函数传参，且父类没有引用类型属性时可以使用

## 2.构造函数继承（经典继承）

```js
function Child(name) {
	Parent.call(this, name); // 【关键】通过call或apply调用父类构造函数
}
```

- 优点：
  1. **可传参**：创建子类实例时，可向父类构造函数传参
  2. **独立实例属性**：子类实例拥有独立的父类属性，不共享引用类型属性
- 缺点：
  1. **无法继承原型方法**：父类原型上的方法不会被子类继承
  2. **方法重复创建**：每个子类实例都有父类方法的副本(`foo`)，无法复用，浪费内存
- 适用场景：当需要向父类构造函数传参，且不需要继承父类原型方法时可以使用

## 3.组合继承（原型链 + 构造函数）

```js
function Child(name) {
	Parent.call(this, name); // 【关键1】通过call或apply调用父类构造函数
}
Child.prototype = new Parent(); // 【【关键2】子类原型指向父类实例
Child.prototype.constructor = Child; // 【关键3】修复constructor指向
```

- 优点：
  1. **可传参**：创建子类实例时，可向父类构造函数传参
  2. **独立实例属性**：子类实例拥有独立的父类属性，不共享引用类型属性
  3. **可继承原型方法**：通过原型链继承，子类能使用父类原型上的方法
- 缺点：
  1. **父类构造函数调用两次**：`Child.prototype = new Parent()`调用一次；子类实例化时，在子类构造函数中`Parent.call(this, name)`又调用一次
  2. **存在冗余属性**：子类原型上存在父类实例属性（`type`、`hobby`），实际仅使用子类实例自身属性
- 适用场景：当需要传参、继承原型方法，且对性能要求不是特别高时可以使用

## 4.寄生继承

```js
// 【关键1】通过工厂模式函数创建对象，增强后返回。
function creatChild(name) {
	const obj = Object.create({
		sayName: function () {
			console.log("我是" + this.name);
		},
	}); // 【关键2】通过Object.create添加原型链方法
	obj.name = name;
	obj.foo = function () {
		console.log("被调用");
	};
	return obj;
}
```

- 优点：
  1. **复用性**：将增强逻辑封装在函数内，便于复用
  2. **灵活性高**：不影响原型，动态为对象添加属性和方法，可定制化，轻量级
- 缺点：
  1. 每个属性和方法都需单独编写，不适用于多属性多方法的大规模继承
  2. **继承层次有限**：难以实现多层级的继承结构，不适用于复杂的面向对象设计
- 适用场景：当需要对单个对象进行定制化增强，且继承结构简单时可以使用

## 5.寄生组合继承（最优方案）

**极简版**：

```js
function Child(name) {
	Parent.call(this, name); // 【关键1】通过call或apply调用父类构造函数
}
Child.prototype = Object.create(Parent.prototype); //【关键2】通过Object.create创建原型
Child.prototype.constructor = Child; //【关键3】修复constructor指向
```

**封装版**：

```js
function Child(name) {
	Parent.call(this, name); // 【关键1】通过call或apply调用父类构造函数
}
function inheritPrototype(Parent, Child) {
	const prototype = Object.create(Parent.prototype); //【关键2】通过Object.create创建原型
	Child.prototype = prototype;
	prototype.constructor = Child; //【关键3】修复constructor指向
}
inheritPrototype(Parent, Child);
```

- 优点：
  1. **可传参**：创建子类实例时，可向父类构造函数传参
  2. **独立实例属性**：子类实例拥有独立的父类属性，不共享引用类型属性
  3. **可继承原型方法**：通过原型链继承，子类能使用父类原型上的方法
  4. **只调用一次父类构造函数**：避免了组合继承的性能问题
  5. **高效原型继承**：通过 Object.create 直接创建父类原型的副本，不实例化父类
- 适用场景：当需要传参、继承原型方法，且对性能有较高要求时，是 ES5 中首选的继承方式

---

# ES6 继承

```js
class Parent {
	constructor(name) {
		this.type = "parent";
		this.hobby = ["唱", "跳"];
		this.name = name;
		this.foo = function () {
			console.log("被调用");
		};
	}
	sayName() {
		console.log("我叫" + this.name);
	}
}

class Child extends Parent {
	constructor(name) {
		super(name);
	}
}

const child = new Child("刘禅");
child.sayName(); // 我叫刘禅
```

- 优点：
  1. 语法简洁，避免手动处理原型链
  2. 支持 super 关键字，更安全地调用父类方法
  3. 更好的类型系统（TypeScript 支持）
- 适用场景：在不考虑旧浏览器兼容性的情况下，是首选的继承方式

⚠️ ：如需兼容旧浏览器，[寄生组合继承](#5寄生组合继承最优方案)仍是 ES5 中的最佳选择，否则建议直接使用 ES6 的`class`和`extends`。
