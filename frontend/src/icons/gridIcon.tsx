
type Props = {
	className?: React.ComponentProps<'svg'>['className']
	fontSize?: React.ComponentProps<'svg'>['fontSize']
}
export const Gridicon = ({ className, fontSize }: Props) => {

	return (
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			width="1em" 
			height="1em" 
			viewBox="0 0 20 20"
			className={className}
			fontSize={fontSize}
		>
			<path 
				fill="currentColor" 
				fillRule="evenodd" 
				d="M4.5 4.5v4h4v-4zm-.5-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zm7.5 1v4h4v-4zm-.5-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zm-6.5 8v4h4v-4zm-.5-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm7.5 1v4h4v-4zm-.5-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z" clip-rule="evenodd"
		/></svg>
	)
}
