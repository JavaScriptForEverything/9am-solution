
type Props = React.ComponentProps<'input'>

export const Input = ({ className, ...rest }: Props) => {

	return (
		<input {...rest}
			className={`${className}
				w-full px-4 py-2
				border border-slate-300 
				rounded-lg focus:outline-none focus:border-slate-400
			`}
		/>
	)
}

