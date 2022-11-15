import { authRoles } from 'app/auth';
import React from 'react';
import { Redirect } from 'react-router-dom';

const GroupsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: [...authRoles.teacher, ...authRoles.usuariosTeachers],
	routes: [
		{
			path: '/apps/grupos/:id/:error?',
			component: React.lazy(() => import('./GroupsApp'))
		},
		{
			path: '/apps/alumnos',
			component: React.lazy(() => import('./students/StudentApp'))
		},
		{
			path: '/apps/alumno/:id',
			component: React.lazy(() => import('./singleStudent/SingleStudentApp'))
		},
		{
			path: '/apps/alumno',
			component: () => <Redirect to="/apps/alumnos" />
		},
		{
			path: '/apps/grupos/',
			component: () => <Redirect to="/apps/grupos/all" />
		},
		{
			path: '/apps/grupo/:id',
			component: React.lazy(() => import('./Group'))
		}
	]
};

export default GroupsAppConfig;
