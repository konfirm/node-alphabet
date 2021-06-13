# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- charAt with an out of bounds index now returns undefined instead of an empty string
- charCodeAt with an out of bounds index now return undefined instead of NaN

### Added

- Typescript compatibility

### Changed
### Removed

## [2.0.1] - 2020-09-06

### Changed

- Added minimum engine
- Update CI Node.js versions, adding 13 and 14, removing 7
- CI package publication now happens on Node.js 14

## [2.0.0] - 2019-08-26

### Changed

- Alphabet can no longer be used statically, allowing for more flexibility

### Added

- Alphabet singletons can be created using the `Alphabet.from` (static) method

## [1.0.2] - 2019-07-14

### Fixed

- Travis configuration

## [1.0.1] - 2019-07-14

### Security

- Updated dependencies (CVE-2019-10744 on lodash < 4.17.13 subdependency)

### Added

- Travis CI configuration for publication to npm

## [1.0.0] - 2019-06-16

Initial release

[unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/konfirm/node-alphabet/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/konfirm/node-alphabet/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/konfirm/node-alphabet/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/konfirm/node-alphabet/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/konfirm/node-alphabet/releases/tag/v1.0.0
