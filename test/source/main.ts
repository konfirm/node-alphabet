import * as test from 'tape';
import each from 'template-literal-each';
import { Alphabet } from '../../source/main';
import { InvalidInputError } from '../../source/Error/InvalidInput';
import { DuplicateCharacterError } from '../../source/Error/DuplicateCharacter';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

test('it provides default characters', (t) => {
	const alphabet = new Alphabet();

	t.true('characters' in alphabet, 'has characters member');
	t.equal(typeof alphabet.characters, 'string', 'characters is a string');
	t.equal(alphabet.characters, chars, `characters equal ${chars}`);

	t.end();
});

test('it converts to String', (t) => {
	const alphabet = new Alphabet();

	t.equal(String(alphabet), chars, `String(alphabet) equals ${chars}`);

	t.end();
});

test('it converts to JSON', (t) => {
	const alphabet = new Alphabet();

	t.equal(JSON.stringify(alphabet), `"${chars}"`, `JSON.stringify(alphabet) equals "${chars}"`);

	t.end();
});

test('it has length of 62', (t) => {
	const alphabet = new Alphabet();

	t.true('length' in alphabet, 'has length member');
	t.equal(typeof alphabet.length, 'number', 'length is a number');
	t.equal(alphabet.length, 62, 'length equals 62');

	t.end();
});

test('it implements charAt', (t) => {
	const alphabet = new Alphabet();

	t.true('charAt' in alphabet, 'has charAt member')
	t.equal(typeof alphabet.charAt, 'function', 'charAt is a function');
	t.equal(alphabet.charAt(0), 'a', 'charAt(0) is "a"');
	t.equal(alphabet.charAt(26), 'A', 'charAt(26) is "A"');
	t.equal(alphabet.charAt(52), '0', 'charAt(52) is "0"');
	t.equal(alphabet.charAt(-1), undefined, 'charAt(-1) is undefined');
	t.equal(alphabet.charAt(63), undefined, 'charAt(63) is undefined');

	t.end();
});

test('it implements charCodeAt', (t) => {
	const alphabet = new Alphabet();

	t.true('charCodeAt' in alphabet, 'has charCodeAt member')
	t.equal(typeof alphabet.charCodeAt, 'function', 'charCodeAt is a function');
	t.equal(alphabet.charCodeAt(0), 97, 'charCodeAt(0) is 97');
	t.equal(alphabet.charCodeAt(26), 65, 'charCodeAt(26) is 65');
	t.equal(alphabet.charCodeAt(52), 48, 'charCodeAt(52) is 48');
	t.equal(alphabet.charCodeAt(-1), undefined, 'charCodeAt(-1) is undefined');
	t.equal(alphabet.charCodeAt(63), undefined, 'charCodeAt(63) is undefined');

	t.end();
});

test('it implements indexOf', (t) => {
	const alphabet = new Alphabet();

	t.true('indexOf' in alphabet, 'has indexOf member')
	t.equal(typeof alphabet.indexOf, 'function', 'indexOf is a function');
	t.equal(alphabet.indexOf('a'), 0, 'indexOf("a") is 0');
	t.equal(alphabet.indexOf('A'), 26, 'indexOf("A") is 26');
	t.equal(alphabet.indexOf('0'), 52, 'indexOf("0") is 52');
	t.equal(alphabet.indexOf('@'), -1, 'indexOf("@") is -1');

	t.end();
});

test('it implements map', (t) => {
	const alphabet = new Alphabet();

	t.true('map' in alphabet, 'has map member')
	t.equal(typeof alphabet.map, 'function', 'map is a function');
	t.deepEqual(alphabet.map(31, 14, 52), ['F', 'o', '0'], 'maps [31, 14, 52] to ["F", "o", "0"]');
	t.deepEqual(alphabet.map(1, 27, 53), ['b', 'B', '1'], 'maps [1, 27, 53] to ["b", "B", "1"]');

	t.end();
});

test('it provides singletons', (t) => {
	const one = Alphabet.from('abc');
	const two = Alphabet.from('abc');
	const instance = new Alphabet('abc');

	t.true(one === two, 'one and two are equal');
	t.false(one === instance, 'one does not equal an instance');
	t.false(two === instance, 'two does not equal an instance');
	t.equal(String(one), String(two), 'stringified one and two are equal');
	t.equal(String(one), String(instance), 'stringified one and instance are equal');
	t.equal(String(two), String(instance), 'stringified two and instance are equal');

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

		t.equal(String(instance), characters, `creates instance with "${characters}"`);
		t.equal(String(from), characters, `creates singleton with "${characters}"`);
	});

	t.end();
});


test('it throws errors', (t) => {
	each`
		input        | type
		-------------|------
		${''}        | string
		${null}      | null
		${123}       | number
		${true}      | boolean
		${false}     | boolean
		${[1, 2, 3]} | array
	`((record) => {
		const { input, type } = record as { input: any, [key: string]: string };

		t.throws(
			() => new Alphabet(input),
			InvalidInputError,
			`throws InvalidInputError for ${type} ${JSON.stringify(input)}`
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
			`throws DuplicateCharacterError for "${characters}" (duplicate "${duplicate}")`
		);
	});

	t.end();
});

test('it slices', (t) => {
	const one = Alphabet.from('abcdef');
	const two = Alphabet.from('abc');

	t.true('slice' in one, 'has slice member')
	t.equal(typeof one.slice, 'function', 'slice is a function');
	t.true(one.slice(0, 3) === two, 'slicing create singletons');

	t.end();
});
