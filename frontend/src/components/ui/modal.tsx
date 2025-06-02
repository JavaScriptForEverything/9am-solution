import { CrossIcon } from '@/icons'

interface Props {
	submitText: string
	title: string
	message: string
	doneHandler: () => void
	closeHandler: () => void
}

export const Modal = ({ title, message, submitText, doneHandler, closeHandler }: Props) => {

	return (
		<div
			className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modalTitle"
		>
			<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
				<div className="flex items-start justify-between">
					<h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
						{title}
					</h2>

					<button
						type="button"
						aria-label="Close"
						className="-me-4 -mt-4 rounded-full p-2 
						text-gray-400 transition-colors 
						hover:bg-gray-50 
						hover:text-gray-600 focus:outline-none
						active:bg-gray-200 
						cursor-pointer
						"
						onClick={closeHandler}

					>
						<CrossIcon className='size-6' />
					</button>
				</div>

				<div className="mt-4">
					<p className="text-pretty text-gray-700 line-clamp-2">
						{message}
					</p>
				</div>

				<footer className="mt-6 flex justify-end gap-2">
					<button
						type="button"
						className="cursor-pointer rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
						onClick={closeHandler}
					>
						Cancel
					</button>

					<button
						onClick={doneHandler}
						type="button"
						className="cursor-pointer rounded bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-500"
					>
						{submitText}
					</button>
				</footer>
			</div>
		</div>
	)
}
