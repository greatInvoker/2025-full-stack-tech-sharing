# ReactHook-useState

[https://react.docschina.org/reference/react/useState]

## 1. useState 的定义

useState 是 React 16.8 引入的 Hooks API，用于在函数组件中管理状态。

## 2.基本语法

```js
const [state, setState] = useState(initialState);
```

⚠️ ：useState 只能在组件顶层或自定义 Hook 中调用，不能在循环或条件语句中调用（如需如此，请提取一个新组件并将状态移入其中）。

**参数**

- initialState：任意类型的初始值。
  - 仅在组件首次渲染时被使用，后续渲染会忽略。
  - 为函数时应为不接收参数的纯函数，并应返回任意类型的值。（ ⚠️：在严格模式中，React 将调用两次初始化函数，以帮你找到意外的不纯性。这只是开发行为，不影响生产）
  - [特性-惰性初始化](#3-1-惰性初始化)

```jsx
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  // 以下两种写法等价
  const [todos, setTodos] = useState(() => createTodos());
  const [todos, setTodos] = useState(createTodos);
  // ...
```

**返回**

- useState 返回一个由两个值组成的数组：[state, setState]。
  - state：当前的 state，在首次渲染时，它将与你传递的 initialState 相匹配。
  - setState：set 函数，它可以让你将 state 更新为不同的值并触发重新渲染。

### 2-1.set 函数， 如 setSomething(nextState)

useState 返回的 set 函数允许你将 state 更新为不同的值并触发重新渲染。你可以直接传递新状态，也可以传递一个根据先前状态来计算新状态的函数。

```jsx
const [name, setName] = useState('Edward');

function handleClick() {
  setName('Taylor');
  setAge(prevState => prevState + 1);
  // ...
```

## 3.特性

### 3-1 惰性初始化

当 initialState 需要复杂计算或从 localStorage 获取数据等场景时可以传入一个函数：

```jsx
// 🙆推荐写法：只会在组件首次渲染时执行一次initialStateFn
const [state, setState] = useState(initialStateFn);
const [state, setState] = useState(() => initialStateFn());

// 🙅不推荐写法：会导致每次组件渲染时都调用一次initialStateFn
const [state, setState] = useState(initialStateFn());
```
