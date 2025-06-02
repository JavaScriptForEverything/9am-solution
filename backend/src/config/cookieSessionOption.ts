import 'dotenv/config'
import { NODE_ENV, SESSION_SECRET } from '@/config/config'

if(!SESSION_SECRET) throw new Error(`Error: => SESSION_SECRET=${SESSION_SECRET}`)

export const cookieSessionOption = {
	name: 'session',
	keys: [ SESSION_SECRET ], 

	signed: false, 																							// no need to encrypt, jwt is already encrypted
	secure: NODE_ENV === 'production', 					
  sameSite: NODE_ENV === 'production' ? 'none' as const : 'lax' as const, 	// To send cookie with `sameSite='none'` secure must be true `secure: true`
	// maxAge: 365 * 24 * 60 * 60 * 1000, 													// 1 year, and manage expiresIn via jwt only
}