import { authRoles } from 'app/auth';
import LoginLia from './LoginLia';

const LoginLiaConfig = {
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
			path: '/loginlia',
			component: LoginLia
		}
	]
};

export default LoginLiaConfig;
