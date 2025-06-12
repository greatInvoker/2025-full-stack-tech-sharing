// 添加命令监听事件
chrome.commands.onCommand.addListener((command) => {
	if (command === "toggle-blur") {
		// 查询当前激活的标签页窗口
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			// 指定位置注入指定脚本
			chrome.scripting.executeScript({
				target: { tabId: tabs[0].id },
				files: ["content.js"],
			});
		});
	}
});
