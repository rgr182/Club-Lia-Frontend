import React from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

const ActivitiesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: [authRoles.admin,...authRoles.teacher, ...authRoles.usuariosTeachers],
	routes: [
		{
			path: '/apps/resources/:id',
			component: React.lazy(() => import('./ResourcesApp'))
		},
		{
			path: '/apps/resources',
			component: () => <Redirect to="/apps/resources/all" />
		}
	]
};

export default ActivitiesAppConfig;
