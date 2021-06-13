import { type } from '../helper/type';

/**
 * Error thrown if an Alphabet receives less characters than needed
 *
 * @class InvalidInputError
 * @extends {Error}
 */
export class InvalidInputError extends Error {
	/**
	 * Creates an instance of InvalidInputError
	 *
	 * @memberof InvalidInputError
	 */
	constructor(source: unknown) {
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
