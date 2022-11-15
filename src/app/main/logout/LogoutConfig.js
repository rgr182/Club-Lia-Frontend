
import Logout from './Logout'

const LogoutConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},

	routes: [
		{
			path: '/logout',
			component: Logout
		}
	]
};

export default LogoutConfig;