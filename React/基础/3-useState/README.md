# ReactHook-useState

[react@18.2.0 官方中文文档](https://react.docschina.org/reference/react/useState)

## 1. useState 的定义

useState 是 React 16.8 引入的 Hooks API，用于在函数组件中管理状态。

## 2.基本语法

```js
const [state, setState] = useState(initialState);
```

**参数**

- initialState：任意类型的初始值。
  - 仅在组件首次渲染时被使用，后续渲染会忽略。
  - 为函数时应为不接收参数的纯函数，并应返回任意类型的值。（ ⚠️ ：在严格模式中，React 将调用两次初始化函数，以帮你找到意外的不纯性。这只是开发行为，不影响生产）
  - [特性-惰性初始化](#3-1-惰性初始化)

**返回**

- useState 返回一个由两个值组成的数组：[state, setState]。
  - state：当前的 state，在首次渲染时，它将与你传递的 initialState 相匹配。
  - setState：[set 函数](#2-1set-函数)，它可以让你将 state 更新为不同的值并触发重新渲染。

```jsx
import { useState } from 'react';

function MyComponent() {
  // 任意类型的initialState
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  // 函数类型的initialState，以下两种写法等价
  const [todos, setTodos] = useState(() => createTodos());
  const [todos, setTodos] = useState(createTodos);
  // ...
```

⚠️ ：useState 只能在组件顶层或自定义 Hook 中调用，不能在循环或条件语句中调用（如需如此，请提取一个新组件并将状态移入其中）。

### 2-1.set 函数

useState 返回的 set 函数允许你将 state 更新为不同的值并触发重新渲染。你可以直接传递新状态，也可以传递一个根据先前状态来计算新状态的函数。

```jsx
setSomething(nextState);
```

**参数**

- nextState：你想要 state 更新为的值。它可以是任何类型的值，但对于函数有特殊的行为。
  - 如果你将函数作为 nextState 传递，它将被视为更新函数。它必须是纯函数，只接受待定的 state 作为其唯一参数，并应返回下一个状态。（ [特性-函数式更新](#3-3-函数式更新)）
  - React 将把你的更新函数放入队列中并重新渲染组件。在下一次渲染期间，React 将通过把队列中所有更新函数应用于先前的状态来计算下一个状态。（[特性-状态批处理](#3-4-状态批处理)）

**返回**

- set 函数没有返回值。

```jsx
const [name, setName] = useState('Edward');

function handleClick() {
  setName('Taylor'); // 直接传递新状态
  setAge(prevAge => prevAge + 1); // 传递一个根据先前状态来计算新状态的函数
  // ...
```

## 3.特性

### 3-1 惰性初始化

当 initialState 需复杂计算或从 localStorage 取值等场景时可传入一个函数：

```jsx
// 🙆推荐写法：只会在组件首次渲染时执行一次initialStateFn
const [state, setState] = useState(initialStateFn);
const [state, setState] = useState(() => initialStateFn());

// 🙅不推荐写法：会导致每次组件渲染时都调用一次initialStateFn
const [state, setState] = useState(initialStateFn());
```

### 3-2 异步性

使用 set 函数更新状态会触发组件新的渲染，不影响正在执行的函数，函数内的 state 仍为旧值

```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
	setCount(count + 1);
	console.log(count); // 此时打印的count为旧值0
};
```

### 3-3 函数式更新

当新状态依赖于旧状态时，应使用函数式更新确保原子性：

```jsx
// ✅正确：函数式更新
const increment = () => setCount((prevCount) => prevCount + 1);

// ❌错误：可能导致竞态条件
const increment = () => setCount(count + 1);
```

### 3-4 状态批处理

React 默认会批量处理同一事件中的多个状态，再决定是否合并更新：

```jsx
const handleClick = () => {
	setCount((c) => c + 1); // 不会立即更新
	setCount((c) => c + 1); // 两次更新合并为 +2
};
```

### 3-5 比较后渲染

useState 通过 Object.is 比较新旧状态决定是否渲染，直接修改状态不会触发渲染：

```jsx
// ✅正确：创建新对象
setUser({ ...user, age: 31 });

// ❌错误：直接修改状态
const [user, setUser] = useState({ name: "John", age: 30 });
user.age = 31; // 不会触发渲染
```

### 3-6 闭包陷阱

若因函数内的异步回调引用了外部的 state 形成闭包，异步时间内该 state 发生变化，组件重新渲染，此时闭包内的 state 会仍为旧值：

```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
	setTimeout(
		// 回调函数引用了外部的count变量，形成了闭包。
		() => {
			console.log(count); // 若此时count发生变化，组件重新渲染，该count会仍为旧值
		},
		1000
	);
};
```

解决方案：使用 useRef 保存最新值

```jsx
const countRef = useRef(count);
countRef.current = count;

const handleClick = () => {
	setTimeout(() => {
		console.log(countRef.current); // 始终获取最新值
	}, 1000);
};
```
