/**
 * Error thrown if an Alphabet receives duplicate characters
 *
 * @class DuplicateCharacterError
 * @extends {Error}
 */
export class DuplicateCharacterError extends Error {
	/**
	 * Creates an instance of DuplicateCharacterError
	 *
	 * @param {object} [meta={source, duplicate}]
	 * @memberof DuplicateCharacterError
	 */
	constructor(source: string, duplicate: string) {
		super(
			`Alphabets cannot contain duplicate characters, found "${duplicate}" in "${source}"`
		);

		const {
			constructor,
			constructor: { name }
		} = this;
		this.name = name;

		Error.captureStackTrace(this, constructor);
	}
}
