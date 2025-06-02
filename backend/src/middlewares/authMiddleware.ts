import type { RestrictTo } from '@/types/common'
import type { Session } from '@/types/session'
import { appError, catchAsync } from '@/controllers/errorController'




export const restrictTo: RestrictTo = (...roles: string[]) => (req, _res, next) => {
	const session = req.session as Session
	const user = session.user

	next()
}