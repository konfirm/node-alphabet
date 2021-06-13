import { InvalidInputError } from './Error/InvalidInput';
import { DuplicateCharacterError } from './Error/DuplicateCharacter';
import { stringable } from './helper/stringable';

const storage = new WeakMap();

/**
 * Immutable alphabet
 *
 * @class Alphabet
 */
export class Alphabet {
	constructor(
		source = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	) {
		const alphabet = stringable(source) ? String(source) : '';

		if (!alphabet.length) {
			throw new InvalidInputError(source);
		}

		const duplicate = Array.from(alphabet)
			.filter((v, i, a) => a.indexOf(v) !== i)
			.join('');

		if (duplicate.length) {
			throw new DuplicateCharacterError(alphabet, duplicate);
		}

		storage.set(this, alphabet);
	}

	/**
	 * Obtain the configured characters
	 *
	 * @readonly
	 * @memberof Alphabet
	 */
	get characters() {
		return storage.get(this);
	}

	/**
	 * Get the length of the alphabet
	 *
	 * @readonly
	 * @memberof Alphabet
	 */
	get length() {
		return this.characters.length;
	}

	/**
	 * Extract part of the alphabet and return it as a (singleton) instance of alphabet
	 *
	 * @param {number} start
	 * @param {number} end
	 * @returns {Alphabet} instance
	 * @memberof Alphabet
	 */
	slice(start: number, end: number) {
		const { characters } = this;
		const { constructor: Ctor } = Object.getPrototypeOf(this);

		return Ctor.from(characters.slice(start, end));
	}

	/**
	 * Get the character at given index
	 *
	 * @param {number} index
	 * @returns {string} char
	 * @memberof Alphabet
	 */
	charAt(index: number) {
		return this.characters.charAt(index);
	}

	/**
	 * Get the character code at given index
	 *
	 * @param {numer} index
	 * @returns {number} charcode
	 * @memberof Alphabet
	 */
	charCodeAt(index: number) {
		return this.characters.charCodeAt(index);
	}

	/**
	 * Get the index of the given character
	 *
	 * @param {string} char
	 * @returns {number} index
	 * @memberof Alphabet
	 */
	indexOf(char: string) {
		return this.characters.indexOf(char);
	}

	/**
	 * Map any amount of indices to the corresponding characters (wrapping the
	 * indices around if they exceed the length of the alphabet)
	 *
	 * @param {number} ...list
	 * @returns {string} [char]
	 * @memberof Alphabet
	 */
	map(...list: Array<number>) {
		const { length } = this;

		return list.map((index) => this.charAt(index % length));
	}

	/**
	 * Convert the Alphabet into a string
	 *
	 * @returns {string} chars
	 * @memberof Alphabet
	 */
	toString() {
		return this.characters;
	}

	/**
	 * Ensure the Alphabet is properly JSON-stringified
	 *
	 * @returns
	 * @memberof Alphabet
	 */
	toJSON() {
		return String(this);
	}

	/**
	 * Obtain a singleton instance of Alphabet representing the provided characters
	 *
	 * @static
	 * @param {*} characters
	 * @returns
	 * @memberof Alphabet
	 */
	static from(characters: string) {
		if (!storage.has(this)) {
			storage.set(this, new Map());
		}

		const map = storage.get(this);

		if (!map.has(characters)) {
			map.set(characters, new this(characters));
		}

		return map.get(characters);
	}
}
