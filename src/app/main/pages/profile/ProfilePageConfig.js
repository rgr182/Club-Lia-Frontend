import { authRoles } from 'app/auth';
import React from 'react';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: [... authRoles.teacher, ...authRoles.usuariosTeachers, ...authRoles.admin],
	routes: [
		{
			path: '/pages/profile/:id?',
			component: React.lazy(() => import('./profileTeacher/ProfileTeacherPage'))
		},
	]
};

export default ProfilePageConfig;
