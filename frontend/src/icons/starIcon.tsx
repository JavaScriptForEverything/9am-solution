
type Props =  React.ComponentProps<'svg'>
export const StarIcon = (props: Props) => {

	return (
		<svg {...props}
			xmlns="http://www.w3.org/2000/svg"
			fill='currentColor' 
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				fillRule="evenodd"
				d="M12 17.75l6.547 3.374-1.25-7.25 5.25-5.125-7.25-.5-3-6-3 6-7.25.5 5.25 5.125-1.25 7.25L12 17.75z"
				clipRule="evenodd"
			/>
		</svg>
	)

}
