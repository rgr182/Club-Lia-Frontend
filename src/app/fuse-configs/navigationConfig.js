import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from '../auth/authRoles';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Menú',
		translate: 'MENÚ',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				translate: 'Dashboard',
				type: 'item',
				auth: authRoles.dashboard,
				icon: 'dashboard',
				url: '/apps/dashboard/'
			},
			{
				id: 'dashboardmaestros',
				title: 'Inicio',
				translate: 'Inicio',
				type: 'item',
				auth: authRoles.usuariosTeachers,
				icon: 'assets/images/dashboard/house.png',
				url: '/apps/dashboardmaestros/'
			},
			{
				id: 'dashboardpadres',
				title: 'Inicio',
				translate: 'Inicio',
				type: 'item',
				auth: authRoles.parents,
				icon: 'assets/images/dashboard/house.png',
				url: '/apps/dashboardpadres/'
			},
			{
				id: 'parentProducts',
				title: 'Productos',
				type: 'item',
				auth: authRoles.parents,
				icon: 'assets/images/dashboard/product.svg',
				url: '/apps/products'
			},
			{
				// Users for admins
				id: 'usuarios',
				title: 'Usuarios',
				translate: 'Usuarios',
				type: 'collapse',
				auth: authRoles.usuarios,
				icon: 'assets/images/dashboard/usuarios.png',
				url: '/apps/usuarios/all',
				children: [
					{
						id: 'allusers',
						title: 'Lista Usuarios',
						translate: 'Lista Usuarios',
						type: 'item',
						auth: authRoles.usuarios,
						url: '/apps/contacts'
					}
				]
			},
			{
				id: 'profile',
				title: 'Mi Cuenta',
				translate: 'Mi Cuenta',
				type: 'item',
				auth: authRoles.teacher,
				icon: 'assets/images/dashboard/profile.png',
				url: '/pages/profile'
			},
			{
				// Users for teachers
				id: 'gruposT',
				title: 'Grupos',
				type: 'collapse',
				auth: authRoles.usuariosTeachers,
				icon: 'assets/images/dashboard/alumnos.png',
				children: [
					{
						id: 'grupos',
						title: 'Mis grupos',
						translate: 'Mis grupos',
						type: 'item',
						auth: authRoles.grupos,
						url: '/apps/grupos/all'
					},
					{
						id: 'alumnos',
						title: 'Alumnos',
						translate: 'Alumnos',
						type: 'item',
						auth: authRoles.usuariosTeachers,
						url: '/apps/alumnos'
					}
				]
			},
			{
				id: 'generar-licencias',
				title: 'Importar Usuarios',
				translate: 'Importar Usuarios',
				type: 'item',
				auth: authRoles.admin_escuela,
				icon: 'assets/images/dashboard/importar_usuarios.png',
				url: '/licencias'
			},
			{
				id: 'actividades',
				title: 'Tareas',
				translate: 'Tareas',
				type: 'item',
				auth: authRoles.activities,
				icon: 'assets/images/dashboard/tareas.png',
				url: '/apps/actividades/all'
			},
			{
				id: 'clases',
				title: 'Clases',
				translate: 'Clases',
				type: 'item',
				auth: authRoles.clases,
				icon: 'assets/images/dashboard/clases.png',
				url: '/apps/eventscalendar'
			},
			{
				id: 'schools-component',
				title: 'Escuelas',
				translate: 'Escuelas',
				type: 'item',
				auth: authRoles.admin,
				icon: 'assets/images/dashboard/escuela.png',
				url: '/apps/schools/all'
			},
			{
				id: 'digitalResources',
				title: 'Actividades LIA',
				translate: 'Actividades LIA',
				type: 'item',
				auth: authRoles.recursosLia,
				icon: 'assets/images/dashboard/recursosLia.png',
				url: '/apps/resources/all',
				color: 'red'
			},
			{
				id: 'comunidad-component',
				title: 'Comunidad',
				translate: 'Comunidad',
				type: 'item',
				auth: authRoles.alumno,
				icon: 'assets/images/dashboard/comunidad.png',
				url: '/loginp'
			},
			{
				id: 'comunidad-component',
				title: 'LIA U',
				translate: 'LIA U',
				type: 'item',
				auth: authRoles.liaU,
				icon: 'assets/images/dashboard/Lia.png',
				url: '/logina'
			},
			{
				id: 'club-lia-kinder-component',
				title: 'Club LIA Kinder',
				translate: 'Club LIA Kinder',
				type: 'link',
				auth: authRoles.mundoLia,
				icon: 'assets/images/dashboard/kinder.png',
				url: `${process.env.REACT_APP_API.split('api')[0]}lia-kinder`,
				target: '_self'
			},
			{
				id: 'parentSuscription',
				title: 'Adquiere una suscripción',
				type: 'item',
				auth: authRoles.parents,
				icon: 'assets/images/dashboard/shopping-bag.svg',
				url: '/apps/suscription/'
			}
		]
	}
];

export default navigationConfig;
