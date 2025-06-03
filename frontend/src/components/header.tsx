import { useAppDispatch, useAppSelector } from '@/hooks/redux'
// import { ORIGIN } from '@/lib/config'
import * as userReducer from '@/store/userReducer'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const storedAuth = localStorage.getItem('authDataString');
// const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;


// src/components/Header.tsx
export default function Header() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [ isOpen, setIsOpen ] = useState(false)

	const { user } = useAppSelector(state => state.user)

	const url = new URL(location.href)
	const hostname = url.host

	const avatarClickHandler = () => {
		setIsOpen( prev => !prev)
	}
	const closeHandler = () => setIsOpen(false)

	const logoutHandler = () => {
		dispatch(userReducer.logoutHandler())

		setTimeout(() => {
			closeHandler()
			navigate('/login')
		}, 200)
	}

  return (
    <header className="bg-white shadow px-4 py-2 border-b border-slate-200 
		flex items-center justify-between
		">

      <h1 className="text-xl font-bold ">Admin Dashboard</h1>

			<div className="p-1 rounded-full border border-slate-300
			cursor-pointer relative
			">
				<img 
					src='/vite.svg'
					width={24}
					height={24}
					className='object-cover peer'
					onClick={avatarClickHandler}
				/>
				<div className={`${isOpen ? 'block' : 'hidden'} absolute top-10 right-0 w-40 bg-blue-50 `}>
					<ul>
						{user?.shopnames.map( shop => (
							<Link onClick={closeHandler} key={shop} to={`http://${shop}.${hostname}?storedAuth=${storedAuth}`} >
								<li className='px-2 py-1 border border-slate-300 hover:bg-blue-100 ' >{shop}</li>
							</Link>
						))}

						<li onClick={logoutHandler} className='px-2 py-1 border border-slate-300 hover:bg-blue-100 ' >Logout</li>
					</ul>
				</div>
			</div>


    </header>
  );
}
