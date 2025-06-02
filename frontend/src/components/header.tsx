import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import * as userReducer from '@/store/userReducer'
import { Link, useNavigate } from 'react-router-dom'

// src/components/Header.tsx
export default function Header() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { user } = useAppSelector(state => state.user)

	const logoutHandler = () => {
		dispatch(userReducer.logoutHandler())
		setTimeout(() => {
			navigate('/login')
		}, 1000)
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
					className='object-cover'
				/>
				<div className='absolute top-10 right-0 w-40 bg-blue-50 '>
					<ul>
						{user?.shopnames.map( shop => (
							<a key={shop} href={`http://${shop}.localhost:5173`} target="_blank" rel="noopener noreferrer">
								<li className='px-2 py-1 border border-slate-300 hover:bg-blue-100 ' >{shop}</li>
							</a>
						))}

						<li onClick={logoutHandler} className='px-2 py-1 border border-slate-300 hover:bg-blue-100 ' >Logout</li>
					</ul>
				</div>
			</div>


    </header>
  );
}
