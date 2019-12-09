const expect = require("chai").expect;
const data = require('./input');
const anotherdata = require('./anotherInput');

describe.only("Find all direct an indirect orbits", () => {
	xit("Test input", () => {
		//expect(countOrbits(data.testinput)).to.equal(42);
		//countOrbitsSaveResources(data.testinput);
	})
	it("Real input", () => {
		//console.debug(countOrbits(anotherdata.anotherExample));
		countOrbitsSaveResources(data.realinput);
		//console.debug(countOrbits(data.realinput));
	})
});


function findCOMs(orbits) {
	orbits.filter(orbit => orbit.findIndex(value => value == "COM")>=0).forEach(comorbit => console.log(comorbit));
}

function countOrbits(input) {
	const orbits = createDirectOrbits(input);
	var withCOM = 0;
	while(withCOM <= 3) {
		createDirectOrbits(input).forEach(pair => {
			orbits.forEach(orbit => {
				if(orbit[orbit.length-1] == pair[0]) {
					orbits.push(orbit.concat(pair[1]));
				}
			})
		})
		withCOM = countConnectionsWithCenter(orbits);
		console.debug("Connectins with center: " + withCOM);
	}
	return orbits.length;
}

function countOrbitsSaveResources(input) {
	var counter = 0;
	const orbits = createDirectOrbits(input);
	var startWithCOM = 0;
	const allOrbits = {};
	orbits.forEach(pair => {
		var name = pair.join();
		if (allOrbits[name] == undefined) {
			allOrbits[name] = 1;
			counter++;
		}
		if (name.substring(0,3) == "COM") {
			startWithCOM++;
		}
	});

	while(startWithCOM <= input.length) {
		createDirectOrbits(input).forEach(pair => {
			Object.keys(allOrbits).forEach(path => {
				//console.debug("check string: " + path.substring(path.length-1) + "==" + pair[0]);
				if(path.substring(path.length - 3) == pair[0]) {
					var name = path + "," + pair[1];
					if (allOrbits[name] == undefined) {
						allOrbits[name] = 1;
						counter++;
						if (name.substring(0,3) == "COM") {
							startWithCOM++;
							console.debug("full paths found: " + startWithCOM + " / " + input.length + "; element counter: " + counter);
						}
					}
				}
			})
		});
	}
	console.debug("Final result: " + Object.keys(allOrbits).length);
}

function countConnectionsWithCenter(orbits) {
	//console.debug(orbits);
	orbits.filter(orbit => orbit[0] == "COM").forEach((orbit) => console.debug("Starts with COM: " + orbit));
	return orbits.filter(orbit => orbit[0] == "COM").length;
}

function createDirectOrbits(input) {
	return input.map(element => element.split(")"));
}


/*
COM,B
B,C
C,D
COM,B,C
B,C,D
COM,B,C,D
D,E
C,D,E
B,C,D,E
COM,B,C,D,E
E,F
D,E,F
C,D,E,F
B,C,D,E,F
COM,B,C,D,E,F
B,G
COM,B,G
G,H
B,G,H
COM,B,G,H
D,I
C,D,I
B,C,D,I
COM,B,C,D,I
E,J
D,E,J
C,D,E,J
B,C,D,E,J
COM,B,C,D,E,J
J,K
E,J,K
D,E,J,K
C,D,E,J,K
B,C,D,E,J,K
COM,B,C,D,E,J,K
K,L
J,K,L
E,J,K,L
D,E,J,K,L
C,D,E,J,K,L
B,C,D,E,J,K,L
COM,B,C,D,E,J,K,L

*/