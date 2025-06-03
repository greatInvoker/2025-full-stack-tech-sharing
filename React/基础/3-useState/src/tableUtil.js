const initData = [
	{
		id: "1",
		name: "张三",
		age: 18,
		gender: "男",
	},
	{
		id: "2",
		name: "李四",
		age: 20,
		gender: "女",
	},
	{
		id: "3",
		name: "王五",
		age: 22,
		gender: "男",
	},
	{
		id: "4",
		name: "赵六",
		age: 24,
		gender: "女",
	},
];
const getDataItem = () => {
	const lastNameArr = [
		"赵",
		"钱",
		"孙",
		"李",
		"周",
		"吴",
		"郑",
		"王",
		"冯",
		"陈",
	];
	const firstNameArr = [
		"一",
		"二",
		"三",
		"四",
		"五",
		"六",
		"七",
		"八",
		"九",
		"十",
	];
	const name =
		lastNameArr[Math.floor(Math.random() * 10)] +
		firstNameArr[Math.floor(Math.random() * 10)];
	const gender = ["男", "女"][Math.floor(Math.random() * 2)];
	const age = Math.floor(Math.random() * 100) + 1;
	return { name, gender, age };
};

export { initData, getDataItem };
