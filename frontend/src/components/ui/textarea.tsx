
type Props = React.ComponentProps<'textarea'>

// copy-paste the Input and change : input => textarea 	that's it
export const Textarea = ({ className, ...rest }: Props) => {

	return (
		<textarea {...rest}
			className={`${className}
				w-full px-4 py-2
				border border-slate-300 
				rounded-lg focus:outline-none focus:border-slate-400
			`}
		/>
	)
}

