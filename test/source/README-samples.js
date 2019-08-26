/* global describe, it, expect, source */

const Alphabet = source('Alphabet');
const InvalidInputError = source('Error/InvalidInput');
const DuplicateCharacterError = source('Error/DuplicateCharacter');

describe('README Samples', () => {
	it('Singleton', (next) => {
		const singleton = Alphabet.from('abc');
		const proof = Alphabet.from('abc');

		expect(singleton === proof).to.be.true();

		const instance = new Alphabet('abc');

		expect(singleton === instance).to.be.false();

		next();
	});

	describe('Possible error', () => {
		it(`''`, (next) => {
			expect(() => new Alphabet('')).to.throw(InvalidInputError);
			next();
		});

		it(`123`, (next) => {
			expect(() => new Alphabet(123)).to.throw(InvalidInputError);
			next();
		});

		it(`null`, (next) => {
			expect(() => new Alphabet(null)).to.throw(InvalidInputError);
			next();
		});

		it(`{}`, (next) => {
			expect(() => new Alphabet({})).to.throw(DuplicateCharacterError);
			next();
		});

		it(`[]`, (next) => {
			expect(() => new Alphabet([])).to.throw(InvalidInputError);
			next();
		});
	});
});
