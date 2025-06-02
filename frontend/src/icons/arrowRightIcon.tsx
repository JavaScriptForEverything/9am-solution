
type Props =  React.ComponentProps<'svg'> 

export const ArrowRightIcon = (props: Props) => (
	<svg {...props} 
		xmlns="http://www.w3.org/2000/svg" 
		width="24" 
		height="24" 
		viewBox="0 0 24 24"
	>
		<path 
			fill="currentColor" 
			fillRule="evenodd" 
			d="M18.5 12.214a1 1 0 0 0-1-1H5a1 1 0 1 0 0 2h12.5a1 1 0 0 0 1-1" 
			clipRule="evenodd"
		/>
		<path 
			fill="currentColor" 
			fillRule="evenodd" 
			d="M20 12.214a1 1 0 0 0-.293-.707l-4.5-4.5a1 1 0 1 0-1.414 1.414l3.793 3.793l-3.793 3.793a1 1 0 0 0 1.414 1.415l4.5-4.5a1 1 0 0 0 .293-.708" 
			clipRule="evenodd"
		/>
	</svg>
)

