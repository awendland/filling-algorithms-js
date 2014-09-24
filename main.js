window.onload = function () {
	var size = 3;
	random(size);
	bestOf3(size);
}

function random(size) {
	var canvas = document.querySelector('#canvas-rnd'),
		ctx = canvas.getContext('2d');

	var height = 400,
		width = 400;

	canvas.width = width;
	canvas.height = height;

	var points = [];

	setInterval(function randomPoint() {
		var point = {
				x: Math.floor(Math.random() * width),
				y: Math.floor(Math.random() * height)
			}
		points.push(point);

		ctx.fillStyle = "red";
		ctx.fillRect(point.x, point.y, size, size);
	}, 100);
}

function bestOf3(size) {
	var canvas = document.querySelector('#canvas-3'),
		ctx = canvas.getContext('2d');

	var height = 400,
		width = 400;

	canvas.width = width;
	canvas.height = height;

	var points = [];

	setInterval(function randomPoint() {
		var testPoints = [];
		for (var i = 0; i < 3; i++) {
			testPoints.push({
				x: Math.floor(Math.random() * width),
				y: Math.floor(Math.random() * height)
			});
			ctx.fillStyle = "#eee";
			ctx.fillRect(testPoints[i].x, testPoints[i].y, 2, 2);
		};

		var best = {
			dist: 0,
			point: null
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
	}, 100);
}