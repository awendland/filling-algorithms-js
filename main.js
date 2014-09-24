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
		var testPoints = [];
		for (var i = 0; i < sampleCount; i++) {
			testPoints.push({
				x: Math.floor(Math.random() * width),
				y: Math.floor(Math.random() * height)
			});
			ctx.fillStyle = "#eee";
			ctx.fillRect(testPoints[i].x, testPoints[i].y, 2, 2);
		};

		var best = {
			dist: 0,
			point: testPoints[0]
		}
		function distsToPoints(x, y, points) {
			var dists = [];
			for (var i = 0; i < points.length; i++) {
				var dx = x - points[i].x,
					dy = y - points[i].y;
				dists.push(Math.sqrt(dx*dx + dy*dy));
			};
			return dists;
		}
		for (var i = 0; i < testPoints.length; i++) {
			var dists = distsToPoints(testPoints[i].x, testPoints[i].y, points);
			var min = Math.min.apply(Math, dists);
			if (best.dist < min) {
				best.dist = min;
				best.point = testPoints[i]
			}
		};
		points.push(best.point);

		ctx.fillStyle = "red";
		ctx.fillRect(best.point.x, best.point.y, size, size);
		// Print timing
		var timeElapsed = Math.floor((window.performance.now() - start) * 1000);
		timing.textContent = timeElapsed + " μs";
	}, 100);
}