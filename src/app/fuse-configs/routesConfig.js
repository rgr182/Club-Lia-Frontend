import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import LoginConfig from 'app/main/login/LoginConfig';
import LoginPhpFoxConfig from 'app/main/loginPhpFox/LoginPhpFoxConfig';
import LoginLiaConfig from 'app/main/loginLia/LoginLiaConfig';
import LoginMundoLiaConfig from 'app/main/loginMundoLia/LoginMundoLiaConfig';
import LoginAcademiaConfig from 'app/main/loginAcademia/LoginAcademiaConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import LicenciasConfig from "../main/Licencias/LicenciasConfig";
import SchoolsConfig from "../main/apps/schools/ItemsAppConfig";
import GroupsConfig from "../main/apps/groups/GroupsAppConfig";
import RegisterConfig from 'app/main/register/RegisterConfig';
import ActivitiesConfig from "../main/apps/activities/ActivitiesAppConfig";
import AulaVirtualAppConfig from "../main/apps/aulaVirtual/AulaVirtualAppConfig";
import HomeworksConfig from "../main/apps/homeworks/HomeworksAppConfig";
import MembershipsAppConfig from "../main/apps/memberships/MembershipsAppConfig";
import MaintenancePageConfig from "../main/pages/maintenance/MaintenancePageConfig";
import RedirectPageConfig from "../main/pages/redirect/RedirectPageConfig";
import DashboardMaestrosAppConfig from '../main/apps/dashboardMaestros/DashboardMaestrosAppConfig';
import DashboardParentConfig from '../main/apps/dashboardParent/DashboardParentConfig';
import EventsCalendarAppConfig from '../main/apps/eventsCalendar/EventsCalendarAppConfig';
import PreescolarConfig from '../main/apps/preescolar/PreescolarConfig';
import CountDownAppConfig from '../main/apps/countdown/CountDownAppConfig';
import ResourcesAppConfig from '../main/apps/digitalResources/ResourcesAppConfig';
import RecordsAppConfig from '../main/apps/records/RecordsAppConfig';
import TeacherCoursesAppConfig from '../main/apps/teacherCourses/TeacherCoursesAppConfig';
import ParentsHomeConfig from '../main/apps/parentsHome/ParentsHomeConfig';
import SuscriptionPageConfig from '../main/apps/parentSuscription/SuscriptionPageConfig';
import MembershipsFormConfig from '../main/apps/membershipForm/MembershipFormConfig';
import CourseFormConfig from '../main/apps/coursesForm/CourseFormConfig';
import MyProfileScreenConfig from '../main/apps/globalSchooling/MyProfileScreeenConfig';

const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
	LogoutConfig,
	LoginConfig,
	LoginPhpFoxConfig,
	LoginLiaConfig,
	LoginMundoLiaConfig,
	LoginAcademiaConfig,
	LicenciasConfig,
	SchoolsConfig,
	GroupsConfig,
	MaintenancePageConfig,
	RedirectPageConfig,
	DashboardMaestrosAppConfig,
	DashboardParentConfig,
	RegisterConfig, 
	ActivitiesConfig,
	AulaVirtualAppConfig,
	HomeworksConfig,
	MembershipsAppConfig,
	EventsCalendarAppConfig, 
	PreescolarConfig,	
	ResourcesAppConfig,
	RecordsAppConfig,
	TeacherCoursesAppConfig,
	CountDownAppConfig,
	SuscriptionPageConfig,
	CourseFormConfig,
	MembershipsFormConfig,
	ParentsHomeConfig,
	MyProfileScreenConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'admin_escuela','alumno_secundaria','maestro_preescolar','maestro_secundaria','director_escuela', 'user', 'alumno','maestro', 'preescolar', 'padre', 'profesor_summit_2021', 'alumnoe0', 'alumnoe1', 'alumnoe2', 'alumnoe3', 'maestroe1', 'maestroe2', 'maestroe3', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Padre-I', 'Padre-M', 'Padre-A', 'Alumno-I', 'Alumno-M', 'Alumno-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria', 'Maestro-R']),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/pages/redirect" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
