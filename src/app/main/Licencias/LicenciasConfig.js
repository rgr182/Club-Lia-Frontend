import React from 'react';
import { authRoles } from 'app/auth';

const LicenciasConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin,
    routes  : [
        {
            path     : '/licencias',
            component: React.lazy(() => import('./Licencias'))
        }
    ]
};

export default LicenciasConfig;


