import { authRoles } from 'app/auth';
import LoginPhpFox from './LoginPhpFox';

const LoginPhpFoxConfig = {
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
			path: '/loginp',
			component: LoginPhpFox
		}
	]
};

export default LoginPhpFoxConfig;
