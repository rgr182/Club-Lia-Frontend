import { authRoles } from 'app/auth';
import React from 'react';

const DashboardParentConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.parents,
	routes: [
		{
			path: '/apps/dashboardpadres',
			component: React.lazy(() => import('./DashboardParentPage'))
		}
	]
};

export default DashboardParentConfig;
