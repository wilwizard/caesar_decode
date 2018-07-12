const CeasarLetter = require('./caesar_letter');

function caesarShift(message, shift = 2) {
	const intShift = parseInt(shift);

	return message.split('').map((char) => {
		let ceasarLetter = new CeasarLetter(char);
		if (ceasarLetter.isLowerCase() || ceasarLetter.isUpperCase()) {
			return ceasarLetter.shiftBy(intShift);
		} else {
			return char;
		}
	}).join('');
};


if (require.main === module) {

	const readline = require('readline');

	const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	const shift = process.argv[2];

	rl.question(`Insert message:\n`, (message) => {
		console.log(`${caesarShift(message, shift)}`);
		rl.close();
	});
} else {
	module.exports = caesarShift;
}
