import { useState, useReducer, useEffect } from "react";
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
	console.log("渲染");
	const baseData = { id: 0, username: "", age: "", gender: "" };
	const [isActive, setIsActive] = useState(false);
	const [title, setTitle] = useState("新增客户");
	const [choseData, setChoseData] = useState(baseData);
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
				return state.map((item) =>
					item.id === action.payload.id ? action.payload : item
				);
			case "del":
				return state.filter((item) => item.id !== action.payload.id);
			default:
				return state;
		}
	}

	const openModal = () => {
		setIsActive(true);
	};

	const closeModal = () => {
		setIsActive(false);
	};

	const chooseData = (item) => {
		setChoseData(item);
	};

	const add = () => {
		setTitle("新增客户");
		openModal();
		setAction({ type: "add" });
		setChoseData(baseData);
	};

	const update = () => {
		if (!choseData.id) {
			return alert("请选择要修改的数据");
		}
		setTitle("修改客户");
		openModal();
		setAction({ type: "update" });
	};

	const del = () => {
		if (!choseData.id) {
			return alert("请选择要删除的数据");
		}
		if (confirm("确定要删除此客户吗？")) {
			tableDataDispatch({ type: "del", payload: { id: choseData.id } });
			setChoseData(baseData);
		}
	};

	const handleSumbit = (e) => {
		e.preventDefault();
		tableDataDispatch({
			type: action.type,
			payload:
				action.type === "update"
					? { ...choseData, ...getFormData(e) }
					: getFormData(e),
		});
		closeModal();
	};

	const getFormData = (e) => ({
		username: e.target.username.value,
		age: e.target.age.value,
		gender: e.target.gender.value,
	});

	function PeopleList({ tableData }) {
		return tableData.map((item) => (
			<tr
				className={choseData?.id === item.id ? "active" : void 0}
				key={item.id}
				onClick={() => chooseData(item)}>
				<td>{item.id}</td>
				<td>{item.username}</td>
				<td>{item.age}</td>
				<td>{item.gender}</td>
			</tr>
		));
	}

	useEffect(() => {
		localStorage.setItem(PEOPLE_LIST, JSON.stringify(tableData));
	}, [tableData]);

	return (
		<>
			<div id="tools">
				<span className="button" onClick={add}>
					新增
				</span>
				<span className="ml-12 button" onClick={update}>
					修改
				</span>
				<span className="ml-12 button" onClick={del}>
					删除
				</span>
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
