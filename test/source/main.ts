import * as test from 'tape';
import { Alphabet } from '../../source/main';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

test('Alphabet/defaults - characters', (t) => {
	const alphabet = new Alphabet();

	t.true('characters' in alphabet, 'has characters member');
	t.equal(typeof alphabet.characters, 'string', 'characters is a string');
	t.equal(alphabet.characters, chars, `characters equal ${chars}`);

	t.end();
});

test('Alphabet/defaults - String', (t) => {
	const alphabet = new Alphabet();

	t.equal(String(alphabet), chars, `String(alphabet) equals ${chars}`);

	t.end();
});

test('Alphabet/defaults - JSON', (t) => {
	const alphabet = new Alphabet();

	t.equal(JSON.stringify(alphabet), `"${chars}"`, `JSON.stringify(alphabet) equals "${chars}"`);

	t.end();
});

test('Alphabet/defaults - length', (t) => {
	const alphabet = new Alphabet();

	t.true('length' in alphabet, 'has length member');
	t.equal(typeof alphabet.length, 'number', 'length is a number');
	t.equal(alphabet.length, 62, 'length equals 62');

	t.end();
});

test('Alphabet/defaults - byteLength', (t) => {
	const alphabet = new Alphabet();

	t.true('byteLength' in alphabet, 'has byteLength member');
	t.equal(typeof alphabet.byteLength, 'number', 'byteLength is a number');
	t.equal(alphabet.byteLength, 62, 'byteLength equals 62');

	t.end();
});

test('Alphabet/defaults - charAt', (t) => {
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

test('Alphabet/defaults - charCodeAt', (t) => {
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

test('Alphabet/defaults - codePointAt', (t) => {
	const alphabet = new Alphabet();

	t.true('codePointAt' in alphabet, 'has codePointAt member')
	t.equal(typeof alphabet.codePointAt, 'function', 'codePointAt is a function');
	t.equal(alphabet.codePointAt(0), 97, 'codePointAt(0) is 97');
	t.equal(alphabet.codePointAt(26), 65, 'codePointAt(26) is 65');
	t.equal(alphabet.codePointAt(52), 48, 'codePointAt(52) is 48');
	t.equal(alphabet.codePointAt(-1), undefined, 'codePointAt(-1) is undefined');
	t.equal(alphabet.codePointAt(63), undefined, 'codePointAt(63) is undefined');

	t.end();
});

test('Alphabet/defaults - indexOf', (t) => {
	const alphabet = new Alphabet();

	t.true('indexOf' in alphabet, 'has indexOf member')
	t.equal(typeof alphabet.indexOf, 'function', 'indexOf is a function');
	t.equal(alphabet.indexOf('a'), 0, 'indexOf("a") is 0');
	t.equal(alphabet.indexOf('A'), 26, 'indexOf("A") is 26');
	t.equal(alphabet.indexOf('0'), 52, 'indexOf("0") is 52');
	t.equal(alphabet.indexOf('@'), -1, 'indexOf("@") is -1');

	t.end();
});

test('Alphabet/defaults - map', (t) => {
	const alphabet = new Alphabet();

	t.true('map' in alphabet, 'has map member')
	t.equal(typeof alphabet.map, 'function', 'map is a function');
	t.deepEqual(alphabet.map(31, 14, 52), ['F', 'o', '0'], 'map(31, 14, 52) to ["F", "o", "0"]');
	t.deepEqual(alphabet.map(1, 27, 53), ['b', 'B', '1'], 'map(1, 27, 53) to ["b", "B", "1"]');
	t.deepEqual(alphabet.map(7, 33, 77), ['h', 'H', 'p'], 'map(7, 33, 77) to ["h", "H", "p"]');
	t.deepEqual(alphabet.map(-7, -33, -77), ['3', 'D', 'V'], 'map(-7, -33, -77) to ["3", "D", "V"]');

	t.end();
});
