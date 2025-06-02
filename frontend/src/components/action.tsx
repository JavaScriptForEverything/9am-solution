import type { ListObject } from '@/types/common'

import { useState } from 'react'
import { IconButton, Modal } from '@/components/ui'

import { useNavigate } from 'react-router-dom'




interface Props extends React.ComponentProps<'div'> {
	id: string
	actionItems: ListObject[]
	onDelete?: (id: string) => void
}

export const Action = ({ id, actionItems, onDelete }: Props) => {
	const [ openModal, setOpenModal ] = useState(false)
	const navigate = useNavigate()

	const clickHandler = (path: string, index: number) => () => {

		// delete handler
		if(index === 2) setOpenModal(true)
		else {
			navigate(path)
			console.log('redirect to', { path, id })
		}
	}

	const closeHandler = () => setOpenModal(false)

	const deleteHandler = (deleteId: string) => () => {
		closeHandler()
		onDelete?.(deleteId)
	}

	return (
		<div className='flex gap-1'>
			{actionItems.map(({ label, path, Icon }, index) => (
				<IconButton key={ label} onClick={clickHandler(path, index)} size='small'>
					<Icon className='text-blue-500' />
				</IconButton>
			))}

			{openModal && (
				<Modal 
					title='Delete Portfolio?'
					submitText='Delete'
					message='Are you sure you want to delete this portfolio?'
					doneHandler={deleteHandler(id)}
					closeHandler={closeHandler}
				/> 
			)}
		</div>
	)
}
