/**
 * Simple type detection
 *
 * @param {*} input
 * @return {string} type
 */
export function type(input: unknown) {
	return input === null ? 'null' : Array.isArray(input) ? 'array' : typeof input;
}
