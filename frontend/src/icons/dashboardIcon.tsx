
type Props = React.ComponentProps<'svg'>
export const DashboardIcon = (props: Props) => (
	<svg {...props}
		xmlns="http://www.w3.org/2000/svg" 
		width="1em" 
		height="1em" 
		viewBox="0 0 24 24"
	>
		<path 
			fill="currentColor" 
			d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"
		/>
	</svg>
)
