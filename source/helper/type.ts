/**
 * Simple type detection
 *
 * @param {*} input
 * @return {string} type
 */
export function type(input: unknown): string {
	return input === null ? 'null' : Array.isArray(input) ? 'array' : typeof input;
}
