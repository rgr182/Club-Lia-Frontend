import ForgotPasswordPageConfig from './auth/forgot-password/ForgotPasswordPageConfig';
import LoginPageConfig from './auth/login/LoginPageConfig';
import MailConfirmPageConfig from './auth/mail-confirm/MailConfirmPageConfig';
import RegisterPageConfig from './auth/register/RegisterPageConfig';
import ResetPasswordPageConfig from './auth/reset-password/ResetPasswordPageConfig';
import Error404PageConfig from './errors/404/Error404PageConfig';
import Error500PageConfig from './errors/500/Error500PageConfig';
import MaintenancePageConfig from './maintenance/MaintenancePageConfig';
import ProfilePageConfig from './profile/ProfilePageConfig';
import ProfileParentConfig from './profile/ProfileParentConfig';

const pagesConfigs = [
	LoginPageConfig,
	RegisterPageConfig,
	ResetPasswordPageConfig,
	ForgotPasswordPageConfig,
	MailConfirmPageConfig,
	Error404PageConfig,
	Error500PageConfig,
	MaintenancePageConfig,
	ProfilePageConfig,
	ProfileParentConfig,
];

export default pagesConfigs;
