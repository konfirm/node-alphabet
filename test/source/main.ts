import * as test from 'tape';
import each from 'template-literal-each';
import { Alphabet } from '../../source/main';
import { InvalidInputError } from '../../source/Error/InvalidInput';
import { DuplicateCharacterError } from '../../source/Error/DuplicateCharacter';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

test('it provides default characters', (t) => {
	const alphabet = new Alphabet();
	t.equal('characters' in alphabet, true);
	t.equal(typeof alphabet.characters, 'string');
	t.equal(alphabet.characters, chars);

	t.end();
});

test('it converts to String', (t) => {
	const alphabet = new Alphabet();
	t.equal(String(alphabet), chars);

	t.end();
});

test('it converts to JSON', (t) => {
	const alphabet = new Alphabet();
	t.equal(JSON.stringify(alphabet), `"${chars}"`);

	t.end();
});

test('it has length of 62', (t) => {
	const alphabet = new Alphabet();
	t.equal(typeof alphabet.length, 'number');
	t.equal(alphabet.length, 62);

	t.end();
});

test('it implements charAt', (t) => {
	const alphabet = new Alphabet();
	t.equal(typeof alphabet.charAt, 'function');
	t.equal(alphabet.charAt(0), 'a');
	t.equal(alphabet.charAt(26), 'A');
	t.equal(alphabet.charAt(52), '0');

	t.end();
});

test('it implements charCodeAt', (t) => {
	const alphabet = new Alphabet();
	t.equal(typeof alphabet.charCodeAt, 'function');
	t.equal(alphabet.charCodeAt(0), 97);
	t.equal(alphabet.charCodeAt(26), 65);
	t.equal(alphabet.charCodeAt(52), 48);

	t.end();
});

test('it implements indexOf', (t) => {
	const alphabet = new Alphabet();
	t.equal(typeof alphabet.indexOf, 'function');
	t.equal(alphabet.indexOf('a'), 0);
	t.equal(alphabet.indexOf('A'), 26);
	t.equal(alphabet.indexOf('0'), 52);

	t.end();
});

test('it implements map', (t) => {
	const alphabet = new Alphabet();
	t.deepEqual(alphabet.map(31, 14, 52), ['F', 'o', '0']);
	t.deepEqual(alphabet.map(1, 27, 53), ['b', 'B', '1']);

	t.end();
});

test('it provides singletons', (t) => {
	const one = Alphabet.from('abc');
	const two = Alphabet.from('abc');
	const instance = new Alphabet('abc');

	t.true(one === two);
	t.false(one === instance);
	t.false(two === instance);
	t.equal(String(one), String(two));
	t.equal(String(one), String(instance));
	t.equal(String(two), String(instance));

	t.end();
});

test('it allows custom characters', (t) => {
	each`
		characters
		-----------
		a
		ABC
		abcABC01
		abcdefghijklmnopqrstuvwxyz
	`(({ characters }) => {
		const instance = new Alphabet(characters as string);
		const from = Alphabet.from(characters as string);

		t.equal(String(instance), characters);
		t.equal(String(from), characters);
	});

	t.end();
});


test('it throws errors', (t) => {
	each`
		input        | type      | description
		-------------|-----------|-------------
		${''}        | string    | empty string
		${null}      | null      | null
		${123}       | number    | 123
		${true}      | boolean   | true
		${false}     | boolean   | false
		${[1, 2, 3]} | array     | 1,2,3
	`((record) => {
		const { input, type, description } = record as { input: any, [key: string]: string };

		t.throws(
			() => new Alphabet(input),
			InvalidInputError,
			`Alphabets requires a string(able), got (${type}) ${input}`
		);
	});

	each`
		characters                     | duplicate
		-------------------------------|-----------
		aa                             | a
		abcdefghijklmnopqrstuvwxyzazby | azby
	`((record) => {
		const { characters, duplicate } = record as { [key: string]: string };

		t.throws(
			() => new Alphabet(characters),
			DuplicateCharacterError,
			`Alphabets cannot contain duplicate characters, found "${duplicate}" in "${characters}"`
		);
	});

	t.end();
});

test('it slices', (t) => {
	const one = Alphabet.from('abcdef');
	const two = Alphabet.from('abc');

	t.true(one.slice(0, 3) === two);

	t.end();
});
