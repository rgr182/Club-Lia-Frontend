import { authRoles } from 'app/auth';
import React from 'react';
import { Redirect } from 'react-router-dom';

const RecordsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: [authRoles.admin,...authRoles.teacher, ...authRoles.usuariosTeachers],
	routes: [
		{
			path: '/apps/grabaciones/:id',
			component: React.lazy(() => import('./RecordsApp'))
		},
		{
			path: '/apps/grabaciones/',
			component: () => <Redirect to="/apps/grabaciones/all" />
		}
	]
};

export default RecordsAppConfig;
