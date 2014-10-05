importScripts('//rawgithub.com/awendland/filling-algorithms-js/master/src/rnd-fill.js');
onmessage = function (oEvent) {
	var points = [],
		width = oEvent.data.width,
		height = oEvent.data.height;
	while(true) {
		var result = RndFill.bestOf(points, 10, width, height);
		points.push(result.best);
		postMessage(result);
	}
};