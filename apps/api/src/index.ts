import { ability } from '@sass/auth'

const a = ability.can('invite', 'User')
const b = ability.can('delete', 'User')

console.log('hello world', a)
console.log('hello world', b)
