import { authRoles } from 'app/auth';
import LoginMundoLia from './LoginMundoLia';

const LoginMundoLiaConfig = {
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
			path: '/loginmundolia',
			component: LoginMundoLia
		}
	]
};

export default LoginMundoLiaConfig;
