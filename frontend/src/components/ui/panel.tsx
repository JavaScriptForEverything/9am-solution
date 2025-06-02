import { leftPanelListItems } from '@/data/leftPanel'
import { useState } from 'react'
import { Link } from 'react-router-dom'




const Panel = () => {
	const [ selectedTabIndex, setSelectedTabIndex ] = useState(0)
  // const { pathname } = useLocation();
  // const segments = pathname.split('/').filter(Boolean);

	// console.log(segments, pathname)
	const clickHandler = (selectedIndex: number) => () => {
		setSelectedTabIndex(selectedIndex)
	}

	return (
		<div>
				<div className="flex h-screen flex-col justify-between border-e border-gray-100 
				bg-white">
					<div className=''>

						<div className="border-t border-gray-200 ">
							<div className="px-2 ">

								<ul className="space-y-4 border-t border-gray-200 pt-4 rounded ">
									{leftPanelListItems.map( ({ label, Icon, path }, index) => {
									const currentIndex = index 

									return (
										<li key={label} 
										className={`
											${selectedTabIndex === currentIndex ? 'bg-orange-300 rounded' : ''}
											`}
										>
											<Link to={path}
												onClick={clickHandler(currentIndex)}
											 	className="group relative flex rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-200/80 hover:text-gray-700" >

												<div className={`flex gap-4 items-center
														${selectedTabIndex === currentIndex ? 'text-black' : ''}
												`}>
													<Icon className={`size-8 opacity-75`} />
													<label htmlFor="" className='hidden md:block capitalize cursor-pointer'>{label}</label>
												</div>

												<span className="block md:hidden capitalize invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-orange-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible" > { label} </span>
											</Link>
										</li>
									)
									}
									)}
								</ul>

							</div>
						</div>
					</div>

				</div>


		</div>
	)
}
export default Panel
