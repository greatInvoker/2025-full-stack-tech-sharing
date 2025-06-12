(function () {
	const body = document.body;
	if (body.style.filter === "blur(10px)") {
		body.style.filter = "";
	} else {
		body.style.filter = "blur(10px)";
	}
})();
