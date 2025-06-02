import type { CreateUser, UpdateUser, UserDocument } from '@/types/user'
import { filterObjectByArray } from '@/lib/utils'



const commonAllowedFields = [
	"username",
	"password",
	"confirmPassword",
	"shopnames",

	"isRemembered",
]

// POST 	/api/users
export const filterBodyForCreateUserByAdmin = (body: CreateUser) => {
	const allowedFields = [
		...commonAllowedFields
	]

	return filterObjectByArray(body, allowedFields)
}



// POST 	/api/auth/register
export const filterBodyForCreateUser = (body: CreateUser) => {
	const allowedFields = [
		...commonAllowedFields,

	]

	return filterObjectByArray(body, allowedFields)
}

// user => user._doc
export const filterUserDocument = (user: UserDocument) => {
	const allowedFields = [
		...commonAllowedFields,

		'id',
		'_id',
		'createdAt',
		'updatedAt',
	]
	return filterObjectByArray(user, allowedFields)
}


// PATCH 	/api/users/:userId
// PATCH 	/api/users/me
export const filterBodyForUpdate = (body: UpdateUser) => {
	const allowedFields = [
		...commonAllowedFields,
	]
	return filterObjectByArray(body, allowedFields)
}



