import React, {useCallback} from 'react';
import { Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import { authRoles } from 'app/auth';

function RedirectPage() {
	const user = useSelector(({ auth }) => auth.user);
	const RedirectPageMemo = useCallback(() => {
		let url = '/';
		if(authRoles.admin.includes(user.data.role)){
			url = '/apps/listausuarios/teachers';
		}else if([...authRoles.teacher, ...authRoles.usuariosTeachers].includes(user.data.role)){
			url = '/apps/dashboardmaestros/';
		}else if(authRoles.dashboard.includes(user.data.role)){
			url = '/apps/landing';
		}else if(authRoles.parents.includes(user.data.role)){
			url = '/apps/dashboardpadres/';
		}else if(user.data.role === 'Maestro-R'){
			url = '/pages/profile';
		}
		return url;
	}, [user]);

	return (
		<Redirect to={RedirectPageMemo()} />
	)
}

export default RedirectPage;
