import { authRoles } from 'app/auth';
import React from 'react';
import { Redirect } from 'react-router-dom';

const ParentsHomeConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.parents,
	routes: [
		{
			path: '/apps/products/:option',
			component: React.lazy(() => import('./ParentsHome'))
		},
		{
			path: '/apps/products',
			component: () => <Redirect to="/apps/products/cursos" />
		}
	]
};

export default ParentsHomeConfig;
