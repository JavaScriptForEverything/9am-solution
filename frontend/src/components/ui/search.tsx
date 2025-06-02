import { SearchIcon } from '@/icons'

type Props = React.ComponentProps<'input'>

export const Search = ({ className, ...rest}: Props) => {

	return (
		<div className='flex gap-2 items-center 
			relative overflow-auto
		'>
			<input {...rest} type="search"
				className={`${className} w-full pl-4 pr-14 py-2
				border border-slate-300 
				rounded focus:outline-none focus:border-slate-400
				`}
			/>

			<button className="
				absolute right-3 rounded-full p-2
				bg-slate-200 
				active:bg-slate-100
				hover:bg-slate-200/80
				hover:text-slate-800
				cursor-pointer
			">
				<SearchIcon className='

				hover:scale-110
				'/>
			</button>
		
		</div>
	)
}
