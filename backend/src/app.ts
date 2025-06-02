import path from 'node:path'
import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'

import cookieSession from 'cookie-session'
import passport from 'passport'
import cors from 'cors'
import routes from '@/routes'
import { passportConfig } from '@/controllers/passportConfig'
import * as errorController from '@/controllers/errorController'
import { NODE_ENV, SESSION_SECRET } from '@/config/config'
import { corsOptions } from '@/config/crosConfig'
import { cookieSessionOption } from '@/config/cookieSessionOption'

if(!SESSION_SECRET) throw new Error(`Error: => SESSION_SECRET=${SESSION_SECRET}`)


errorController.exceptionErrorHandler() 							// put it very top

const publicDirectory = path.join(process.cwd(), 'public')





export const app = express()

app.set('trust proxy', 1) 																	// Trust the proxy, which coming via Nginx
// app.set('query parser', 'simple') 												// To prevent default query query [] parser, which block apiFeatures: _filter[color]=blue functionality

app.use(express.static( publicDirectory ))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ limit: '1mb', extended: true }))


// middlewares
if(NODE_ENV !== 'production') app.use(morgan('dev'))  	
app.use(cors(corsOptions))


// Step-1: set session
app.use( cookieSession(cookieSessionOption))

// Step-2: attach session with passport
app.use(passport.initialize())
app.use(passport.session())

// Step-3: passport.use(new LocalStrategy(...))
// Step-4: serializeUser + deserializeUser
passportConfig()

// Step-5: app passport.authenticate('local', {...}) 	on 	`POST /login` route




// Handle all Routes here
app.use(routes)

// handle errors
app.all('*', errorController.routeNotFound)
app.use(errorController.globalErrorHandler)
