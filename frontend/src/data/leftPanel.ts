import { 
	GroupIcon, 
	PortfolioIcon, 
	SettingsIcon,
	AccountIcon,
	ServiceIcon,
	NotificationIcon,
	DashboardIcon,
	LogoutIcon,
	PageIcon,
	MetadataIcon,

} from '@/icons'

interface SidebarList {
	label: string
	Icon: React.ComponentType<any>
	path: string
}

export const leftPanelListItems: SidebarList[] = [
	{ 
		label: 'dashboard', 	
		Icon: DashboardIcon, 
		path: '/dashboard'
	},
	{ 
		label: 'setting', 	
		Icon: SettingsIcon, 
		path: '/dashboard/setting'
	},
	{ 
		label: 'profile', 	
		Icon: AccountIcon, 
		path: '/dashboard/user/profile'
	},
	{ 
		label: 'logout', 	
		Icon: LogoutIcon, 
		path: '/login'
	},
]

