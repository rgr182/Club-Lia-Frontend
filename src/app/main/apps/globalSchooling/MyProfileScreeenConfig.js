import React from 'react';
import { Redirect } from 'react-router-dom';

const GroupsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/profile',
			component: React.lazy(() => import('./MyProfileScreen'))
		}
	]
};

export default GroupsAppConfig;
