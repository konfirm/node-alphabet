const type = require('./type.js');

/**
 * Test whether given input is or can be casted to a string
 *
 * @param {*} input
 * @returns {boolean} stringable
 */
module.exports = (input) => /string|object/.test(type(input));
