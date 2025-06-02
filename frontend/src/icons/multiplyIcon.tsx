
type Props = {
	className?: React.ComponentProps<'svg'>['className']
	fontSize?: React.ComponentProps<'svg'>['fontSize']
}
export const MultiplyIcon = ({ className, fontSize }: Props) => {

	return (
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			width="1em" 
			height="1em" 
			viewBox="0 0 24 24"
			className={className}
			fontSize={fontSize}
		>
			<path 
				fill="currentColor" 
				d="M7 18a1 1 0 0 1-.707-1.707l10-10a1 1 0 0 1 1.414 1.414l-10 10A1 1 0 0 1 7 18"
			/>
			<path 
				fill="currentColor" 
				d="M17 18a1 1 0 0 1-.707-.293l-10-10a1 1 0 0 1 1.414-1.414l10 10A1 1 0 0 1 17 18"
			/>
		</svg>
	)
}
