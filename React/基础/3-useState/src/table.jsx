import { useState } from "react";
import { getDataItem } from "./tableUtil";
const PEOPLE_LIST = "people_list";

function getInitData() {
	const lTableData = localStorage.getItem(PEOPLE_LIST);
	try {
		return lTableData ? JSON.parse(lTableData) : [getDataItem(1)];
	} catch (error) {
		console.error("解析 localStorage 数据错误:", error);
		return [getDataItem(1)];
	}
}

const PeopleList = ({ tableData }) => {
	return tableData.map((item) => (
		<tr key={item.id}>
			<td>{item.id}</td>
			<td>{item.name}</td>
			<td>{item.age}</td>
			<td>{item.gender}</td>
		</tr>
	));
};

export default function Table() {
	const [tableData, setTableData] = useState(getInitData); // initialState为函数，惰性初始化
	const [count, setCount] = useState(0); // initialState为number

	const add = () => {
		// 新数据的id依赖prevTableData的length生成，故采用函数式更新
		setTableData((prevTableData) => {
			const result = [...prevTableData, getDataItem(prevTableData.length + 1)];
			try {
				localStorage.setItem(PEOPLE_LIST, JSON.stringify(result));
			} catch (error) {
				console.error("保存数据到 localStorage 错误:", error);
			}
			return result;
		});

		setCount((prevCount) => prevCount + 1); // 🙆推荐：函数式更新，确保原子性
		// setCount(count + 1); // 🙅不推荐：该Demo中不会出问题，但考虑之后代码复杂后可能会因批处理导致count值不可靠，应采用函数式更新增强代码健壮性
	};

	const clear = () => {
		try {
			localStorage.clear();
		} catch (error) {
			console.error("清除 localStorage 数据错误:", error);
		}
		setTableData([getDataItem(1)]); // set函数的基本用法
		setCount(0); // set函数的基本用法
	};

	return (
		<>
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
			<div id="btnTool">
				<span className="button" onClick={add}>
					新增
				</span>
				<span className="ml-12 button" onClick={clear}>
					重置
				</span>
				<span className="pl-12">已增加{count}条数据</span>
			</div>
		</>
	);
}
