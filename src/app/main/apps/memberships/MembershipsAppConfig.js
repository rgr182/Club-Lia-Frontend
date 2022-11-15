import { authRoles } from 'app/auth';
import Membership from './MembershipsApp';
import Invoice from './Invoice';


const MembershipsAppConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.memberships,
	routes: [
		{
			path: '/memberships',
			component: Membership
		},
        {
			path: '/bill',
			component: Invoice
		}
	]
};

export default MembershipsAppConfig;