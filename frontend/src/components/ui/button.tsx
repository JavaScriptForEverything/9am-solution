
type Props = React.ComponentProps<'button'>

export const Button = ({ children, className, ...rest }: Props) => {

	return (
		<button {...rest}
			className={`${className}
			bg-orange-500 
			hover:bg-orange-600 
			active:bg-orange-600/80 
			text-white 
			font-semibold py-2.5 px-4 rounded flex justify-center 
			items-center transition
			cursor-pointer

		disabled:cursor-default
		disabled:bg-slate-300 
		disabled:text-slate-500 
		disabled:border-slate-400/30
			`}
		>
		{children}
		</button>
	)
}
