window.onload = function () {
	var demos = document.querySelectorAll("article.fill-demo");
	for (var i = 0; i < demos.length; i++) {
		var canvas = demos[i].querySelector("canvas"),
			timing = demos[i].querySelector("span.timing");
		bestOf(canvas, canvas.dataset.sampleCount, 3, timing);
	};
}

function bestOf(canvas, sampleCount, size, timing) {
	var ctx = canvas.getContext('2d');

	var height = 350,
		width = 350;

	canvas.width = width;
	canvas.height = height;

	var points = [];

	setInterval(function randomPoint() {
		var start = window.performance.now();
		var result = RndFill.bestOf(points, sampleCount, width, height);
		for (var i = 0; i < result.testPoints; i++) {
			ctx.fillStyle = "#eee";
			ctx.fillRect(result.testPoints[i].x, result.testPoints[i].y, 2, 2);
		};
		points.push(result.best);

		ctx.fillStyle = "red";
		ctx.fillRect(result.best.x, result.best.y, size, size);
		// Print timing
		var timeElapsed = Math.floor((window.performance.now() - start) * 1000);
		timing.textContent = timeElapsed + " μs";
	}, 100);
}