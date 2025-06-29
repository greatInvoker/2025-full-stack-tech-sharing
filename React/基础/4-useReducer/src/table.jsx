import { useState } from "react";

export default function Table() {
	const [_active, setActive] = useState(false);
	const [_tittle, setTittle] = useState("新增客户");

	const openModal = () => {
		setActive(true);
	};
	const closeModal = () => {
		setActive(false);
	};

	const add = () => {
		setTittle("新增客户");
		openModal();
	};

	return (
		<>
			<div id="btn-tool">
				<span className="button" onClick={add}>
					新增
				</span>
				<span className="ml-12 button">修改</span>
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
					<tr>
						<td>1</td>
						<td>张三</td>
						<td>18</td>
						<td>男</td>
					</tr>
				</tbody>
			</table>
			<div id="musk" className={_active ? "musk-open" : "musk-close"}>
				<div id="modal">
					<div id="modal-title">
						<b>{_tittle}</b>
						<span onClick={closeModal}>&times;</span>
					</div>
					<form id="modal-form">
						<div>
							<label htmlFor="username">姓名：</label>
							<input
								id="username"
								type="text"
								placeholder="请输入姓名"
								autocomplete="username"
							/>
						</div>
						<div>
							<label htmlFor="age">年龄：</label>
							<input id="age" type="text" />
						</div>
						<div>
							<label htmlFor="gender">性别：</label>
							<select id="gender">
								<option value="male">男</option>
								<option value="female">女</option>
							</select>
						</div>
						<div id="from-btn-tool">
							<button className="button">重置</button>
							<button className="button ml-12">确定</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
