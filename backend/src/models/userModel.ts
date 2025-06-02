import type { UserDocument, UserModel } from '@/types/user'
import { Collection } from '@/types/constants'
import { model, Schema } from 'mongoose'
import bcryptjs from 'bcryptjs'
import { sanitizeSchema } from '@/services/sanitizeService'
import { customTransform } from '@/lib/utils'

// {
//   "username": "riajul",
//   "password": "{{pass}}",
//   "shopnames": ["one", "two", "three", "four"]
// }




const userSchema = new Schema<UserDocument>({

	username: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
		minlength: 3,
		maxlength: 50,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false, 									// no need this any more because we hide in toJSON 
    validate: {
      validator: function(v) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(v)
      },
      message: 'Password must be at least 8 characters with one number and one special character'
      // message: props => 'Password must be at least 8 characters with one number and one special character'
		}
	},
	confirmPassword: {
		type: String,
		// required: true,
		validate: function(this: UserDocument, confirmPassword: string, ) {
			return this.password === confirmPassword
		},
	},

	shopnames: [{
    type: String,
		unique: true,
		trim: true,
		lowercase: true,
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 3 && v.length <= 100;
      },
      message: props => 'You must provide 3 or 4 shop names'
    }
  }],

	isRemembered: {
		type: Boolean,
		default: false
	},

	passwordResetToken: String,
	emailResetToken: String,
	emailResetTokenExpires: Date
}, {
	timestamps: true,
	toJSON: {
		virtuals: true,
		transform(_doc, ret, _options) {
			delete ret.password  					// hide password, so no need extra code other palaces
			delete ret.confirmPassword  	// hide confirmPassword, so no need extra code other palaces

			const imageFields = ['avatar', 'coverPhoto']
			customTransform(ret, imageFields )
		},
	}
})

userSchema.plugin(sanitizeSchema)

userSchema.pre('save', async function(next) {
	if( !this.isModified('password') ) return next()

	this.password = await bcryptjs.hash(this.password, 12)
	this.confirmPassword = undefined
	next()
})

userSchema.methods.comparePassword = async function(this: UserDocument, password: string ) {
	return await bcryptjs.compare(password, this.password)
}


export const User = model<UserDocument, UserModel>(Collection.User, userSchema)
export default User



