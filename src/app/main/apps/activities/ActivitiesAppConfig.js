import { authRoles } from 'app/auth';
import React from 'react';
import { Redirect } from 'react-router-dom';

const ActivitiesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: [...authRoles.teacher, ...authRoles.usuariosTeachers],
	routes: [
		{
			path: '/apps/actividades/:id',
			component: React.lazy(() => import('./ActivitiesApp'))
		},
		{
			path: '/apps/actividades',
			component: () => <Redirect to="/apps/actividades/all" />
		},
		{
			path: '/apps/actividadesTarea/:id',
			component: React.lazy(() => import('./ActivitiesApp'))
		},
		{
			path: '/apps/editarActividades/:id?',
			component: React.lazy(() => import('./ActivitiesEdit'))
		},
	]
};

export default ActivitiesAppConfig;
