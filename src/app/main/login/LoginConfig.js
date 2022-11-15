import { authRoles } from 'app/auth';
import Login from '../loginView/Login';
import LoginError from '../loginView/LoginError';

const LoginConfig = {
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
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/login',
			component: Login
		},
		{
			path: '/loginerror',
			component: LoginError
		}
	]
};

export default LoginConfig;
