const expect = require("chai").expect;
const functions = require('./4');

/* rules to check via functions:
	* two adjacent digits are the same (like 22 in 122345)
	* going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679)
*/

describe("The equality rule", () => {
	it("compliant case", () => {
		expect(functions.hasEqualAdjacentDigits(112345)).to.be.true;
		expect(functions.hasEqualAdjacentDigits(152355)).to.be.true;
	})
	it("uncompliant cases", () => {
		expect(functions.hasEqualAdjacentDigits(123456)).to.be.false;
		expect(functions.hasEqualAdjacentDigits(987654)).to.be.false;
	}) 
})

describe("The never decreasing digit rule", () => {
	it("compliant case", () => {
		expect(functions.hasNoDecreasingDigits(112345)).to.be.true;
		expect(functions.hasNoDecreasingDigits(467899)).to.be.true;
	})
	it("uncompliant cases", () => {
		expect(functions.hasNoDecreasingDigits(123465)).to.be.false;
		expect(functions.hasNoDecreasingDigits(555554)).to.be.false;
	}) 
})

describe("The equality rule Part 2", () => {
	console.debug("run The equality rule Part 2");
	it("compliant case", () => {
		expect(functions.hasEqualAdjacentDigits(112233)).to.be.true;
		expect(functions.hasEqualAdjacentDigits(111122)).to.be.true;
	})
	it("uncompliant cases", () => {
		expect(functions.hasEqualAdjacentDigits(123444)).to.be.false;
		expect(functions.hasEqualAdjacentDigits(444444)).to.be.false;
		expect(functions.hasEqualAdjacentDigits(555444)).to.be.false;
		expect(functions.hasEqualAdjacentDigits(987654)).to.be.false;
	}) 
})

describe("Solution", () => {
	var numberOfDifferentPasswords = 0;
	for(var i = 284639; i<=748759; i++) {
		if( 
			functions.hasEqualAdjacentDigits(i) && 
			functions.hasNoDecreasingDigits(i)
		) {
			numberOfDifferentPasswords++;
		}
	}
	console.debug(numberOfDifferentPasswords);
})