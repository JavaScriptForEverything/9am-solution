import { Router } from 'express'

import { router as fileRouter } from '@/routes/fileRoutes' 
import { router as userRouter } from '@/routes/userRoutes' 
import { router as authRouter } from '@/routes/authRoutes' 



// => / 	(root)
const router = Router()

router.use('/upload', fileRouter)
router.use('/api/users', userRouter)
router.use('/api/auth', authRouter)


export default router
