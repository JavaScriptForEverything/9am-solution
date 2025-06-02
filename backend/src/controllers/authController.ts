import type { Request, Response, NextFunction, RequestHandler } from 'express'
import type { ResponseData } from '@/types/common'
import type { Session } from '@/types/session'
import { appError, catchAsync } from '@/controllers/errorController'
import passport from 'passport'
import * as userDto from '@/dtos/userDtos'
import * as tokenService from '@/services/tokenService'
import User from '@/models/userModel'


// router.get('/api/users' protect, ...)
export const protect:RequestHandler = catchAsync( async (req, res, next) => {
	const id = await tokenService.getUserIdFromAuthToken(req)

	const user = await User.findById(id)
	if(!user) return next(appError('No user Found, authentication failed', 401, 'AuthError'))

	req.session = { 
		...req.session, 
		// authToken,
		user: {
			id: user.id
		}
	}

	next()
})


// POST 	/api/auth/register
export const register: RequestHandler =  catchAsync(async (req, res, next) => {
	const username = req.body.username

	const userFound = await User.findOne({ username })
	if(userFound) return next(appError('This username already registerted'))

	const filteredBody = userDto.filterBodyForCreateUser(req.body)
	const user = await User.create(filteredBody)
	if(!user) return next(appError('user insersation failed'))

	const responseData: ResponseData = {
		status: 'success',
		message: 'you successfully registerted!!!'
	}
	res.status(201).json( responseData )
})






// POST 	/api/auth/login 	: Because POST not send cookie on { sameSite: 'lax' } 
export const login:RequestHandler = catchAsync( async (req, res, next) => {
	const { username, password, isRemembered } = req.body
	if(!username || !password) return next(appError('please pass username and password'))
	
	passport.authenticate('local', async (err: unknown, user: any) => {
		if(err) return next(err)
		if(!user) return next(appError('user not found'))


    if (isRemembered !== undefined && user.isRemembered !== isRemembered) {
			const updatedUser = await User.findByIdAndUpdate(user._id, { isRemembered }, { new: true })
			if(!updatedUser) return next(appError('updateUser with isRemembered is failed'))
      user.isRemembered = updatedUser.isRemembered
    }

		await tokenService.sendTokenInCookie(req, user._id)

		const responseData: ResponseData = {
			status: 'success',
			message: 'login successfully!!!',
			// data: user,
			data: { 
				userId: user._id,
				authToken: req.session?.authToken,
				isRemembered: user.isRemembered
			}
		}
		res.status(200).json( responseData )

	})(req, res, next)
})


// GET 	/api/auth/logout 	: Because POST not send cookie on { sameSite: 'lax' } 
export const logout:RequestHandler = catchAsync( async (req, res, next) => {

	await tokenService.removeTokenFromCookie(req)

	// req.session = null 												// destroy req.session  and auto delete cookie my cookieSession middleware
	const responseData: ResponseData = {
		status: 'success',
		data: 'logout success'
	}
	res.status(200).json( responseData )
})

