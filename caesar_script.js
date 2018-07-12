const caesarDecode = require('./caesar_decode');

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question(`Insert encoded message:\n`, (encodedMessage) => {
	caesarDecode(encodedMessage).then((result) => {
		console.log(result);
	});

	rl.close();
});
