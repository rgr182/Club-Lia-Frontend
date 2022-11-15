import { authRoles } from 'app/auth';
import React from 'react';

const RegisterPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/pages/auth/register',
			component: React.lazy(() => import('./RegisterPage'))
		}
	]
};

export default RegisterPageConfig;
