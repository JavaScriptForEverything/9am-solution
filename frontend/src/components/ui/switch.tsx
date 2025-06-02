
interface Props {
	checked: boolean,
	onChange: (checked: boolean) => void
}
export const Switch = ({ checked, onChange }: Props) => {

	// return (
	// 	<label htmlFor="hs-basic-usage" className="relative inline-block w-11 h-6 cursor-pointer">
	// 		<input type="checkbox" id="hs-basic-usage" className="peer sr-only" 

	// 			checked={checked}
	// 			onChange={(evt) => onChange(evt.target.checked)}
	// 		/>
	// 		<span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 dark:bg-neutral-700 dark:peer-checked:bg-blue-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
	// 		<span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white"></span>
	// 	</label>
	// )

	return (
		<label
			htmlFor="AcceptConditions"
			className="relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-orange-500"
		>
			<input 
				type="checkbox" 
				id="AcceptConditions" 
				className="peer sr-only" 
				checked={checked}
				onChange={(evt) => onChange(evt.target.checked)}
			/>

			<span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6"
			></span>
		</label>
	)
}
