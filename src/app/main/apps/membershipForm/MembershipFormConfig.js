import { authRoles } from 'app/auth';
import React from 'react';

const MembershipFormConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.parents,
	routes: [
		{
			path: '/apps/products/membresias/:type',
			component: React.lazy(() => import('./MembershipForm')),
			exact: true
		},
		{
			path: '/apps/products/membresias/:type/new',
			component: React.lazy(() => import('./MembershipForm')),
			exact: true
		}
	]
};

export default MembershipFormConfig;
