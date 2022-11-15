import { authRoles } from 'app/auth';
import React from 'react';

export default {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/pages/parentprofile/:id',
			component: React.lazy(() => import('./profileParent/ProfileParentPage'))
		}
	]
}
