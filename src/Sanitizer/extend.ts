/**
 * @module indicative
 */

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { sanitizations } from 'indicative-rules'
import { SanitizationDefination } from 'indicative-compiler'

/**
 * Extend validator by adding new rules
 */
export function extend (name: string, definition: SanitizationDefination) {
  sanitizations[name] = definition
}
