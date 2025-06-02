import PublicLayout from '@/layouts/publicLayout'
import Login from '@/pages/login'
import Register from '@/pages/register'


export const authRoutes = {
	path: "/",
	element: <PublicLayout />,
	// errorElement: <ErrorPage />,
	children: [
		{ 
			path: "login", 
			element: <Login /> ,
			// action: loginAction
		},
		{ 
			path: "register", 
			element: <Register /> 
		},
	],
}