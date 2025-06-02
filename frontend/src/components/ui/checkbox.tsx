
type Props = React.ComponentProps<'input'>

export const Checkbox = (props: Props) => {
	return (
		<label className="inline-flex items-center space-x-2 cursor-pointer">
			<input {...props} type="checkbox" className="hidden peer" />

			<div className="size-4 rounded border flex items-center justify-center 
				border-slate-700 
				transition duration-100

				bg-white text-white

				peer-checked:bg-slate-700 
				peer-checked:text-white

				peer-disabled:bg-slate-100 
				peer-disabled:border-slate-400 
				peer-disabled:text-slate-500
			">
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					width="24" 
					height="24" 
					viewBox="0 0 24 24"
				>
					<path 
						fill="currentColor" 
						d="M19.707 7.707L9.305 18.11l-4.882-5.634l1.511-1.31l3.476 4.01l8.883-8.883z"
					/>
				</svg>
			</div>
		</label>
	)
}

