import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'

import { RouterProvider } from "react-router-dom"
import { router } from "@/routes/routes"
import { Provider } from 'react-redux'
import { store } from '@/store'
import { Snackbar } from '@/components/ui/snackbar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
		<Provider store={store}>
			<Snackbar />
    	<RouterProvider router={router} />
		</Provider>
  </StrictMode>,
)
