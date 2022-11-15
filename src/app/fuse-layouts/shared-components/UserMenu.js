import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';

function UserMenu(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	const role = useSelector(({ auth }) => auth.user.role);

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Button className="min-h-40" onClick={userMenuClick}>
				<div className="hidden md:flex flex-col mx-4 items-end">
					
				</div>

				{user.data.photoURL ? (
					<Avatar className="mx-4" alt="user photo" src={user.data.photoURL} />
				) : (
					<Avatar className="mx-4">{user.data.displayName[0]}</Avatar>
				)}
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				{!user.role || user.role.length === 0 ? (
					<>
						<MenuItem component={Link} to="/login" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem>
						<MenuItem component={Link} to="/register" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>person_add</Icon>
							</ListItemIcon>
							<ListItemText primary="Register" />
						</MenuItem>
					</>
				) : (
					<>
						{['maestro_preescolar', 'maestro_secundaria', 'maestro', 'maestroe1', 'maestroe2', 'maestroe3', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'].indexOf(role) >= 0 &&
							<MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button">
								<ListItemIcon className="min-w-40">
									<Icon>account_circle</Icon>
								</ListItemIcon>
								<div className='poppins'>Mi cuenta</div>
							</MenuItem>
						}
						{/* {['padre'].indexOf(role) >= 0 &&
							<MenuItem component={Link} to="/apps/profile" onClick={userMenuClose} role="button">
								<ListItemIcon className="min-w-40">
									<Icon>account_circle</Icon>
								</ListItemIcon>
								<div className='poppins'>Mi cuenta</div>
							</MenuItem>
						} */}
						<MenuItem
							onClick={() => {
								dispatch(logoutUser());
								userMenuClose();
							}}
						>
							<ListItemIcon className="min-w-40">
								<Icon>exit_to_app</Icon>
							</ListItemIcon>
							<div className='poppins'>Cerrar sesión</div>
						</MenuItem>
					</>
				)}
			</Popover>
		</>
	);
}

export default UserMenu;
