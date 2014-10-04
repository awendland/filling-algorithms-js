//     RndFill.js 0.9.0
//     @author: Alex Wendland
//
//     Copyright (c) 2014 Alex Wendland
//     All Rights Reserved. Apache Software License 2.0
//     http://www.apache.org/licenses/LICENSE-2.0

(function () {
  /*jshint bitwise: true, camelcase: false, curly: true, eqeqeq: true,
    forin: false, immed: true, indent: 2, latedef: true, newcap: false,
    noarg: true, noempty: false, nonew: true, plusplus: false,
    quotmark: single, regexp: false, undef: true, unused: true, strict: false,
    trailing: true, asi: false, boss: false, debug: false, eqnull: true,
    es5: false, esnext: false, evil: true, expr: false, funcscope: false,
    iterator: false, lastsemic: false, laxbreak: false, laxcomma: false,
    loopfunc: false, multistr: true, onecase: false, proto: false,
    regexdash: false, scripturl: false, smarttabs: false, shadow: true,
    sub: true, supernew: true, validthis: false */

  /*global exports, global, define, module */

  (function (root, factory) {
    if (typeof exports === 'object') {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory(this);
    } else if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(function () {
        return factory(root);
      });
    } else {
      // Browser globals (root is window)
      root.RndFill = factory(root);
    }
  }(this, function (global) {

    // Baseline setup
    // --------------

    // Helper function for finding the smallest value in an area
    // Most performant according to http://jsperf.com/math-min-apply-vs-loop/2
    function arrayMin(arr) {
    	var min = arr[0],
    		length = arr.length
    	for (var i = length - 1; i >= 0; i--) {
    		if (arr[i] < min) {
    			min = arr[i];
    		}
    	}
    	return min;
    }

    // Helper function for creating an array of all the distances between
    // given x, y coords and an array of points
    function distsToPoints(x, y, points) {
    	var dists = [];
    	for (var i = 0; i < points.length; i++) {
    		var dx = x - points[i].x,
    			dy = y - points[i].y;
    		dists.push(Math.sqrt(dx*dx + dy*dy));
    	};
    	return dists;
    }

    // The base `RndFill` implementation.
    function RndFill() {}

    // Utilities
    // ---------

    // ###bestOf
    //
    // Returns the point that is farthest from existing points out of a set
    // of length `sampleSize` of random points
    //
    // - `points`: an array of existing points.
    // - `sampleSize`: the number of random points to calculate and test.
    //
    RndFill.bestOf = function bestOf(points, sampleSize, width, height) {
    	// Setup array of size sampleSize
    	// and populate it with random points
		var testPoints = [];
		for (var i = 0; i < sampleSize; i++) {
			testPoints.push({
				x: Math.floor(Math.random() * width),
				y: Math.floor(Math.random() * height)
			});
		};
		// Object for storing the current best point
		var best = {
			dist: 0,
			point: testPoints[0]
		}
		// Loop over each test point to find which is the farthest away
		for (var i = 0; i < testPoints.length; i++) {
			// Calculate the distance between the test point and existing points
			var dists = distsToPoints(testPoints[i].x, testPoints[i].y, points);
			// Find the minimum distance between the test point and the existing
			// points
			var min = arrayMin(dists);
			// If this distance is larger than the existing best point, use this
			// test point as the best point instead
			if (best.dist < min) {
				best.dist = min;
				best.point = testPoints[i]
			}
		};
		// Return the best point and accompanying data
		return {
			dist: best.dist,
			best: best.point,
			testPoints: testPoints
		};
	}

    return RndFill;
  }));
} ());