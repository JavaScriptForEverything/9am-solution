import { Home } from "@/pages/dashboard"
import Users from "@/pages/dashboard/users"
import { routes as settingRoutes } from '@/routes/dashboard/settingRoutes'
// import { userRoutes } from '@/routes/dashboard/userRoutes'

export const dashboardRoutes = {
  path: "dashboard",
  handle: {
    breadcrumb: "Dashboard",
    sidebar: "Dashboard",
  },
  children: [
    { 
			index: true, 
			element: <Home /> 
		},
		settingRoutes,
    {
      path: "user",
      handle: { breadcrumb: "User", sidebar: "User" },
			children: [
				{
					index: true,
      		element: <Users />,
				},
				{
					path: 'profile',
      		element: <Users />,
      		handle: { breadcrumb: "Profile", sidebar: "Profile" },
				}
			],
    },
  ],
};
