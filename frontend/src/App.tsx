import { useEffect } from 'react'
// import { ORIGIN } from './config/config'
import { ORIGIN } from '@/config/config'

const App = () => {



	useEffect(() => {
		fetch(`${ORIGIN}/api/users`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then((data) => {
				console.log('Data:', data)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	}, [])

	return (
		<>
			<h2 className='text-red-500'>React App</h2>
		</>
	)
}
export default App
