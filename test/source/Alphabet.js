/* global describe, it, expect, source */

const Alphabet = source('Alphabet');
const InvalidInputError = source('Error/InvalidInput');
const DuplicateCharacterError = source('Error/DuplicateCharacter');

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

describe('Alphabet', () => {
	const alphabet = new Alphabet();

	it('provides default characters', (next) => {
		expect('characters' in alphabet).to.equal(true);
		expect(alphabet.characters).to.be.a.string();
		expect(alphabet.characters).to.equal(chars);

		next();
	});

	it('converts to String', (next) => {
		expect(String(alphabet)).to.equal(chars);

		next();
	});

	it('converts to JSON', (next) => {
		expect(JSON.stringify(alphabet)).to.equal(`"${chars}"`);

		next();
	});

	it('has length of 62', (next) => {
		expect(alphabet.length).to.be.a.number();
		expect(alphabet.length).to.equal(62);

		next();
	});

	it('implements charAt', (next) => {
		expect(alphabet.charAt).to.be.a.function();
		expect(alphabet.charAt(0)).to.equal('a');
		expect(alphabet.charAt(26)).to.equal('A');
		expect(alphabet.charAt(52)).to.equal('0');

		next();
	});

	it('implements charCodeAt', (next) => {
		expect(alphabet.charCodeAt).to.be.a.function();
		expect(alphabet.charCodeAt(0)).to.equal(97);
		expect(alphabet.charCodeAt(26)).to.equal(65);
		expect(alphabet.charCodeAt(52)).to.equal(48);

		next();
	});

	it('implements indexOf', (next) => {
		expect(alphabet.indexOf).to.be.a.function();
		expect(alphabet.indexOf('a')).to.equal(0);
		expect(alphabet.indexOf('A')).to.equal(26);
		expect(alphabet.indexOf('0')).to.equal(52);

		next();
	});

	it('implements map', (next) => {
		expect(alphabet.map(31, 14, 52)).to.equal(['F', 'o', '0']);
		expect(alphabet.map(1, 27, 53)).to.equal(['b', 'B', '1']);

		next();
	});

	it('provides singletons', (next) => {
		const one = Alphabet.from('abc');
		const two = Alphabet.from('abc');
		const instance = new Alphabet('abc');

		expect(one).to.shallow.equal(two);
		expect(one).not.shallow.equal(instance);
		expect(two).not.shallow.equal(instance);
		expect(String(one)).to.equal(String(two));
		expect(String(one)).to.equal(String(instance));
		expect(String(two)).to.equal(String(instance));

		next();
	});

	each`
		characters
		-----------
		a
		ABC
		abcABC01
		abcdefghijklmnopqrstuvwxyz
	`('"$characters"', ({ characters }, next) => {
		const instance = new Alphabet(characters);
		const from = Alphabet.from(characters);

		expect(String(instance)).to.equal(characters);
		expect(String(from)).to.equal(characters);

		next();
	});

	describe('throws errors', () => {
		each`
			input        | type      | description
			-------------|-----------|-------------
			${''}        | string    | empty string
			${null}      | null      | null
			${123}       | number    | 123
			${true}      | boolean   | true
			${false}     | boolean   | false
			${[1, 2, 3]} | array     | 1,2,3
		`('"$description"', ({ input, type }, next) => {
			expect(() => new Alphabet(input)).to.throw(
				InvalidInputError,
				`Alphabets requires a string(able), got (${type}) ${input}`
			);

			next();
		});

		each`
			characters                     | duplicate
			-------------------------------|-----------
			aa                             | a
			abcdefghijklmnopqrstuvwxyzazby | azby
		`(
			'"$characters" have duplicate "$duplicate"',
			({ characters, duplicate }, next) => {
				expect(() => new Alphabet(characters)).to.throw(
					DuplicateCharacterError,
					`Alphabets cannot contain duplicate characters, found "${duplicate}" in "${characters}"`
				);

				next();
			}
		);
	});

	it('slices', (next) => {
		const one = Alphabet.from('abcdef');
		const two = Alphabet.from('abc');

		expect(one.slice(0, 3)).to.shallow.equal(two);

		next();
	});
});
