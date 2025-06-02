// src/pages/Dashboard/Users.tsx

import { Input } from '@/components/ui'
import { useState } from 'react'

const Users = () => {

	const [ input, setInput ] = useState('')
	const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setInput(evt.target.value)
	}
		console.log({ input })







	return (
		<>
		
  		<div>Users Management</div>

			<div className='p-4'>
				<Input className='rounded-sm' type='file' value={input} onChange={onChange} />
			</div>



		</>
	)
}
export default Users

