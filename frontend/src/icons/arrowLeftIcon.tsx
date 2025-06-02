
type Props =  React.ComponentProps<'svg'> 

export const ArrowLeftIcon = (props: Props) => (
	<svg {...props}
		xmlns="http://www.w3.org/2000/svg" 
		width="1em" 
		height="1em"
		viewBox="0 0 24 24"
	>
		<path 
			fill="none" 
			stroke="currentColor" 
			strokeLinecap="round" 
			strokeLinejoin="round" 
			strokeWidth="2" 
			d="m14 7l-5 5m0 0l5 5"
		/>
	</svg>
)

