
type Props =  React.ComponentProps<'svg'> 

export const PortfolioIcon = (props: Props) => (
	<svg {...props} 
		xmlns="http://www.w3.org/2000/svg" 
		width="32" 
		height="32" 
		viewBox="0 0 32 32"
	>
		<path fill="none" 
			stroke="currentColor" 
			strokeLinecap="round" 
			strokeLinejoin="round" 
			strokeWidth="2" 
			d="M29 17v11H3V17M2 8h28v8s-6 4-14 4s-14-4-14-4zm14 14v-4m4-10s0-4-4-4s-4 4-4 4"
		/>
	</svg>
)

