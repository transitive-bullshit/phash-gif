# phash-gif

> Perceptual GIF hashing for easily finding near-duplicate GIFs.

[![NPM](https://img.shields.io/npm/v/phash-gif.svg)](https://www.npmjs.com/package/phash-gif) [![Build Status](https://travis-ci.org/transitive-bullshit/phash-gif.svg?branch=master)](https://travis-ci.org/transitive-bullshit/phash-gif) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**Note**: this module is currently experimental and does not produce expected results some of the time.


## Install

- Install a recent version of [imagemagick](http://imagemagick.org) >= `v7` (`brew install imagemagick` on Mac OS).

```bash
npm install --save phash-gif
```


## Usage

```js
const pHashGIF = require('phash-gif')

const hash1 = await pHashGIF.compute('./media/bubbles.gif')
const hash2 = await pHashGIF.compute('./media/bubbles-gifski.gif')

const diff = await pHashGIF.compare(hash1, hash2)
```


## API

### pHashGIF.compute(input)

Returns: `Promise<Array<Number>>`

Computes a perceptual hash of the given GIF.

For animated gifs, the result will be an array of 126 floating point values, corresponding to the three image hashes of the first, middle, and last frames of the input gif.

For static gifs, the result will be an array of 42 floating point values, the same as returned by [phash-im](https://github.com/transitive-bullshit/phash-im).

#### input

Type: `String`
**Required**

Path to a GIF file.

### pHashGIF.compare(hash1, hash2)

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

- [phash-im](https://github.com/transitive-bullshit/phash-im) - Perceptual image hashing provided by imagemagick.
- [pHash](http://www.phash.org/) - A popular open source perceptual hash library.


## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
