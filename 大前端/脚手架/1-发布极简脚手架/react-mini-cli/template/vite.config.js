import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	server: {
		open: true, // 启动后自动打开浏览器
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // 按顺序尝试解析的扩展名
	},
});
