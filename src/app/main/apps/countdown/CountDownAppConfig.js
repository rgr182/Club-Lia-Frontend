import React from 'react';
import { Redirect } from 'react-router-dom';

const CountDownAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/aula/:id',
			component: React.lazy(() => import('./CountDownApp'))
		},
		{
			path: '/apps/aula',
			component: () => <Redirect to="/apps/aula/all2" />
		}
	]
};

export default CountDownAppConfig;
