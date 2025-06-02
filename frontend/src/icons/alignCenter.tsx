type Props = React.ComponentProps<'svg'>

export const AlignCenterIcon = (props: Props) => (
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
			strokeMiterlimit="10" 
			strokeWidth="1.5" 
			d="M6 10h12M3 6h18M3 14h18M6 18h12"
		/>
	</svg>
)
