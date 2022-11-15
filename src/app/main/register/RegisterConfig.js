import { authRoles } from 'app/auth';
import Register from './Register';
import Pricing from './PricingApp';
import Invoice from './Invoice';
import Registro from './Registro';
import RegisterMaestro from './RegisterMaestro';
import CursosMaestro from './CursosMaestro';
import RegistroApoyar from './RegistroApoyar';
import RegistroVoluntario from './RegistroVoluntario';
import RegistroPatrocinar from './RegistroPatrocinar';
import RegistroCita from './RegistroCita';

const RegisterConfig = {
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
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/registro/:type?',
			component: Registro,
		},
		{
			path: '/cursos/:id',
			component: Registro,
		},
		{
			path: '/maestros/registro/:type?',
			component: RegisterMaestro,
		},
		{
			path: '/maestros/cursos/:id',
			component: CursosMaestro,
		},
		{
			path: '/registroapoyar/:type?',
			component: RegistroApoyar
		},
		{
			path: '/registrovoluntario/:type?',
			component: RegistroVoluntario
		},
		{
			path: '/registropatrocinar/:type?',
			component: RegistroPatrocinar
		},
		{
			path: '/registrocita',
			component: RegistroCita
		},
		{
			path: '/invoice',
			component: Invoice
		}, 
	]
};

export default RegisterConfig;
