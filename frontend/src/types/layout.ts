
export type ReplyTo = {
	productId: string
	userId: string
	reviewId: string
}

type SnackbarSeverity = 'success' | 'info' | 'warning' | 'error'
type SnackbarVariant = 'text' | 'outlined' | 'filled'

export interface SnackbarOption {
	severity?: SnackbarSeverity
	variant?: SnackbarVariant
  title?: string
  message?: string
  position?: string 					// e.g., "top-1 right-1"
  action?: boolean
  showSeverity?: boolean
  autoClose?: boolean
  closeTime?: number
}


export type InitialState = {
	drawerIsOpen: boolean

	isOpenSnackbar: boolean
	snackbarOption: SnackbarOption
}