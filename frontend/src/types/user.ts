import type { ResponseStatus } from '@/types/common'

interface CommonFields {
	username: string
	password: string
	shopnames: string[]

	isRemembered?: boolean
}


export interface UserDocument extends CommonFields {
	id: string
	createdAt: string
	updatedAt: string
}


export type RegisterFormData = {
  username: string
  password: string
  shopnames: string[]
}
export type LoginFormData = {
  username: string
	password: string
	isRemembered: boolean
}

export type InitialState = {
	loading: boolean
	error: string
	message: string
	user: null | UserDocument
	users: UserDocument[]

	isAuthenticated: boolean
	isRemembered: boolean

	status: ResponseStatus
	authToken: string | null
	userId: string | null


	total: number
	count: number
  limit: number
  totalPages: number

	// fields: Partial<FormFields>
}


export type SetUsersPayload = { 
	users: UserDocument[], 
	total: number, 
	count: number
}






