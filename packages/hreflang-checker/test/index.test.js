import assert from 'node:assert'
import { validateHreflang, validateIsoCode } from '../index.js';
import { describe, it, test } from 'node:test'

describe('validateIsoCode()', function() {
  it('should return false when values are empty', function() {
      assert.equal(validateIsoCode(), false);
      assert.equal(validateIsoCode(''), false);
  })

  it('should return true when valid language is supplied', function() {
    assert.equal(validateIsoCode('en'), true);
    assert.equal(validateIsoCode('de'), true);
  })

  it('should return false when invalid language is supplied', function() {
    assert.equal(validateIsoCode('zz'), false);
    assert.equal(validateIsoCode('bb'), false);
  })

  it('should return false when format is invalid', function() {
    assert.equal(validateIsoCode('eng'), false);
    assert.equal(validateIsoCode('deu'), false);
    assert.equal(validateIsoCode('en-'), false);
    assert.equal(validateIsoCode('en--'), false);
    assert.equal(validateIsoCode('en--au'), false);
  })

  it('should return true when valid language and country is supplied uppercase', function() {
    assert.equal(validateIsoCode('en-US'), true);
    assert.equal(validateIsoCode('de-DE'), true);
  })

  it('should return true when valid language and country is supplied lowercase', function() {
    assert.equal(validateIsoCode('en-us'), true);
    assert.equal(validateIsoCode('de-de'), true);
  })

  it('should return false when country is invalid', function() {
    assert.equal(validateIsoCode('en-en'), false);
    assert.equal(validateIsoCode('de-zz'), false);
  })
})

// valid links to test against
const links = [
  'https://www.teachstarter.com/'
]

describe('validateHreflang()', function() {
  for (const link of links) {
    test(`${link} should be valid`, async function() {
      console.log(`Checking that the hreflangs for ${link} are valid`)
      assert(await validateHreflang(link), `Checking that the hreflangs for ${link} are valid`)
    })
  }
})