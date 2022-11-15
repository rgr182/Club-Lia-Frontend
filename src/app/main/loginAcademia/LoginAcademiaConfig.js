import { authRoles } from 'app/auth';
import LoginAcademia from './LoginAcademia';

const LoginAcademiaConfig = {
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
			path: '/logina',
			component: LoginAcademia
		}
	]
};

export default LoginAcademiaConfig;
