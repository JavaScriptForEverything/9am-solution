import { useParams } from 'react-router-dom'

export const EditSetting = () => {

	const { slug } = useParams()
	console.log({ slug })

	return (
		<>
			<h2>Setting Update Form : {slug}</h2>
		</>
	)
}
