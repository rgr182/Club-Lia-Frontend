import React from 'react';

import { IUserStatus } from 'app/main/apps/users/models/UserModel';
import { makeStyles } from '@material-ui/core';

const useClasses = makeStyles(() => ({
	badge: {
		width: 117,
		height: 22,
		paddingRight: 10,
		paddingLeft: 10,
	}
}));

export default function StatusBadge({ status }) {
	const classes = useClasses();

	let userStatus = {};

	if (!status) return <>N/A</>;
	switch (status.toLowerCase()) {
		case IUserStatus.ACEPTADO.value:
			userStatus = { status: IUserStatus.ACEPTADO.displayValue, backgroundColor: '#1CD17A' };
			break;
		case IUserStatus.NO_CANDIDATO.value:
			userStatus = { status: IUserStatus.NO_CANDIDATO.displayValue, backgroundColor: '#FF2F54' };
			break;
		case IUserStatus.IN_PROCESS.value:
			userStatus = { status: IUserStatus.IN_PROCESS.displayValue, backgroundColor: '#F8CA27' };
			break;
		default:
			userStatus = { status: 'N/A', backgroundColor: '#000000' };
			break;
	}
	return (
		<div
			className={`inline flex rounded-md truncate text-white font-bold text-center justify-center items-center ${classes.badge}`}
			style={{ backgroundColor: userStatus.backgroundColor }}
		>
			<label style={{	fontSize: 13}}>{userStatus.status}</label>
		</div>
	);
}
