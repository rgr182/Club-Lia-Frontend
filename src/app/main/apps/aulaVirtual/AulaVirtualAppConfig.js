import { authRoles } from 'app/auth';
import React from 'react';
import { Redirect } from 'react-router-dom';

const AulaVirtualAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: [...authRoles.teacher, ...authRoles.usuariosTeachers, ...authRoles.alumno],
	routes: [
		{
			path: '/apps/aula/:id/:calendar',
			component: React.lazy(() => import('./AulaVirtualApp'))
		},
		{
			path: '/apps/aula',
			component: () => <Redirect to="/apps/aula/all" />
		}
	]
};

export default AulaVirtualAppConfig;
