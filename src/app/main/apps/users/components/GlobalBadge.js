import React from 'react';
import { IGlobalStatus } from 'app/main/apps/users/models/UserModel';

const GlobalBadge = ({ status }) => {
	const getStatus = status => Object.values(IGlobalStatus).find(item => +item.value === +status) ?? {};

	const { displayValue = 'N/A', backgroundColor = '#000' } = getStatus(status);

	return (
		<strong
			className={'inline text-12 px-12 py-4 rounded-md truncate text-white font-bold text-center'}
			style={{ backgroundColor }}
		>
			{displayValue}
		</strong>
	);
};

export default GlobalBadge;
