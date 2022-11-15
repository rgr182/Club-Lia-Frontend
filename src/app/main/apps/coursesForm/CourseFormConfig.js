import { authRoles } from 'app/auth';
import React from 'react';

const MembershipFormConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.parents,
	routes: [
		{
			path: '/apps/products/cursos/:type',
			component: React.lazy(() => import('./CourseForm')),
			exact: true
		},
		{
			path: '/apps/products/cursos/:type/new',
			component: React.lazy(() => import('./CourseForm')),
			exact: true
		}
	]
};

export default MembershipFormConfig;
