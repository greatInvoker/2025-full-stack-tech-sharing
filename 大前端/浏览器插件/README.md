# 浏览器插件

## 1 主流浏览器平台

- **Chrome/Edge**：使用 [ChromeExtensions](https://developer.chrome.google.cn/docs/extensions?hl=zh-cn) 标准，用户基数大。
- **Firefox**：兼容 [WebExtensions](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions) 标准，需额外处理权限问题。

## 2 开发知识点

### 2-1 开发工具与框架

- **基础工具**：VS Code、Chrome DevTools、Webpack（打包优化）。
- **框架推荐**：React/Vue（构建复杂 UI）、Tailwind CSS（快速样式）、TypeScript（类型安全）。

### 2-2 核心组件与功能

- **manifest.json**：配置文件，定义权限、入口文件和图标。
- **background script**：后台运行，处理全局事件（如定时任务）。
- **content script**：注入网页，修改 DOM 或监听用户操作。
- **popup**：点击插件图标时显示的小窗口（HTML+CSS+JS）。
- **options page**：设置页面，存储用户偏好（可选）。

### 2-3 关键技术点

- **跨域请求**：通过 background script 转发请求，或在 manifest 中声明权限。
- **数据存储**：使用 chrome.storage（同步或本地）代替 localStorage，支持跨标签页共享。
- **消息传递**：使用 chrome.runtime.sendMessage 和 chrome.runtime.onMessage 实现组件间通信。
- **权限管理**：按需声明权限（如 activeTab 比 all_urls 更轻量），避免被用户拒绝。

### 2-4 测试与调试

- 本地调试方法

  - **Chrome**：访问 chrome://extensions/ → 开启 “开发者模式” → 加载已解压的扩展程序。
  - **Firefox**：访问 about:debugging → 选择 “此 Firefox” → 临时载入附加组件。

- 测试工具
  - **单元测试**：Jest、React Testing Library 等（前端逻辑）。
  - **集成测试**：Puppeteer（模拟用户操作）。
  - **性能分析**：Chrome DevTools 的 Performance 面板（优化内存和加载速度）。

## 3 发布与盈利策略

### 3-1 发布流程

- 准备材料：
  - 图标（128×128、48×48、16×16）
  - 截图（至少 3 张，展示核心功能）
  - 详细描述（含使用场景、隐私政策）
- 提交审核：
  - Chrome Web Store：注册开发者账号（$5）→ 创建项目 → 上传 ZIP 包 → 填写信息 → 提交审核（1-3 天）。
  - Firefox Add-ons：注册账号 → 上传 XPI 文件 → 填写信息 → 自动审核（几分钟）。

### 3-2 盈利模式

- 付费下载：适合工具类插件（如密码管理器），需提供 7 天免费试用。
- 订阅制：按月 / 年收费（如自动化任务插件），可通过 chrome.identity 验证用户身份。
- Freemium 模式：基础功能免费，高级功能付费（如数据导出、无广告）。
- 广告分成：内置非侵入式广告（需用户授权），或与相关产品合作推广。
- 企业版：针对团队提供批量授权、专属功能（如 API 访问）。
