# React Mini Cli

这是一个基于 Vite + React 的极简项目模板，适用于快速搭建 React 项目。

## 项目结构

```plaintext
template/
├── .gitignore         # Git 忽略文件
├── index.html         # 项目入口 HTML
├── package.json       # 项目依赖与脚本
├── README.md          # 项目说明（可补充）
├── vite.config.js     # Vite 配置
├── public/            # 公共资源目录
└── src/               # 源码目录
    ├── App.jsx        # React 入口组件
    └── index.jsx      # 应用入口文件
```

## 使用方法

1. **安装依赖**

```bash
 pnpm install
 # 或 npm install / yarn install
```

2. **启动开发服务器**

```bash
 pnpm dev
 # 或 npm run dev / yarn dev
```

启动后会自动打开浏览器，访问本地开发环境。

3. **构建生产包**

```bash
 pnpm build
 # 或 npm run build / yarn build
```

4. **预览生产包**

```bash
 pnpm preview
 # 或 npm run preview / yarn preview
```

## 主要特性

- 使用 [Vite](https://vitejs.dev/) 作为构建工具，极速启动与热更新
- 集成 [React 18](https://react.dev/)
- 支持 JSX/TSX、自动解析常用扩展名
- 结构清晰，适合自定义扩展

## 说明

- 请勿直接修改 `node_modules` 目录
- 推荐使用 pnpm 进行依赖管理，亦兼容 npm/yarn
- 如需自定义配置，可修改 `vite.config.js`

---

致敬伟大的 CodeGod-吕威鹏！
