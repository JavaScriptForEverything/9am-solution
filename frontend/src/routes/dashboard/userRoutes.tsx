import { User, CreateUser, EditUser, ViewUser } from '@/pages/dashboard/user'

export const userRoutes = {
	path: "user",
	handle: { breadcrumb: "User", sidebar: "User" }, 
	children: [

		{
			index: true, 
			element: <User />,
		},

		{
			path: "create", 
			element: <CreateUser />,
			handle: { breadcrumb: "Create User", sidebar: "Create User" },
		},

		{
			path: "update/:slug", 	
			element: <EditUser />,
			handle: { 
				breadcrumb: (params: { slug: string }) => params.slug,
				sidebar: "Update User" 
			},
		},

		{
			path: "view/:slug", 
			element: <ViewUser />,
			handle: { 
				breadcrumb: (params: { slug: string }) => params.slug,
				sidebar: "User Details" 
			},
		},

	]
}