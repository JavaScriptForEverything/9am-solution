import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch } from '@/store'
import type { InitialState, SnackbarOption } from '@/types/layout'
import { createSlice } from '@reduxjs/toolkit'


const initialState: InitialState = {
	drawerIsOpen: false,
	isOpenSnackbar: false,
	snackbarOption: {
		severity: 'success',
		variant: 'filled',
		title: '',
		message: '',
		position: 'top-1 right-1',
		action: true,
		showSeverity: true,
		autoClose: false,
		closeTime: 3000,
	}
}

interface SetSnackbar {
	isOpen: boolean, 
	option: SnackbarOption
}

export const { reducer, actions } = createSlice({
  name: 'layout',
  initialState,
  reducers: {
		setDrawerIsOpen: (state, action: PayloadAction<boolean>): InitialState => ({
			...state,
			drawerIsOpen: action.payload,
		}),
		setIsOpenSnackbar: (state, action: PayloadAction<SetSnackbar>): InitialState => ({
			...state,
			isOpenSnackbar: action.payload.isOpen,
			snackbarOption: { ...state.snackbarOption, ...action.payload.option }
		}),

  },
})

export const setIsOpenSnackbar = (isOpen: boolean, option: SnackbarOption) => (dispatch: AppDispatch): void => {
	dispatch(actions.setIsOpenSnackbar({ isOpen, option }))
}

