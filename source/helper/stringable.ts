import { type } from './type';

/**
 * Test whether given input is or can be casted to a string
 *
 * @param {*} input
 * @returns {boolean} stringable
 */
export function stringable(input: unknown): boolean {
	return /string|object/.test(type(input));
};
