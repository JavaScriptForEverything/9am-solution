import { useParams } from 'react-router-dom'

export const ViewSetting = () => {

	const { slug } = useParams()
	console.log({ slug })

	return (
		<>
			<h2>View Setting details: { slug } </h2>
		</>
	)
}
