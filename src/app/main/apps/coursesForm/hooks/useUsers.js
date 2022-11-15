import { useState } from 'react';
import users from '../../UserSelect/users';

const useUsers = () => {
	const getUsers = () => users.map(user => ({ ...user, selected: false }));

	const [currentUsers, setCurrentUsers] = useState(getUsers());

	const selectUser = id => {
		const changedUser = currentUsers.find(user => user.id === id);
		changedUser.selected = !changedUser.selected;

		setCurrentUsers([...currentUsers]);
	};

	const hasSelected = () => currentUsers.map(user => user.selected).includes(true);

	const currentActive = currentUsers.filter(user => user.selected).length;

	return {
		currentUsers,
		selectUser,
		hasSelected,
		currentActive
	};
};
export default useUsers;
