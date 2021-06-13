import { InvalidInputError } from './Error/InvalidInput';
import { DuplicateCharacterError } from './Error/DuplicateCharacter';
import { type } from './type';

const storage = new WeakMap();
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const stringable = (input: unknown): boolean => /string|object/.test(type(input));

/**
 * Immutable alphabet
 *
 * @class Alphabet
 */
export class Alphabet {
	constructor(source: string = characters) {
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
	get characters(): string {
		return storage.get(this);
	}

	/**
	 * Get the length of the alphabet
	 *
	 * @readonly
	 * @memberof Alphabet
	 */
	get length(): number {
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
	slice(start: number, end: number): Alphabet {
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
	charAt(index: number): string {
		return this.characters[index];
	}

	/**
	 * Get the character code at given index
	 *
	 * @param {numer} index
	 * @returns {number} charcode
	 * @memberof Alphabet
	 */
	charCodeAt(index: number): number | undefined {
		const char = this.charAt(index);

		return char ? char.charCodeAt(0) : undefined;
	}

	/**
	 * Get the code point at given index
	 *
	 * @param {numer} index
	 * @returns {number} codepoint
	 * @memberof Alphabet
	 */
	codePointAt(index: number): number | undefined {
		const char = this.charAt(index);

		return char ? char.codePointAt(0) : undefined;
	}

	/**
	 * Get the index of the given character
	 *
	 * @param {string} char
	 * @returns {number} index
	 * @memberof Alphabet
	 */
	indexOf(char: string): number {
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
	map(...list: Array<number>): Array<string> {
		const { length } = this;
		const normal = (index: number): number => index < 0 ? normal(length + index) : index;

		return list.map((index) => this.charAt(normal(index) % length));
	}

	/**
	 * Convert the Alphabet into a string
	 *
	 * @returns {string} chars
	 * @memberof Alphabet
	 */
	toString(): string {
		return this.characters;
	}

	/**
	 * Ensure the Alphabet is properly JSON-stringified
	 *
	 * @returns
	 * @memberof Alphabet
	 */
	toJSON(): string {
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
	static from(characters: string): Alphabet {
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
