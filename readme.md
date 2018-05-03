# phash-gif

> Perceptual GIF hashing to easily find near-duplicate GIFs.

[![NPM](https://img.shields.io/npm/v/phash-gif.svg)](https://www.npmjs.com/package/phash-gif) [![Build Status](https://travis-ci.org/transitive-bullshit/phash-gif.svg?branch=master)](https://travis-ci.org/transitive-bullshit/phash-gif) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

- Install a recent version of [imagemagick](http://imagemagick.org) >= `v7` (`brew install imagemagick` on Mac OS).

```bash
npm install --save phash-gif
# or
yarn add phash-gif
```


## Usage

```js
const phash = require('phash-gif')

const hash1 = await phash.compute('./media/lena.png')
const hash2 = await phash.compute('./media/barbara.png')

const diff = await phash.compare(hash1, hash2)
```


## API

### phash.compute(input)

Returns: `Promise<Array<Number>>`

Computes the perceptual hash of the given image. Note that the result will be an array of 42 floating point values, corresponding to the 7 image moments comprised of 2 points each across 3 color channels RGB (`7 * 2 * 3 = 42`).

#### input

Type: `String`
**Required**

Path to an image file.

### phash.compare(hash1, hash2)

Returns: `Promise<Number>`

Computes the L2 norm of the two hashes returnd by `phash.compute` (sum of squared differences).

#### hash1

Type: `Array<Number>`
**Required**

Perceptual hash of first image.

#### hash2

Type: `Array<Number>`
**Required**

Perceptual hash of second image.


## Related

- [phash-gifagemagick](https://github.com/scienceai/phash-gifagemagick) - Alternate version of this module which parses imagemagick output instead of using json.
- [pHash](http://www.phash.org/) - A popular open source perceptual hash library.


## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
