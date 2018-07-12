const SUPPORTED_LAUNGUAGES = require('./supported_languages');
const keys = require('./keys');

const DetectLanguage = require('detectlanguage');
const detectLanguage = new DetectLanguage({
	key: keys.detectLanguage,
	ssl: true
});

const caesarShift = require('./caesar_shift');

let promises = [];

module.exports = (message) => {
	for (let i = 0; i <= 26; i++) {
		let decodedMessageAttempt = caesarShift(message, i);

		promises.push(new Promise((resolve, reject) => {
			detectLanguage.detect(decodedMessageAttempt, function(error, result) {
				if(!error && result.length > 0) {
					let firstResult = result[0];
					firstResult.message = decodedMessageAttempt;
					resolve(firstResult);
				} else {
					resolve({});
				}
			});
		}));
	}

	return Promise.all(promises).then((results) => {
		return results.filter((result) => {
			return result.isReliable;
		}).sort((result) => {
			return result.confidence;
		}).map((result) => {
			let langCode = result.language;
			let language = SUPPORTED_LAUNGUAGES.find((obj) => {
				return obj.code === langCode
			}).name;
			return {
				language: language,
				message: result.message,
				confidence: result.confidence
			};
		});
	});
};

