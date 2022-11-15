import React from 'react';
import {Redirect} from "react-router-dom";

const MaintenancePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/pages/bienvenido',
			component: React.lazy(() => import('./MaintenancePage'))
		}
	]
};

export default MaintenancePageConfig;
