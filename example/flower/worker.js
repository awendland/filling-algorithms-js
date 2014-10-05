importScripts('//rawgithub.com/awendland/filling-algorithms-js/master/src/rnd-fill.js');
onmessage = function (oEvent) {
	var points = [],
		width = oEvent.data.width,
		height = oEvent.data.height,
		pixelSize = oEvent.data.pixelSize;
	while(true) {
		var result = RndFill.bestOf(points, 10, width, height);
		if (points.length === 0 || result.dist > pixelSize - 1) {
			points.push(result.best);
			postMessage(result.best);
		}
	}
};