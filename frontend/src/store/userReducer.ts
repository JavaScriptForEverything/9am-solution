import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '@/store'
import type { InitialState, LoginFormData, RegisterFormData, SetUsersPayload } from '@/types/user'
import type { UserDocument } from '@/types/user'
import { createSlice } from '@reduxjs/toolkit'
import { catchAsyncDispatch } from '@/lib/utils'
import { ORIGIN } from '@/lib/config'


const storedAuth = localStorage.getItem('authDataString');
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

const initialState: InitialState = {
	loading: false,
	error: '',
	message: '',
	user: null,
	status: 'none',
	users: [],
	userId: parsedAuth?.userId || '',
	isAuthenticated: parsedAuth?.isAuthenticated || false,
	isRemembered: parsedAuth?.isRemembered || false,
	authToken: parsedAuth?.authToken || '',
	total: 0,
	count: 0,
	limit: 10,
	totalPages: 0,
}

// const initialState: InitialState = {
// 	loading: false,
// 	error: '',
// 	message: '',
// 	user: null ,
// 	status: 'none',
// 	users: [],
// 	userId: '',
// 	// isAuthenticated: !!localStorage.getItem('authToken'),
// 	// authToken: localStorage.getItem('authToken') || '',
// 	isAuthenticated: false,
// 	isRemembered: false,
// 	authToken: '',

// 	total: 0,
// 	count: 0,
//   limit: 10, 			// Default page size
//   totalPages: 0, 	
// }

type AuthenticatePayload = {
	isAuthenticated: boolean
	isRemembered: boolean
	authToken: string | null
	userId?: string | null
}

export const { reducer, actions } = createSlice({
  name: 'user',
  initialState,
  reducers: {
		request: (state: InitialState): InitialState => ({
			...state,
			loading: true,
			error: '',
			message: '',
			status: 'none',
		}),
		failed: (state: InitialState, action: PayloadAction<string>): InitialState => ({
			...state,
			loading: false,
			message: '',
			status: 'none',
			error: action.payload
		}),
		clearError: (state: InitialState): InitialState => ({
			...state,
			loading: false,
			message: '',
			status: 'none',
			error: '',
		}),
		setLimit: (state: InitialState, action: PayloadAction<number>): InitialState => ({
			...state,
			loading: false,
			message: '',
			status: 'none',
			error: '',
			limit: action.payload
		}),


    setRegisterUser: (state: InitialState, action: PayloadAction<string>): InitialState => ({
      ...state,
			loading: false,
			error: '',
			status: 'created',
			message: action.payload
    }),

    setLoginUser: (state: InitialState, action: PayloadAction<string>): InitialState => ({
      ...state,
			loading: false,
			error: '',
			status: 'created',
			message: action.payload
    }),
    authenticate: (state: InitialState, action: PayloadAction<AuthenticatePayload >): InitialState => ({
      ...state,
			loading: false,
			error: '',
			message: '',
			status: 'created',
			...action.payload
    }),

    setUsers: (state: InitialState, action: PayloadAction<SetUsersPayload>): InitialState => ({
      ...state,
			loading: false,
			error: '',
			message: '',

			// users: [ ...action.payload.users ],
			users: [ ...action.payload.users.filter( user => user.id !== state.user?.id) ], 		// filter logedInUser
			total: action.payload.total,
			count: action.payload.count,
			totalPages: Math.ceil(action.payload.total / (state.limit || 10)) 
    }),
	
    addUser: (state: InitialState, action: PayloadAction<UserDocument>): InitialState => ({
      ...state,
			loading: false,
			error: '',
			message: '',
			status: 'created',
			users: [ ...state.users, action.payload ]
    }),
    setUser: (state: InitialState, action: PayloadAction<UserDocument>): InitialState => ({
      ...state,
			loading: false,
			error: '',
			message: '',
			user: action.payload
    }),
    removeUser: (state: InitialState, action: PayloadAction<string>): InitialState => ({
      ...state,
			loading: false,
			error: '',
			message: '',

			status: 'deleted',
			users: state.users.filter(user => user.id !== action.payload)
    }),
    removeUsers: (state: InitialState, action: PayloadAction<{ userIds: string[], message: string }>): InitialState => ({
      ...state,
			loading: false,
			error: '',
			message: action.payload.message,

			status: 'deleted',
			users: state.users.filter(user => !action.payload.userIds.includes(user.id))
    }),
    logout: (state: InitialState ): InitialState => ({
      ...state,
			loading: false,
			error: '',
			message: '',
			user: null,
			isAuthenticated: false,
			userId: null
    }),
  },
})

export const clearError = () => (dispatch: AppDispatch): void => {
	dispatch(actions.clearError())
}


export const registerUser = (fields: RegisterFormData) => catchAsyncDispatch( async (dispatch: AppDispatch): Promise<void> => {
	dispatch(actions.request())

	const res = await fetch(`${ORIGIN}/api/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(fields),
		credentials: 'include'
	})

	const { status, message } = await res.json()
	if(status !=='success') dispatch(actions.failed(message))
	else dispatch(actions.setRegisterUser(message))
}, actions.failed)



export const loginUser = (fields: LoginFormData) => catchAsyncDispatch( async (dispatch: AppDispatch): Promise<void> => {
	dispatch(actions.request())

	const res = await fetch(`${ORIGIN}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(fields),
		credentials: 'include'
	})

	const { status, message, data } = await res.json()
	if(status !== 'success') dispatch(actions.failed(message))
	else {

		const responseData: AuthenticatePayload = {
			userId: data.userId,
			authToken: data.authToken,
			isRemembered: data.isRemembered,
			isAuthenticated: true
		} 
		dispatch(actions.authenticate(responseData))

		const authDataString = JSON.stringify(responseData) 
		localStorage.setItem('authDataString', authDataString)
	}

}, actions.failed)


export const logoutHandler = () => catchAsyncDispatch( async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	dispatch(actions.request())

	const res = await fetch(`${ORIGIN}/api/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getState().user.authToken}`
		},
		credentials: 'include'
	})

	await res.json()
	dispatch(actions.logout())
	localStorage.removeItem('authDataString')

}, actions.failed)



// export const getUserById = () => catchAsyncDispatch( async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
// 	dispatch(actions.request())

// 	const res = await fetch(`${ORIGIN}/api/users/me`, {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'Authorization': `Bearer ${getState().user.authToken}`
// 		},
// 		credentials: 'include'
// 	})

// 	const { status, message, data: user } = await res.json()
// 	if(status !=='success') throw dispatch(actions.failed(message))

// 	// dispatch(actions.setUser(user))
// 	if(user.role === 'admin') dispatch(actions.setUser(user))
// 	else dispatch(actions.logout())


// }, actions.failed)

export const getLogedInUser = () => catchAsyncDispatch( async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	dispatch(actions.request())

	const res = await fetch(`${ORIGIN}/api/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getState().user.authToken}`
		},
		credentials: 'include'
	})

	const { status, message, data: user } = await res.json()
	if(status !=='success') dispatch(actions.failed(message))
	else dispatch(actions.setUser(user))


}, actions.failed)

export const getAllUsers = () => catchAsyncDispatch( async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	dispatch(actions.request())

	const limit = getState().user.limit

	const res = await fetch(`${ORIGIN}/api/users?_sort=role&_limit=${limit}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getState().user.authToken}`
		},
		credentials: 'include'
	})

	const { status, message, data, count, total } = await res.json()
	if(status !=='success') throw dispatch(actions.failed(message))

	dispatch(actions.setUsers({ users: data, count, total }))
}, actions.failed)



export const createUserBy = (fields: any) => catchAsyncDispatch( async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	dispatch(actions.request())

	const res = await fetch(`${ORIGIN}/api/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getState().user.authToken}`
		},
		body: JSON.stringify(fields),
		credentials: 'include'
	})

	const { status, message, data: user } = await res.json()
	if(status !== 'success') dispatch(actions.failed(message))
	else dispatch(actions.addUser(user))
}, actions.failed)



export const deleteUserById = (userId: string) => catchAsyncDispatch( async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	dispatch(actions.request())

	const res = await fetch(`${ORIGIN}/api/users/${userId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getState().user.authToken}`
		},
		credentials: 'include'
	})

	const { status, message } = await res.json()
	if(status !=='success') throw dispatch(actions.failed(message))

	dispatch(actions.removeUser(userId))
}, actions.failed)


