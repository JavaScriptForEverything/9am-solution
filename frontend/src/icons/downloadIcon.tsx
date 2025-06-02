
type Props = {
	className?: React.ComponentProps<'svg'>['className']
	fontSize?: React.ComponentProps<'svg'>['fontSize']
}
export const DownloadIcon = ({ className, fontSize }: Props) => {

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
				d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"
			/>
		</svg>
	)
}
