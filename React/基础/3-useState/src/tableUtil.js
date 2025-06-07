const getDataItem = (id) => {
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
	return { id, name, gender, age };
};

export { getDataItem };
