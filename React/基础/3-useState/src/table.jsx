import { useState } from "react";
import { initData, getDataItem } from "./tableUtil";

export default function Table() {
	const [tableData, setTableData] = useState(initData);

	const add = () => {
		setTableData((prevState) => {
			return [
				...tableData,
				{ id: `${prevState.length + 1}`, ...getDataItem() },
			];
		});
	};

	const TbodyData = () => {
		return tableData.map((item) => (
			<tr key={item.id}>
				<td>{item.name}</td>
				<td>{item.age}</td>
				<td>{item.gender}</td>
			</tr>
		));
	};

	return (
		<>
			<table>
				<thead>
					<tr>
						<td>姓名</td>
						<td>年龄</td>
						<td>性别</td>
					</tr>
				</thead>
				<tbody>
					<TbodyData />
				</tbody>
			</table>
			<div id="btnTool">
				<span className="button" onClick={add}>
					新增
				</span>
			</div>
		</>
	);
}
