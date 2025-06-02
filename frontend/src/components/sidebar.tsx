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

const Drawer = () => {
	const [ checked, setChecked ] = useState(false)

	const toggler = () => {
		setChecked(prev => !prev)		
	}

	return (
		<div className='flex h-full'>
			{/* --- Left Panel --- */}
			<div className={` ${checked ? 'w-10 ' : 'w-64 ' } transition-all duration-700 bg-slate-50 `}>

				<div className='flex items-center justify-between bg-red-400'>
					<div>Left</div> 
				</div>

			</div>


			{/* --- Right Section --- */}
			<div className="flex-1">

				<div className='flex items-center justify-between'>
					<div className='hidden md:block'>
						<DrawerToggler onClick={toggler} />
					</div>
					<div>Right</div> 
				</div>

			</div>

		</div>
	)
}
export default Drawer


// export default function Sidebar() {
//   const matches = useMatches();

//   // Get all sidebar links defined in handles
//   const sidebarLinks = matches
//     .flatMap((match) => {
//       const children = (match?.data as any)?.children || []; // optional children data
//       return children
//         .filter((r: any) => r.handle?.sidebar)
//         .map((r: any) => ({
//           path: `${match.pathname}/${r.path}`,
//           label: r.handle.sidebar,
//         }));
//     });

//   return (
//     <aside className="w-64 bg-gray-900 text-white p-4 space-y-2">
//       <h2 className="text-lg font-bold">Admin Panel</h2>

// 			<Link to='/dashboard'> Dashboard </Link> <br />
// 			<Link to='/dashboard/users'> Users </Link> <br />
// 			<Link to='/dashboard/settings'> settings </Link> <br />
// 			<br />

// 			<Link to='/login'> Login </Link> <br />
// 			<Link to='/register'> Register </Link> <br />
// 			<br />

// 			<Link to='/demo'> Demo </Link> <br />
// 			<br />
// 			<br />

//       {sidebarLinks.map(({ path, label }) => (
//         <NavLink
//           key={path}
//           to={path}
//           className={({ isActive }) =>
//             isActive ? "block font-bold text-blue-400" : "block"
//           }
//         >
//           {label}
//         </NavLink>
//       ))}
//     </aside>
//   );
// }
