/* global describe, it, expect, source */

const Alphabet = source('Alphabet');
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

describe('Alphabet', () => {
	it('has CHARACTERS constant', (next) => {
		expect('CHARACTERS' in Alphabet).to.equal(true);
		expect(Alphabet.CHARACTERS).to.be.a.string();
		expect(Alphabet.CHARACTERS).to.equal(chars);

		next();
	});

	it('converts to String', (next) => {
		expect(String(Alphabet)).to.equal(chars);

		next();
	});

	it('converts to JSON', (next) => {
		expect(JSON.stringify(Alphabet)).to.equal(`"${chars}"`);

		next();
	});

	it('has length of 62', (next) => {
		expect(Alphabet.length).to.be.a.number();
		expect(Alphabet.length).to.equal(62);

		next();
	});

	it('implements charAt', (next) => {
		expect(Alphabet.charAt).to.be.a.function();
		expect(Alphabet.charAt(0)).to.equal('a');
		expect(Alphabet.charAt(26)).to.equal('A');
		expect(Alphabet.charAt(52)).to.equal('0');

		next();
	});

	it('implements charCodeAt', (next) => {
		expect(Alphabet.charCodeAt).to.be.a.function();
		expect(Alphabet.charCodeAt(0)).to.equal(97);
		expect(Alphabet.charCodeAt(26)).to.equal(65);
		expect(Alphabet.charCodeAt(52)).to.equal(48);

		next();
	});

	it('implements indexOf', (next) => {
		expect(Alphabet.indexOf).to.be.a.function();
		expect(Alphabet.indexOf('a')).to.equal(0);
		expect(Alphabet.indexOf('A')).to.equal(26);
		expect(Alphabet.indexOf('0')).to.equal(52);

		next();
	});

	it('implements map', (next) => {
		expect(Alphabet.map(31, 14, 52)).to.equal(['F', 'o', '0']);
		expect(Alphabet.map(1, 27, 53)).to.equal(['b', 'B', '1']);

		next();
	});
});
