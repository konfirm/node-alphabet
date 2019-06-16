# Alphabet

Immutable alphabet, usable in situation where a fixed set of characters is to be allowed and needs to be trusted to remain the exact same.

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

## Usage

The intended use to subclass the `Alphabet` and overriding the `CHARACTERS` getter method to indicate the supported character set.

The subclass (or `Alphabet` itself of course) can then be used in situations where the characters and their order matter and need a bit more testability than plain strings.

### Properties

| name         | value                                                            | description                              |
| ------------ | ---------------------------------------------------------------- | ---------------------------------------- |
| `CHARACTERS` | `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789` | The characters the alphabet consists of  |
| `length`     | `62`                                                             | The number of characters in the alphabet |

### Methods

| method                | argument          | example                  | description                                                                                             |
| --------------------- | ----------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `Alphabet.charAt`     | `number` index    | `Alphabet.charAt(7)`     | Obtain the character at the specified index (if index exceeds `length`, `undefined` is returned)        |
| `Alphabet.charCodeAt` | `number` index    | `Alphabet.charCodeAt(7)` | Obtain the character code at the specified index (if `index` exceeds `length`, `undefined` is returned) |
| `Alphabet.indexOf`    | `string` char     | `Alphabet.indexOf()`     | Obtain the index at which `char` was found, `-1` if `char` is not among `CHARACTERS`                    |
| `Alphabet.map`        | `...number` index | `Alphabet.map(0, 2, 4)`  | Map the provided arguments into an array of `char`                                                      |

## License

MIT License Copyright (c) 2019 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: https://www.npmjs.com/get-npm
[2]: https://yarnpkg.com/
