import * as test from 'tape';
import { Alphabet } from '../../source/main';

const characters = '😀😃😄😁😆🙂🙃😉';

test('Alphabet/unicode - mechanics', (t) => {
	const alphabet = Alphabet.from(characters);

	t.equal(String(alphabet), characters, `String(alphabet) is ${characters}`);
	t.equal(JSON.stringify(alphabet), JSON.stringify(characters), `JSON.stringify(alphabet) is "${characters}"`);
	t.equal(alphabet.length, 8, 'length is 8');
	t.equal(alphabet.byteLength, 16, 'byteLength is 16');

	t.equal(alphabet.charAt(3), '😁', 'charAt(3) is "😁"');
	t.equal(alphabet.charCodeAt(3), 56835, 'charCodeAt(3) is 56835');
	t.equal(alphabet.codePointAt(3), 128513, 'codePointAt(3) is 128513');
	t.equal(alphabet.indexOf('😉'), 7, 'indexOf("😉") is 7)');

	t.deepEqual(alphabet.map(7, 33, 77), ['😉', '😃', '🙂'], 'map(7, 33, 77) to ["😉", "😃", "🙂"]')
	t.deepEqual(alphabet.map(-7, -33, -77), ['😃', '😉', '😁'], 'map(7, 33, 77) to ["😃", "😉", "😁"]')

	const three = alphabet.slice(0, 3)
	t.equal(String(three), '😀😃😄', 'String(slice(0, 3)) is "😀😃😄"');

	t.throws(
		() => new Alphabet('😀😃😄😁😆🙂🙃😉😆'),
		/DuplicateCharacterError: Alphabets cannot contain duplicate characters, found "😆" in "😀😃😄😁😆🙂🙃😉😆"/,
		'throws errors on duplicate emoji'
	);

	t.end();
});
