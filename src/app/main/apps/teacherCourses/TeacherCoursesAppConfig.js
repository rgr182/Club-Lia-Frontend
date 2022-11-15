import { authRoles } from 'app/auth';
import React from 'react';

const TeacherCoursesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: [...authRoles.teacher, ...authRoles.usuariosTeachers],
	routes: [
		{
			path: '/apps/teachercourses',
			component: React.lazy(() => import('./TeacherCoursesApp'))
		},
	]
};

export default TeacherCoursesAppConfig;
