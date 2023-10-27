import * as test from 'tape';
import { each } from 'template-literal-each';
import { Alphabet } from '../../source/main';
import { InvalidInputError } from '../../source/Error/InvalidInput';
import { DuplicateCharacterError } from '../../source/Error/DuplicateCharacter';

test('Alphabet/custom - singletons', (t) => {
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

test('Alphabet/custom - alphabets', (t) => {
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


test('Alphabet/custom - errors', (t) => {
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

test('Alphabet/custom - slice', (t) => {
	const one = Alphabet.from('abcdef');
	const two = Alphabet.from('abc');

	t.true('slice' in one, 'has slice member')
	t.equal(typeof one.slice, 'function', 'slice is a function');
	t.true(one.slice(0, 3) === two, 'slicing create singletons');

	t.end();
});
