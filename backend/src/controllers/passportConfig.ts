// used in app.js
import passport from 'passport'
import * as localStrategy from 'passport-local'
import bcryptjs from 'bcryptjs'

import User from '@/models/userModel'
import { appError } from '@/controllers/errorController'



export const passportConfig = () => {

	passport.use(new localStrategy.Strategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true 					// now (username, password, done) => (req, username, password, done)
	}, async (req, username, password, done) => {

		try {
			const user = await User.findOne({ username }).select('+password')
			if(!user) return done(appError(`No user found with this ${username}`, 401, 'AuthError') , false )

			const isPasswordVarified = bcryptjs.compareSync( password, user.password )
			if(!isPasswordVarified) return done(appError(`wrong password`, 401, 'AuthError'), false )


			return done(null, user)

		} catch (err: unknown) {
			if(err instanceof Error) return done(appError(err.message, 401, 'AuthError'), false)
			if( typeof err === 'string') return done(appError(err, 401, 'AuthError'), false)
		}
	}))


	passport.serializeUser((user: { id?: unknown }, done) => {
		done(null, user.id)
	})

	passport.deserializeUser( async (userId, done) => {
		try {
			const user = await User.findById(userId)
			if(!user) return done('user not find while deserializeUser' , false)
			// if(!user) return done(null, false, { message: 'user not find while deserializeUser' })

			done(null, user)

		} catch (err) {
			done(err)
		}
	})
}

