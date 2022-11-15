import { authRoles } from 'app/auth';
import React from 'react';

const ResetPasswordPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/pages/auth/reset-password',
			component: React.lazy(() => import('./ResetPasswordPage'))
		}
	]
};

export default ResetPasswordPageConfig;
