import { authRoles } from 'app/auth';
import React from 'react';

const MailConfirmPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/pages/auth/mail-confirm',
			component: React.lazy(() => import('./MailConfirmPage'))
		}
	]
};

export default MailConfirmPageConfig;
