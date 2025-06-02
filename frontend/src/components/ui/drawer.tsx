import { MenuIcon } from '@/icons'
import { useState } from 'react'


type Props = React.ComponentProps<'button'>

const DrawerToggler = ({ onClick }: Props) => {
	return (
		<button 
			onClick={onClick}
			className="flex-1 p-1.5 rounded-full text-black hover:bg-slate-200 transition-colors duration-150 cursor-pointer " 
		>
			<MenuIcon fontSize={30} />
		</button>
	)
}

export const Drawer = () => {
	const [ checked, setChecked ] = useState(false)

	const toggler = () => {
		setChecked(prev => !prev)		
	}

	return (
		<div className='flex '>
			<div className={`
			${checked ? 'w-10 ' : 'w-64 ' } transition-all duration-700 bg-slate-50
			`}>
				Left 
				<DrawerToggler onClick={toggler} />
			</div>


			<div className="flex-1">
				<DrawerToggler onClick={toggler} />
				
				right
			</div>
		</div>
	)
}
export default Drawer

