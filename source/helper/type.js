/**
 * Simple type detection
 *
 * @param {*} input
 * @return {string} type
 */
module.exports = (input) =>
	input === null ? 'null' : Array.isArray(input) ? 'array' : typeof input;
