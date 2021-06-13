import * as test from 'tape';
import { Alphabet } from '../../source/main';
import { InvalidInputError } from '../../source/Error/InvalidInput';
import { DuplicateCharacterError } from '../../source/Error/DuplicateCharacter';

test('README - Singleton', (t) => {
	const singleton = Alphabet.from('abc');
	const proof = Alphabet.from('abc');

	t.true(singleton === proof, 'provides singletons');
	t.false(singleton === new Alphabet('abc'), 'allows for new instances');

	t.end();
});

test('README - Errors - InvalidInputError', (t) => {
	t.throws(() => new Alphabet(''), InvalidInputError, 'does not allow empty string');
	t.throws(() => new Alphabet(123 as any), InvalidInputError, 'does not allow numeric input');
	t.throws(() => new Alphabet(null as any), InvalidInputError, 'does not allow null as input');
	t.throws(() => new Alphabet([] as any), InvalidInputError, 'does not allow array input');

	t.end();
});

test('README - Errors - DuplicateCharacterError', (t) => {
	t.throws(() => new Alphabet({} as any), DuplicateCharacterError, 'does not allow empty object input');

	t.end();
});
