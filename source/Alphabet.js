/**
 * Immutable alphabet
 *
 * @class Alphabet
 */
class Alphabet {
	/**
	 * Get the available characters
	 *
	 * @readonly
	 * @static
	 * @memberof Alphabet
	 */
	static get CHARACTERS() {
		return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	}

	/**
	 * Get the length of the alphabet
	 *
	 * @readonly
	 * @static
	 * @memberof Alphabet
	 */
	static get length() {
		return this.CHARACTERS.length;
	}

	/**
	 * Get the character at given index
	 *
	 * @static
	 * @param {number} index
	 * @returns {string} char
	 * @memberof Alphabet
	 */
	static charAt(index) {
		return this.CHARACTERS.charAt(index);
	}

	/**
	 * Get the character code at given index
	 *
	 * @static
	 * @param {numer} index
	 * @returns {number} charcode
	 * @memberof Alphabet
	 */
	static charCodeAt(index) {
		return this.CHARACTERS.charCodeAt(index);
	}

	/**
	 * Get the index of the given character
	 *
	 * @static
	 * @param {string} char
	 * @returns {number} index
	 * @memberof Alphabet
	 */
	static indexOf(char) {
		return this.CHARACTERS.indexOf(char);
	}

	/**
	 * Map any amount of indices to the corresponding characters (wrapping the
	 * indices around if they exceed the length of the alphabet)
	 *
	 * @static
	 * @param {number} ...list
	 * @returns {string} [char]
	 * @memberof Alphabet
	 */
	static map(...list) {
		const { length } = this.CHARACTERS;

		return list.map((index) => this.charAt(index % length));
	}

	/**
	 * Convert the Alphabet into a string
	 *
	 * @static
	 * @returns {string} chars
	 * @memberof Alphabet
	 */
	static toString() {
		return this.CHARACTERS;
	}

	/**
	 * Ensure the Alphabet is properly JSON-stringified
	 *
	 * @static
	 * @returns
	 * @memberof Alphabet
	 */
	static toJSON() {
		return String(Alphabet);
	}
}

module.exports = Alphabet;
