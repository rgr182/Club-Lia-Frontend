import i18next from 'i18next';
import Example from './Admin';
import en from './i18n/en';
import es from './i18n/es';

import React from 'react';
import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'adminPage', en);
i18next.addResourceBundle('es', 'adminPage', es);

// const AdminConfig = {
// 	settings: {
// 		layout: {
// 			config: {}
// 		}
// 	},
// 	routes: [
// 		{
// 			path: '/example',
// 			component: Example
// 		}
// 	]
// };
//
// export default AdminConfig;

/**
 * Lazy load Example
 */



const AdminConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin, // ['admin']
    routes  : [
        {
            path     : '/admin',
            component: React.lazy(() => import('./Admin'))
        }
    ]
};

export default AdminConfig;


