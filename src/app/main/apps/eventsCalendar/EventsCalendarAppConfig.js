import { authRoles } from 'app/auth';
import React from 'react';

const EventsCalendarAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: [...authRoles.teacher, ...authRoles.usuariosTeachers],
	routes: [
		{
			path: '/apps/eventscalendar/:group_id?',
			component: React.lazy(() => import('./EventsCalendarApp'))
		},
		{
			path: '/apps/eventscalendaredit/:calendar_id?/:event_id?',
			component: React.lazy(() => import('./EventsCalendarEdit'))
		}
	]
};

export default EventsCalendarAppConfig;