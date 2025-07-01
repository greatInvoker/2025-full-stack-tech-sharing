import { useState, useReducer } from "react";
const PEOPLE_LIST = "people_list";

function getInitData() {
	const lTableData = localStorage.getItem(PEOPLE_LIST);
	try {
		return lTableData ? JSON.parse(lTableData) : [];
	} catch (error) {
		console.error("解析 localStorage 数据错误:", error);
		return [];
	}
}

export default function Table() {
	const [isActive, setIsActive] = useState(false);
	const [title, setTittle] = useState("新增客户");
	const [choseData, setChoseData] = useState({
		username: "",
		age: "",
		gender: "",
	});
	const [action, setAction] = useState({ type: "", payload: {} });
	const [tableData, tableDataDispatch] = useReducer(
		tableDataReducer,
		[],
		getInitData
	);

	function tableDataReducer(state, action) {
		switch (action.type) {
			case "add":
				return [
					...state,
					{
						id: state.length + 1,
						...action.payload,
					},
				];
			case "update":
				break;
			case "delete":
				break;
			default:
				break;
		}
	}

	const openModal = () => {
		setIsActive(true);
	};
	const closeModal = () => {
		setIsActive(false);
	};

	const chooseData = (item) => {
		setChoseData({ ...item });
	};

	const add = () => {
		setTittle("新增客户");
		openModal();
		setAction((prevAction) => {
			return { ...prevAction, type: "add" };
		});
	};

	const update = () => {
		console.log(choseData, !choseData);
		if (!choseData) {
			return alert("请选择要修改的数据");
		}
		setTittle("修改客户");
		openModal();
		setAction((prevAction) => {
			return { ...prevAction, type: "update" };
		});
		const formNode = document.getElementById("modal-form");
		console.log(formNode.value);
		console.dir(formNode);
		// formNode.children[0].value = choseData.username;
		// formNode.children[1].value = choseData.age;
		// formNode.children[2].value = choseData.gender;
	};

	const handleSumbit = (e) => {
		e.preventDefault();
		tableDataDispatch({
			type: action.type,
			payload: {
				username: e.target.username.value,
				age: e.target.age.value,
				gender: e.target.gender.value,
			},
		});
		closeModal();
	};

	function PeopleList({ tableData }) {
		return tableData.map((item, index) => (
			<tr
				className={choseData?.id === index + 1 ? "active" : void 0}
				key={item.id}
				onClick={() => {
					chooseData(item);
				}}>
				<td>{item.id}</td>
				<td>{item.username}</td>
				<td>{item.age}</td>
				<td>{item.gender}</td>
			</tr>
		));
	}

	console.log("渲染");

	return (
		<>
			<div id="tools">
				<span className="button" onClick={add}>
					新增
				</span>
				<span className="ml-12 button" onClick={update}>
					修改
				</span>
				<span className="ml-12 button">删除</span>
			</div>
			<table>
				<thead>
					<tr>
						<td>ID</td>
						<td>姓名</td>
						<td>年龄</td>
						<td>性别</td>
					</tr>
				</thead>
				<tbody>
					<PeopleList tableData={tableData} />
				</tbody>
			</table>
			<div id="musk" className={isActive ? "musk-open" : "musk-close"}>
				<div id="modal">
					<div id="modal-title">
						<b>{title}</b>
						<span onClick={closeModal}>&times;</span>
					</div>
					<form id="modal-form" onSubmit={handleSumbit}>
						<div>
							<label htmlFor="username">姓名：</label>
							<input
								id="username"
								type="text"
								placeholder="请输入姓名"
								autoComplete="username"
								defaultValue={choseData.username}
							/>
						</div>
						<div>
							<label htmlFor="age">年龄：</label>
							<input
								id="age"
								type="text"
								placeholder="请输入年龄"
								defaultValue={choseData.age}
							/>
						</div>
						<div>
							<label htmlFor="gender">性别：</label>
							<select id="gender" defaultValue={choseData.gender}>
								<option value="男">男</option>
								<option value="女">女</option>
							</select>
						</div>
						<div id="modal-from-tools">
							<button className="button ml-12" type="submit">
								确定
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
