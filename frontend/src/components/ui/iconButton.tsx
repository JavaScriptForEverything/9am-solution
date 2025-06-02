
export type Color = 'default' | 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success'
export type	Size = 'small' | 'medium' | 'large'

type Props = React.ComponentProps<'button'> & {
	children: React.ReactNode; // Icon as children
	color?: Color
	size?: Size
	ariaLabel?: string
}

export const IconButton = (props: Props) => {

	const {
    children,
    color = 'default',
    size = 'medium',
    ariaLabel='',
    className = '',
    disabled = false,
    onClick,
    ...rest
	} = props

  const baseStyles = 'cursor-pointer rounded-full flex items-center justify-center focus:outline-none transition duration-150 ease-in-out'
	const disabledStyles = 'disabled:bg-slate-300 disabled:text-slate-500 disabled:border-slate-400/30'
    
	const sizeStyles = {
		small: 'h-8 w-8 p-1 text-sm',
		medium: 'h-10 w-10 p-2',
		large: 'h-12 w-12 p-2 text-lg',
	}

	const colorStyles = {
		default: 'bg-gray-200 text-gray-600 hover:bg-gray-300 active:bg-gray-400',
		primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
		secondary: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
		info: 'bg-blue-300 text-white hover:bg-blue-400 active:bg-blue-500',
		warning: 'bg-yellow-400 text-white hover:bg-yellow-500 active:bg-yellow-600',
		error: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
		success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
	}

	return (
		<button
			onClick={onClick}
			aria-label={ariaLabel}
			className={`${baseStyles} ${sizeStyles[size]} ${colorStyles[color]} ${className} ${disabled ? disabledStyles : ''}`}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	)
}

