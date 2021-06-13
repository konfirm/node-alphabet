# Alphabet

Immutable alphabet, usable in situations where a fixed set of unique characters is to be allowed and needs to be trusted to remain the exact same.
The implementation provides a lot of functionality already provided by string values, with the added benefit that an Alphabet instance is guaranteed to contains only unique characters, and is validated for it only once.

As of version 3.0 Alphabet supports Unicode alphabets. If Unicode alphabets were used with prior versions, this may have lead to issues with the semantics of the various methods and even the length property.

## Installation

`@konfirm/alphabet` is a scoped package, which means the scope must be provided for both installation and usage.

### Using [npm][1]

```
$ npm install --save @konfirm/alphabet
```

### Using [yarn][2]

```
$ yarn add @konfirm/alphabet
```

## Updating to version 3.0

There are slight differences in how Alphabet works internally, most notable

### No default export

The default export was removed, this means you should now explicitly state you want to import `Alphabet` from the package

```js
// const Alphabet = require('@konfirm/alphabet');
const { Alphabet } = require('@konfirm/alphabet');
```

### Unicode support

If Alphabet was used with multi-byte unicode characters (e.g. emoji), chances are you ran into various issues varying from duplicate characters errors to strange behavior regarding `indexOf` and `charAt`.
If you have any workarounds in place for this, you should be able to removed those.


## Usage

An Alphabet instance is guaranteed to have a unique set of characters, with a minimum of one character.

### Creating an Alphabet instance

Create a new Alphabet instance using the characters you need. If you don't explicitly need multiple Alphabet instances handling the same characters (and their order), consider using the `Alphabet.from` method.

### CommonJS (JavaScript)

```js
const { Alphabet } = require('@konfirm/alphabet');

const hex = new Alphabet('abcdef0123456789');
```

### ES Module (JavaScript)

```js
import { Alphabet } from '@konfirm/alphabet';

const hex = new Alphabet('abcdef0123456789');
```

### TypeScript

```ts
import { Alphabet } from '@konfirm/alphabet';

const hex: Alphabet = new Alphabet('abcdef0123456789');
```

### `Alphabet.from({string|object} input)`

In order to be more memory efficient and open the possibility to directly compare instances, the static `from` method can be used to ensure a previously created instance is re-used if it's available.

### CommonJS (JavaScript)

```js
const { Alphabet } = require('@konfirm/alphabet');

const singleton = Alphabet.from('abc');
const proof = Alphabet.from('abc');

console.log(singleton === proof); //  true

const instance = new Alphabet('abc');

console.log(singleton === instance); //  false
```

### ES Module (JavaScript)

```js
import { Alphabet } from '@konfirm/alphabet';

const singleton = Alphabet.from('abc');
const proof = Alphabet.from('abc');

console.log(singleton === proof); //  true

const instance = new Alphabet('abc');

console.log(singleton === instance); //  false
```

### TypeScript

```ts
import { Alphabet } from '@konfirm/alphabet';

const singleton: Alphabet = Alphabet.from('abc');
const proof: Alphabet = Alphabet.from('abc');

console.log(singleton === proof); //  true

const instance: Alphabet = new Alphabet('abc');

console.log(singleton === instance); //  false
```

### Instance API

| name                     | purpose                                                                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `characters`             | The characters provided to the Alphabet during construction                                                                                                                   |
| `length`                 | The number of characters                                                                                                                                                      |
| `byteLength`             | The number of bytes (unicode characters may be more than a single byte)                                                                                                       |
| `Alphabet(characters)`   | Create a new Alphabet instance, if no characters are provided at all, the default (all characters `a-zA-Z0-9`) is used                                                        |
| `charAt(index)`          | The character at the specified index (`undefined` if the index is below `0` or above `length`)                                                                                |
| `charCodeAt(index)`      | The character code at the specified index (`undefined` if the index is below `0` or above `length`)                                                                           |
| `codePointAt(index)`     | The code point at the specified index (`undefined` if the index is below `0` or above `length`)                                                                               |
| `map(...index)`          | Maps the provided indices to their characters, the indices will be wrapped to be within the Alphabet                                                                          |
| `indexOf(char)`          | Find the index of the provided character, `-1` if not found                                                                                                                   |
| `slice([start [, end]])` | Create a new alphabet (singleton) based on a [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) of the current alphabet |

### Possible errors

An Alphabet requires its characters to be provided either as string or as object (with toString implemented), with a minimum length of one character. Furthermore all characters must be unique.

| input  | error                   | reason                                                 |
| ------ | ----------------------- | ------------------------------------------------------ |
| `''`   | InvalidInputError       | The input does not contain any characters              |
| `123`  | InvalidInputError       | The input is not a string                              |
| `null` | InvalidInputError       | The input is not an stringifiable object               |
| `{}`   | DuplicateCharacterError | The string representation of `{}` is `[Object object]` |
| `[]`   | InvalidInputError       | The input is an array                                  |

The intended use to subclass the `Alphabet` and overriding the `CHARACTERS` getter method to indicate the supported character set.

The subclass (or `Alphabet` itself of course) can then be used in situations where the characters and their order matter and need a bit more testability than plain strings.

## License

MIT License Copyright (c) 2019-2021 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: https://www.npmjs.com/get-npm
[2]: https://yarnpkg.com/
