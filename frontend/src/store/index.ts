import { configureStore } from '@reduxjs/toolkit'

import { reducer as layoutReducer } from '@/store/layoutReducer'
import { reducer as userReducer } from '@/store/userReducer'

export const store = configureStore({
  reducer: {
		layout: layoutReducer,
		user: userReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
