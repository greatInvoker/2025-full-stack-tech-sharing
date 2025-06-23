let lcpObserver = null;

const initLcpObserver = () => {
	lcpObserver = new PerformanceObserver((entries) => {
		const entriesList = entries.getEntries();
		const lastEntry = entriesList[entriesList.length - 1];
		if (lastEntry) {
			const lcpTime = lastEntry.startTime;
			console.log(`LCP 时间: ${lcpTime} 毫秒`);
		}
	});
	lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
};

window.addEventListener("load", function () {
	initLcpObserver();
});

window.addEventListener("beforeunload", function () {
	if (lcpObserver) {
		lcpObserver.disconnect();
		lcpObserver = null;
	}
});
