import type { ListObject } from '@/types/common'

import { Action } from '@/components'
import { Pagination, Checkbox, DataTableCheckbox } from '@/components/ui'
import { useState } from 'react'
import type { DataTableRow } from '@/pages/dashboard'



interface Props {
	getActionItems: (id: string) => ListObject[]

	headers: string[]
	pagination: {
		total: number
		count: number
		onPageChange: (page: number) => void
	}
	onDelete: (id: string) => void
	onBulkDelete: (ids: string[]) => void

	rowItems: DataTableRow[]
	renderRow: (row: DataTableRow) => React.ReactNode

	className?: React.ComponentProps<'div'>['className']
}

export const DataTable = (props: Props) => {

	const { 
		headers, 
		rowItems,
		renderRow,

		getActionItems,
		pagination, 
		
		onDelete, 
		onBulkDelete, 

		className,
	} = props

	const handlePageChange = (page: number) => pagination.onPageChange(page)
	const deleteHandler = (id: string) => onDelete(id)
	const bulkDeleteHandler = (ids: string[]) => () => onBulkDelete(ids)
	

	const [selectedIds, setSelectedIds] = useState<string[]>([])

	const checkBoxChangeHandler = (userId: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {

		if (evt.target.checked) {
			setSelectedIds((prev) => [...prev, userId])
		} else {
			setSelectedIds((prev) => prev.filter((id) => id !== userId))
		}
	}

	const toggleAllSelection = (isChecked: boolean) => () => {
		const selectedIds = rowItems.map( row => row.id) 
		setSelectedIds( isChecked ? [] : selectedIds)
	}

	return (
		<>
		{/* <div className=" w-[286px] md:w-[950px] overflow-x-auto rounded border border-gray-300 shadow-sm " > */}
		<div className={`${className} rounded border border-gray-300 shadow-sm `} >

			<table className="min-w-full divide-y divide-gray-300">
				<thead className="ltr:text-left rtl:text-right">
					<tr className="
						*:font-medium *:text-gray-900 
						[&>th]:p-3 [&>tr>td]:truncate [&>tr>td]:max-w-48 
						[&>th]:text-center
					">
						<th className='w-8'>
							<div className="flex items-center">
								{selectedIds.length == rowItems.length ? (
									<DataTableCheckbox 
										fullCheck={true}
										partialCheck={false}
										onClick={toggleAllSelection(true)}
									/>
								) : selectedIds.length ? (
									<DataTableCheckbox 
										fullCheck={false}
										partialCheck={true}
										onClick={toggleAllSelection(true)}
									/>
								): (
									<DataTableCheckbox 
										fullCheck={false}
										partialCheck={false}
										onClick={toggleAllSelection(false)}
									/>
								)}
							</div>
						</th>
						<th className='w-8'>SL</th>

						{headers.map( item => (
							<th key={item}>{item}</th>
						))}

						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-dashed divide-gray-300 *:text-gray-700 [&>tr>td]:px-3 [&>tr>td]:py-2 [&>tr>td]:truncate [&>tr>td]:max-w-48 ">

					{rowItems.map( row => (
						<tr key={row.id}>
							<td>
								<Checkbox 
									onChange={checkBoxChangeHandler(row.id)}
									checked={selectedIds.includes(row.id)}
								/>
							</td>
							<td>{row.id}</td>

							{renderRow(row)}
							{/* <td>{row.image}</td>
							<td>{row.title}</td>
							<td>{row.description}</td>
							<td>{row.content}</td>
							<td>{row.location}</td>
							<td>{row.createdAt}</td> */}

							<td className='capitalize text-sm'>
								{row.isVisible ? (
									<span className='bg-blue-50 px-2.5 py-1.5 rounded
									border border-blue-100
									text-slate-800
									'>active</span>
								) : (
									<span className='bg-red-50 px-2.5 py-1.5 rounded
									border border-red-100
									text-red-800
									'>inactive</span>
								)
								}
								</td>

							<td>
								<Action 
									id={row.id}
									actionItems={getActionItems(row.id)}
									onDelete={deleteHandler}
								/>
							</td>

						</tr>
					))}


				</tbody>
				<tfoot>
					<tr>
						<td colSpan={3} className='px-4'>
							<div className='text-slate-600 flex gap-3 items-center'>
								<button onClick={bulkDeleteHandler(selectedIds)} className='
									text-slate-800
									disabled:text-slate-500
									hover:text-orange-800
									cursor-pointer
									disabled:cursor-auto
								'>Delete</button>
								<span className='text-slate-800 flex gap-1 items-center'>
									<span className='font-semibold'> {selectedIds.length} </span>
									of 
									<span className='font-semibold'> {rowItems.length} </span>
								</span>
								<span className='whitespace-nowrap'>
								item[s] selected
								</span>
							</div>
						</td>
						<td colSpan={800} className=" w-full py-4 ">
							<div className="flex justify-end">
								<Pagination 
									// total={100} 
									// count={15} 
									total={pagination.total} 
									count={pagination.count} 
									onPageChange={handlePageChange}
								/>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>

		</div>
		</>
	)
}


