import { authRoles } from 'app/auth';
import React from 'react';

const PreescolarConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.alumno,
	routes: [
		{
			path: '/apps/landing',
			component: React.lazy(() => import('./PreescolarLayout'))
		},
		{
			path: '/apps/sections/mistareas',
			component: React.lazy(() => import('./sections/MisTareas'))
		},
		{
			path: '/apps/sections/mitarea/:id',
			component: React.lazy(() => import('./sections/MiTarea'))
		},
		{
			path: '/apps/sections/calendario/',
			component: React.lazy(() => import('./sections/Calendar'))
		},
		{
			path: '/apps/sections/miscore',
			component: React.lazy(() => import('./sections/MiScore'))
		},
		{
			path: '/apps/sections/miscursos',
			component: React.lazy(() => import('./sections/Courses'))
		},
		{
			path:'/apps/galaxies/misgalaxias',
			component:React.lazy(() => import('../galaxies/MisGalaxias'))
		},
		{
			path: '/apps/galaxies/clubs/:club',
			component: React.lazy(() => import('../galaxies/Clubs'))
		},
		{
			path: '/apps/galaxies/recursos/:id/:name',
			component: React.lazy(() => import('../resourcesIcons/Resources'))
		},
		/* {
			path: '/lia-kinder',
			component: React.lazy(() => {
				window.location.href = process.env.REACT_APP_API.split('api')[0] + "lia-kinder";
				return null;
			})
		}, */
	]
};

export default PreescolarConfig;