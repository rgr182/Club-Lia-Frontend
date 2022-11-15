import { authRoles } from 'app/auth';
import React from 'react';

const DashboardMaestrosAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: [...authRoles.teacher, ...authRoles.usuariosTeachers],
	routes: [
		{
			path: '/apps/dashboardmaestros/',
			component: React.lazy(() => import('./DashboardMaestrosApp'))
		}
	]
};

export default DashboardMaestrosAppConfig;
