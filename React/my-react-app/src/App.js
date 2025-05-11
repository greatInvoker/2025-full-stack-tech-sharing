import "./App.css";
import { useEffect, useState, useCallback } from "react";
const originData = {
	list: [
		{ id: 1, name: "小米" },
		{ id: 2, name: "小红" },
		{ id: 3, name: "小绿" },
	],
	msg: "我是一条消息",
};

function App() {
	const [content, setContent] = useState("默认内容");
	const [list, setList] = useState([]);

	const init = useCallback(() => {
		setTimeout(() => {
			setContent(originData.msg);
			setList(originData.list);
		}, 1000);
	}, []);

	function listContent() {
		return list.map((item) => (
			<li key={item.id}>
				{item.name}
				{item.id}
			</li>
		));
	}

	function add() {
		setList([...list, { id: ++list.length, name: "小黑" }]);
	}

	useEffect(() => {
		init();
	}, [init]);

	return (
		<div className="App">
			<header>{content}</header>
			<ul>{listContent()}</ul>
			<button onClick={add}>添加</button>
		</div>
	);
}

export default App;
