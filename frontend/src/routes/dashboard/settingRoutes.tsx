import { Setting, CreateSetting, EditSetting, ViewSetting } from '@/pages/dashboard/setting'

export const routes = {
	path: "setting",
	handle: { breadcrumb: "Setting", sidebar: "Setting" }, 
	children: [

		{
			index: true,
			element: <Setting />,
		},

		{
			path: "create", 		
			element: <CreateSetting />,
			handle: { breadcrumb: "Create Setting", sidebar: "Create Setting" },
		},

		{
			path: "update/:slug", 
			element: <EditSetting />,
			handle: { 
				breadcrumb: (params: { slug: string }) => params.slug,
				sidebar: "Update Setting" 
			},
		},

		{
			path: "view/:slug", 	
			element: <ViewSetting />,
			handle: { 
				breadcrumb: (params: { slug: string }) => params.slug,
				sidebar: "Setting Details" 
			},
		},

	]
}