import React from 'react';
import { authRoles } from 'app/auth';

const HomeworksAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth:  [...authRoles.teacher, ...authRoles.usuariosTeachers],
	routes: [
		{
			path: '/apps/tareas/:id/:name',
			component: React.lazy(() => import('./HomeworksApp'))
		},
		{
			path: '/apps/tareasCalificar',
			component: React.lazy(() => import('./HomeworkGrade'))
		},
	]
};

export default HomeworksAppConfig;
