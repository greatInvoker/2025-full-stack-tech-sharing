# 居中布局

## 1.水平居中

### 1-1 行内元素 / 文本水平居中（父元素控制）

**适用场景**：文本、图片、按钮等行内元素或行内块元素。

**实现方法**：在父元素中设置 text-align: center。

```css
.parent {
	text-align: center; /* 子元素水平居中 */
}
```

```html
<div class="parent">
	<span>居中文本</span>
	<img src="image.jpg" alt="居中图片" />
</div>
```

### 1-2 块级元素水平居中（固定宽度）

**适用场景**：div、段落等块级元素，且已知宽度。

**实现方法**：给块级元素设置 margin: 0 auto（上下 margin 为 0，左右自动）。

```css
.child-block {
	width: 200px; /* 必须指定宽度 */
	margin: 0 auto; /* 水平居中 */
}
```

### 1-3 多个块级元素水平居中（flex 布局）

**适用场景**：多个并列块级元素（如导航栏、卡片列表）。

**实现方法**：父元素设置 display: flex + justify-content: center。

```css
.parent {
	display: flex;
	justify-content: center; /* 子元素水平居中 */
}
```

## 2.垂直居中

### 2-1 单行文本垂直居中（行高法）

**适用场景**：单行文本（如按钮、标题）。

**实现方法**：设置元素的 line-height 等于 height。

```css
.single-line {
	height: 50px;
	line-height: 50px; /* 行高等于高度，文本垂直居中 */
}
```

### 2-2 多行文本垂直居中（padding 法或 table-cell 法）

**适用场景**：多行文本或未知高度的内容。

**实现方法 1**：padding 上下撑满，通过设置上下 padding 使内容垂直居中（适合背景色固定的容器）。

```css
.multi-line {
	padding: 20px 0; /* 上下 padding 相等 */
}
```

**实现方法 2**: table-cell + vertical-align，将元素转为表格单元格，利用 vertical-align: middle 居中。

```css
.multi-line {
	display: table-cell;
	vertical-align: middle;
	height: 200px; /* 必须指定高度 */
}
```

### 2-3 块级元素垂直居中（flex 布局）

**适用场景**：子元素为块级元素（如弹窗、卡片），高度未知。

**实现方法**：父元素设置 display: flex + align-items: center。

```css
.flex-vertical {
	display: flex;
	align-items: center; /* 子元素垂直居中 */
}
```

## 3.水平垂直居中

### 3-1 绝对定位 + transform（不固定宽高）

**适用场景**：子元素宽高未知或动态变化。

**实现方法**：父元素设置 position: relative（定位参考）。子元素设置 position: absolute + top: 50% + left: 50% + transform: translate(-50%, -50%)。

```css
.parent {
	position: relative;
}
.child {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); /* 中心点对齐 */
}
```

### 3-2 绝对定位 + margin:auto（固定宽高）

**适用场景**：子元素宽高已知。

**实现方法**：父元素 position: relative。子元素 position: absolute + 宽高 + margin: auto + inset(top/bottom/left/right): 0。

```css
.parent {
	position: relative;
}
.child {
	position: absolute;
	width: 200px;
	height: 200px;
	margin: auto;
	inset: 0; /* 四边距为0，自动居中 */
}
```

### 3-3 flex 布局

**适用场景**：现代浏览器，推荐使用。

**实现方法**：父元素设置 display: flex + justify-content: center + align-items: center。

```css
.flex-center {
	display: flex;
	justify-content: center; /* 水平居中 */
	align-items: center; /* 垂直居中 */
}
```

### 3-4 grid 布局

**适用场景**：现代浏览器，若只需一维居中（水平或垂直），使用 Flex 布局，若需二维同时居中或复杂网格，使用 Grid 布局。

**实现方法**：父元素设置 display: grid + place-items: center(等价于 align-items: center + justify-items: center)。

```css
.grid-center {
	display: grid;
	place-items: center;
}
```
