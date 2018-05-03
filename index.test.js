'use strict'

const { test } = require('ava')
const path = require('path')

const pHashGIF = require('.')

const fixturesPath = path.join(__dirname, `media`)

const EPSILON = 0.06

const fixtures = [
  'bubbles',
  'ippo',
  'kitten'
]

fixtures.forEach((fixture) => {
  const input = path.join(fixturesPath, fixture + '.gif')
  const input200 = path.join(fixturesPath, fixture + '-200.gif')
  const inputGifski = path.join(fixturesPath, fixture + '-gifski.gif')

  test(`${fixture} compute`, async (t) => {
    const hash = await pHashGIF.compute(input)
    t.truthy(Array.isArray(hash))
    t.is(hash.length, 42 * 3)

    hash.forEach((item) => {
      t.is(typeof item, 'number')
    })
  })

  test(`${fixture} => downsize`, async (t) => {
    const hash1 = await pHashGIF.compute(input)
    const hash2 = await pHashGIF.compute(input200)

    const value = await pHashGIF.compare(hash1, hash2)
    t.truthy(value < EPSILON)
  })

  test(`${fixture} => gifski`, async (t) => {
    const hash1 = await pHashGIF.compute(input)
    const hash2 = await pHashGIF.compute(inputGifski)

    const value = await pHashGIF.compare(hash1, hash2)
    t.truthy(value < EPSILON)
  })

  test(`${fixture} => downsize => gifski`, async (t) => {
    const hash1 = await pHashGIF.compute(input200)
    const hash2 = await pHashGIF.compute(inputGifski)

    const value = await pHashGIF.compare(hash1, hash2)
    t.truthy(value < EPSILON)
  })
})

for (let i = 0; i < fixtures.length; ++i) {
  const fixtureI = fixtures[i]
  const inputI = path.join(fixturesPath, fixtureI + '.gif')

  for (let j = i + 1; j < fixtures.length; ++j) {
    const fixtureJ = fixtures[j]
    const inputJ = path.join(fixturesPath, fixtureJ + '.gif')

    test(`${fixtureI} != ${fixtureJ}`, async (t) => {
      const hash1 = await pHashGIF.compute(inputI)
      const hash2 = await pHashGIF.compute(inputJ)

      const value = await pHashGIF.compare(hash1, hash2)
      t.truthy(value > 0.15)
    })
  }
}
