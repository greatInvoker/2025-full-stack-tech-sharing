#!/usr/bin/env node
const { program } = require("commander");
const { version } = require("../package.json");
const path = require("path");
const fs = require("fs-extra");

program
	.version(version)
	.command("create <project-name>")
	.description("创建一个仅包含React的极简项目")
	.action((projectName) => {
		const targetDir = path.join(process.cwd(), projectName);
		const templateDir = path.join(__dirname, "../template");
		try {
			// 复制模板文件
			fs.copySync(templateDir, targetDir);

			// 更新 package.json 中的项目名称
			const packageJsonPath = path.join(targetDir, "package.json");
			if (fs.existsSync(packageJsonPath)) {
				const packageJson = fs.readJsonSync(packageJsonPath);
				packageJson.name = projectName;
				fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
			}

			console.log(`✨ 成功创建项目 ${projectName}`);
			console.log("👉 要进入项目目录并安装依赖，复制并执行以下命令:");
			console.log(`\n\x1b[36mcd ${projectName} && pnpm install\x1b[0m\n`);
			console.log("👉 项目创建完成后，你可以:");
			console.log("  1. 启动开发服务器: pnpm dev");
			console.log("  2. 构建生产版本: pnpm build");
			console.log("  3. 预览生产版本: pnpm preview");
		} catch (error) {
			console.error(`❌ 创建项目失败: ${error.message}`);
			process.exit(1);
		}
	});

program.parse(process.argv);
