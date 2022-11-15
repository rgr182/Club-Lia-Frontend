import { authRoles } from 'app/auth';
import React from 'react';
import { Redirect } from 'react-router-dom';

const UsersAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/apps/usuarios/',
			component: React.lazy(() => import('./UsersMenu'))
		},
		{
			path: '/apps/usuarios',
			component: () => <Redirect to="/apps/usuarios" />
		},
		{
			path: '/apps/listausuarios/students',
			component: React.lazy(() => import('./components/StudentsList/StudentsList'))
		},
		{
			path: '/apps/listausuarios/:type',
			component: React.lazy(() => import('./UsersApp'))
		},
		{
			path: '/apps/interested',
			component: React.lazy(() => import('./screens/InterestedGrid'))
		},
	]
};

export default UsersAppConfig;
