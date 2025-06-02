import type { Document, Model, Types } from 'mongoose'

interface CommonFields {
	username: string
	password: string
	shopnames: string[]

}

export interface CreateUser extends CommonFields {
	confirmPassword?: string
}

export interface UserDocument extends Document, CommonFields {
	_id: Types.ObjectId
	updatedAt: Date 			// required to update this

	confirmPassword?: string
	isRemembered?: boolean

	passwordResetToken?: string
	emailResetToken: string | undefined
	emailResetTokenExpires: Date | undefined

	comparePassword: (password: string) => Promise<boolean>
}

export interface UpdateUser extends CommonFields {}

export interface UserModel extends Model<UserDocument> {
}


