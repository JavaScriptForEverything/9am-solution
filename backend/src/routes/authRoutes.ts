import { Router } from 'express'
import * as authController from '@/controllers/authController'

// => /api/auth/
export const router = Router()

router
	.post('/register', authController.register)
	.post('/login', authController.login)
	.post('/logout', authController.logout)



