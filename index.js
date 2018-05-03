'use strict'

const extractFrames = require('gif-extract-frames')
const pHash = require('phash-im')
const path = require('path')
const rmfr = require('rmfr')
const tempy = require('tempy')

exports.compute = async (input) => {
  const directory = tempy.directory()
  const filename = '%d.png'
  const output = path.join(directory, filename)

  const results = await extractFrames({
    input,
    output
  })

  const isAnimated = (results.shape.length === 4)
  let result

  if (isAnimated) {
    const frames = results.shape[0]
    const firstFrame = 0
    const middleFrame = (frames / 2) | 0
    const lastFrame = Math.max(frames - 1, 0)

    const hashes = await Promise.all([
      pHash.compute(path.join(directory, filename.replace('%d', firstFrame))),
      pHash.compute(path.join(directory, filename.replace('%d', middleFrame))),
      pHash.compute(path.join(directory, filename.replace('%d', lastFrame)))
    ])

    result = hashes[0].concat(hashes[1]).concat(hashes[2])
  } else {
    result = await pHash.compute(path.join(directory, filename.replace('%d', 0)))
  }

  await rmfr(directory)
  return result
}

exports.compare = async (hash1, hash2) => {
  if (hash1.length !== hash2.length) {
    throw new Error('unable to compare incompatible hashes')
  }

  return pHash.compare(hash1, hash2)
}
