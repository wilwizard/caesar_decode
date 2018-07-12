mod = function(num, base) {
    return ((num%base)+base)%base;
};

class CeasarLetter {
	constructor(char) {
		this.bigAValue = 'A'.charCodeAt();
		this.littleAValue = 'a'.charCodeAt();
		this.alphabet = 26;
		this.char = char
	}

	isLowerCase() {
		const charVal = this.char.charCodeAt();
		return (charVal >= this.littleAValue && charVal <= this.littleAValue + this.alphabet);
	}

	isUpperCase() {
		const charVal = this.char.charCodeAt();
		return (charVal >= this.bigAValue && charVal <= this.bigAValue + this.alphabet);
	}

	shiftBy(number) {
		let newCharVal = this.char.charCodeAt();
		let offset;
		if (this.isUpperCase()) {
			offset = this.bigAValue;
		} else if (this.isLowerCase()) {
			offset = this.littleAValue;
		} else {
			return this.char;
		}

		newCharVal = mod(newCharVal - offset + number, this.alphabet);
		newCharVal += offset;

		return String.fromCharCode(newCharVal);
	}

}

const tests = {
	mod: function() {
		return [
			mod(5,2) === 1,
			mod(100,1) === 0,
			mod(-1, 13) === 12,
			mod(-100, 13) === 4
		];
	},

	isLowerCase: function() {
		return [
			new CeasarLetter('a').isLowerCase() === true,
			new CeasarLetter('x').isLowerCase() === true,
			new CeasarLetter('z').isLowerCase() === true,
			new CeasarLetter('A').isLowerCase() === false,
			new CeasarLetter('Z').isLowerCase() === false,
			new CeasarLetter('@').isLowerCase() === false
		];
	},

	isUpperCase: function() {
		return [
			new CeasarLetter('a').isUpperCase() === false,
			new CeasarLetter('x').isUpperCase() === false,
			new CeasarLetter('z').isUpperCase() === false,
			new CeasarLetter('A').isUpperCase() === true,
			new CeasarLetter('Z').isUpperCase() === true,
			new CeasarLetter('@').isUpperCase() === false
		];
	},



	shiftBy: function() {
		return [
			new CeasarLetter('a').shiftBy(2) === 'c',
			new CeasarLetter('x').shiftBy(2) === 'z',
			new CeasarLetter('z').shiftBy(2) === 'b',
			new CeasarLetter('A').shiftBy(2) === 'C',
			new CeasarLetter('Z').shiftBy(2) === 'B',
			new CeasarLetter('@').shiftBy(2) === '@'
		];
	}
};


if (process.argv[2] === 'test') {
	for (testCase in tests) {
		if (tests[testCase]().every((test) => {
			return test;
		})) {
			console.log(`${testCase} passes`);
		} else {
			console.log(`${testCase} fails`);
		}
	}
}

module.exports = CeasarLetter;



