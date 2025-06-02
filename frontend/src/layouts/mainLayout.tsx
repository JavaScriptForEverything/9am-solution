import Breadcrumbs from '@/components/breadcrumbs'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Panel from '@/components/ui/panel'
import { Outlet } from 'react-router-dom'

import * as userReducer from '@/store/userReducer'
import { useAppDispatch } from '@/hooks/redux'
import { useEffect } from 'react'


const MainLayout = () => {

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(userReducer.getLogedInUser())	
	},[])


  return (
    <div className="min-h-screen flex ">
      <div className="flex-1 flex flex-col bg-orange-300">
        <Header />

					<main className="flex divide-x">
						<div className="max-w-80">
							<Panel />
						</div>
						<div className="flex-1/2 bg-white ">
							<div className="px-4">
        				<Breadcrumbs />
							</div>

							<div className="p-4">
          			<Outlet />
							</div>
						</div>
					</main>

        <Footer />
      </div>
    </div>
  )
}
export default MainLayout