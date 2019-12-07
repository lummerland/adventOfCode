/*
	It is a six-digit number.
	The value is within the range given in your puzzle input.
	Two adjacent digits are the same (like 22 in 122345).
	Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

*/
exports.hasEqualAdjacentDigits = (number => {
	const digits = number.toString().split('');
	var digitCounter = {};
	var found = false;
	digits.forEach((digit, index) => {
		if ( index > 0 && digits[index-1] == digit) {
			digitCounter[digit]++;
		} else {
			digitCounter[digit] = 1;
		}
	});
	console.debug(digitCounter)
	Object.keys(digitCounter).forEach(digit => {
		if (digitCounter[digit] == 2) {
			found = true;
		}
	})
	return found;
})

exports.hasNoDecreasingDigits = (number => {
	const digits = number.toString().split('');
	var increasingOrEqual = true;
	digits.forEach((digit, index) => {
		if(index > 0 && digit < digits[index-1]) {
			increasingOrEqual = false;
		}
	});
	return increasingOrEqual;
})