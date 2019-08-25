const type = require('../helper/type.js');

/**
 * Error thrown if an Alphabet receives less characters than needed
 *
 * @class InputLengthError
 * @extends {Error}
 */
class InputLengthError extends Error {
	/**
	 * Creates an instance of InputLengthError
	 *
	 * @memberof InputLengthError
	 */
	constructor(source) {
		super(
			`Alphabets requires a string(able), got (${type(source)}) ${source}`
		);

		const {
			constructor,
			constructor: { name }
		} = this;
		this.name = name;

		Error.captureStackTrace(this, constructor);
	}
}

module.exports = InputLengthError;
