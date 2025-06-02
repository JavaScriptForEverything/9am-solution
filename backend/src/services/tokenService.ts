import type { Request } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'
import jwt from 'jsonwebtoken'


// const { JWT_AUTH_TOKEN_SECRET, JWT_EXPIRES_IN } = process.env


const JWT_AUTH_TOKEN_SECRET = process.env.JWT_AUTH_TOKEN_SECRET!;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1y'; // fallback if not set



if(!JWT_AUTH_TOKEN_SECRET || !JWT_EXPIRES_IN) throw new Error(`${JWT_AUTH_TOKEN_SECRET}`)


export const generateTokenForUser = async (id: string, expiresIn='7d'): Promise<string> => {
	// @ts-ignore
	return jwt.sign({ id }, JWT_AUTH_TOKEN_SECRET, { expiresIn })
}
export const verifyUserAuthToken = async (authToken: string): Promise<JwtPayload> => {
	return jwt.verify(authToken, JWT_AUTH_TOKEN_SECRET) as JwtPayload
}

// export const sendTokenInCookie = async (req: Request, userId: string): Promise<void> => {
// 	const expiresIn = req.body.isRemembered ? '7d' : '30m'
// 	const authToken = await generateTokenForUser(userId, expiresIn) 
// 	req.session = { authToken, userId } 		
// }
export const sendTokenInCookie = async (req: Request, userId: string): Promise<void> => {
  const isRemembered = req.body.isRemembered
  const expiresIn = isRemembered ? '7d' : '3m'
  const authToken = await generateTokenForUser(userId, expiresIn)

  req.session = { authToken, userId } 						// set value in cookieSession

  req.sessionOptions.maxAge = isRemembered 				// set value in cookieSession's Option
    ? 7 * 24 * 60 * 60 * 1000  // 7 days
    : 3 * 60 * 1000            // 3 minutes
}


export const removeTokenFromCookie = async (req: Request): Promise<void> => {
	// const authToken = req.session?.authToken
	// if(!authToken) return
	// const { id } = await verifyUserAuthToken(authToken)
	// if(id) req.session = null

	const id = await getUserIdFromAuthToken(req)
	if(id) req.session = null
}


export const getUserIdFromAuthToken = async (req: Request): Promise<string> => {
	const errorMessage = 'you are not authenticated user, plsese login first'

	const authToken = req.session?.authToken || req.headers.authorization?.replace('Bearer ', '')
	if(!authToken) throw new Error(errorMessage)

	const { id } = await verifyUserAuthToken(authToken)
	if(!id) throw Error('payload.id missing error')

	return id
}




