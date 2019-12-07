// PART I
// 1. find all coordinates the wire cross
// 2. find all intersection points of the 2 wires
// 3. calculate the nearest distance to the central

// PART II
// 1. find the steps a wire goes for each intersection point (starting at origin)
// 1.1. take the intersections and check the position in the list of steps for each wire
// 2. find the lowest steps and add them together for both wires
exports.nearestDistance = ((wire1, wire2) => {
	const pathOfWire1 = this.calcAllSteps(wire1, [0,0]);
	const pathOfWire2 = this.calcAllSteps(wire2, [0,0]);
	console.debug("calc intersections of paths with length " + pathOfWire1.length + " and " + pathOfWire2.length);
	const crossings = this.intersections(pathOfWire1, pathOfWire2);
	const distances = crossings.map(point => this.distance([0,0], point)).sort((a,b) => a-b);
	return distances[0];
});

exports.calc = ((direction, start) => {
	var result = [];
	const allSteps = Array(this.steps(direction)).fill().map((x, i) => i);
	allSteps.forEach((number, index) => {
		var startingpoint = (index == 0) ? start : result[index-1];
		if(this.isRight(direction)) {
			result[index] = this.goRight(startingpoint);
		}
		else if(this.isLeft(direction)) {
			result[index] = this.goLeft(startingpoint);
		}
		else if(this.isUp(direction)) {
			result[index] = this.goUp(startingpoint);
		}
		else if(this.isDown(direction)) {
			result[index] = this.goDown(startingpoint);
		}
	});
	return result;
});

exports.calcAllSteps = ((ways, start) => {
	var result = [start];
	ways.forEach((way, index) => {
		var startingpoint = (index == 0) ? start : result[result.length-1];
		this.calc(way, startingpoint).map(coordinate => result.push(coordinate));
	})
	return result;
});

exports.isRight = ((direction) => direction.substring(0,1) == "R");
exports.isLeft = ((direction) => direction.substring(0,1) == "L");
exports.isUp = ((direction) => direction.substring(0,1) == "U");
exports.isDown = ((direction) => direction.substring(0,1) == "D");
exports.goRight = (start => [start[0], start[1]+1]);
exports.goLeft = (start => [start[0], start[1]-1]);
exports.goUp = (start => [start[0]+1, start[1]]);
exports.goDown = (start => [start[0]-1, start[1]]);
exports.steps = ((direction) => parseInt(direction.substring(1, direction.length), 10));

exports.stepsToIntersections = ((wire, intersections) => intersections.map((intersection) => {
	return wire.findIndex((element) => element[0] == intersection[0] && element[1] == intersection[1])
}));

exports.xstepsToShortestIntersection = ((wire, intersections) => intersections.map((intersection) => {
	return wire.findIndex((element) => element[0] == intersection[0] && element[1] == intersection[1])
}).sort((a,b) => a-b)[0]);

exports.intersections = ((wire1, wire2) => wire1.filter((coordinate) => wire2.find(element => 
	element[0] == coordinate[0] && 
	element[1] == coordinate[1] &&
	element[0] != 0 && element[1] != 0 // ignore first entry since it is the start point
	))
);
exports.distance = ((point1, point2) => Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]));

exports.stepsToShortestIntersection = ((steps1, steps2) => steps1.map((element, index) => {
	return element + steps2[index];
}).sort((a,b) => a-b)[0]);