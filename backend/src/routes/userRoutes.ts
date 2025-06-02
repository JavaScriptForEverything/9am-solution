import { Router } from 'express'
import * as userController from '@/controllers/userController'
import * as authController from '@/controllers/authController'


// => /api/users/
export const router = Router()

router.get('/me', authController.protect, userController.addUserId, userController.getUserById)
router.patch('/me', authController.protect, userController.addUserId, userController.updateUserById)
router.delete('/me', authController.protect, userController.addUserId, userController.deleteUserById)



router.route('/')
	.get(
		authController.protect,
		userController.getAllUsers
	)

router.route('/:userId')
	.get(userController.getUserById)
	.patch(
		userController.updateUserById
	)
	.delete(userController.deleteUserById)
