import { authRoles } from 'app/auth';
import React from 'react';

const SuscriptionPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.parents,
	routes: [
		{
			path: '/apps/suscription/',
			component: React.lazy(() => import('./SuscriptionPage'))
		}
	]
};

export default SuscriptionPageConfig;
