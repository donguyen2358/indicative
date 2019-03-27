'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import * as validations from '../src/validations'
import { RulesConfig } from '../src/Contracts'

const config: RulesConfig = {
  existyStrict: true,
  castValues: true,
}

const root = { original: {} }

test.group('Validations | requiredWithoutAny', () => {
  test('throw exception when conditional field is not defined', async (assert) => {
    const args = []
    const fn = () => validations.requiredWithoutAny.compile!(args)
    assert.throw(fn, 'requiredWithoutAny:make sure to define one or more target fields')
  })

  test('return args as it is when validates successfully', async (assert) => {
    const args = ['username', 'email']
    assert.deepEqual(validations.requiredWithoutAny.compile!(args), args)
  })

  test('work fine when all the targeted fields are present', async (assert) => {
    const data = { username: 'foo', email: 'foo@bar.com' }
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithoutAny.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when targeted fields and actual field are missing', async (assert) => {
    const data = { username: 'foo' }
    const field = 'password'

    const args = ['username', 'email']
    assert.isFalse(validations.requiredWithoutAny.validate(data, field, args, 'literal', root, config))
  })

  test('return false when targeted fields are missing and actual field is null', async (assert) => {
    const data = { username: 'foo', password: null }
    const field = 'password'

    const args = ['username', 'email']
    assert.isFalse(validations.requiredWithoutAny.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when the targeted fields are missing and actual field is valid', async (assert) => {
    const data = { password: 'foobar' }
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithoutAny.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
