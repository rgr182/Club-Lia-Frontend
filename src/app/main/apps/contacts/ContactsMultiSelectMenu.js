import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setContactsUnstarred, setContactsStarred, removeContacts, openEditContactGroupDialog, openMassiveMessageGroupDialog, openAddToGroupDialog } from './store/contactsSlice';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import LinearProgress from '@material-ui/core/LinearProgress';

function ContactsMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const { selectedContactIds } = props;
	const role = useSelector(({ auth }) => auth.user.role);
	var limited = false;
	var loadingDelete = useSelector(({ contactsApp }) => contactsApp.contacts.loadingDelete);
	if (role === 'Maestro-M' || role === 'Maestro-I' || role === 'Maestro-A' || role === 'maestro_preescolar' || role === 'maestro_secundaria' || role === 'maestro' ||
		role == 'Maestro-I-preescolar' || role == 'Maestro-M-preescolar' || role == 'Maestro-A-preescolar' || role == 'Maestro-I-secundaria' || role == 'Maestro-M-secundaria' || role == 'Maestro-A-secundaria' ) {
		
		limited = true;
	}

	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = React.useState(false);

	function openSelectedContactMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedContactsMenu() {
		setAnchorEl(null);
	}

	const handleClickOpen = () => {
		setOpen(true);
	  };

	const handleClose = () => {
		setOpen(false);
	  };

	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedContactsMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedContactMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedContactsMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedContactsMenu}
			>
				<MenuList>
					{!limited ?
						<>
							<MenuItem
								onClick={() => {
									dispatch(handleClickOpen);
									closeSelectedContactsMenu();
								}}
							>
								<ListItemIcon className="min-w-40">
									<Icon>delete</Icon>
								</ListItemIcon>
								<ListItemText primary="Eliminar" />
							</MenuItem>
							
							<MenuItem
								onClick={() => {
									dispatch(openEditContactGroupDialog(selectedContactIds));
									closeSelectedContactsMenu();
								}}
							>
								<ListItemIcon className="min-w-40">
									<Icon>edit</Icon>
								</ListItemIcon>
								<ListItemText primary="Editar" />
							</MenuItem>
							<MenuItem
								onClick={() => {
									dispatch(openMassiveMessageGroupDialog(selectedContactIds));
									closeSelectedContactsMenu();
								}}
							>
								<ListItemIcon className="min-w-40">
									<Icon>email</Icon>
								</ListItemIcon>
								<ListItemText primary="Crear mensaje" />
							</MenuItem>
						</>
						:
						null
					}
					<MenuItem
						onClick={() => {
							dispatch(openAddToGroupDialog(selectedContactIds));
							closeSelectedContactsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>group</Icon>
						</ListItemIcon>
						<ListItemText primary="Añadir a un grupo" />
					</MenuItem>

				</MenuList>
			</Menu>

			{/*------------- Confirm Dialog -----------*/}
			<Dialog
				open={open}
				onClose={handleClose}
				// aria-labelledby="alert-dialog-title"
				// aria-describedby="alert-dialog-description"
			>
				<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
					{/* <DialogTitle id="alert-dialog-title"> */}
					{"Eliminar usuario(s)"}
				{/* </DialogTitle> */}
					</Typography>
				</Toolbar>
				</AppBar>
				<DialogContent classes={{ root: 'p-24' }}>
					¿Está seguro que desea eliminar al usuario(s)?
				</DialogContent>
				<DialogActions className="justify-between p-16">
						<div className="px-16">
							<Button
							disabled={loadingDelete}
							variant="contained"
							color="default"
							type="submit" 
							onClick={handleClose}>
								Cancelar
							</Button>
						</div>
                        <div className="px-16">
							<Button
								disabled={loadingDelete}
								variant="contained"
								color="primary"
								type="submit" 
								onClick={() => { dispatch(removeContacts(selectedContactIds))} } autoFocus>
									Aceptar
							</Button>
						</div>
				</DialogActions> 
				{ loadingDelete ?
					<DialogContent classes={{ root: 'p-8' }}>
						<div className="px-16">
							<LinearProgress color="secondary" />
						</div>
					</DialogContent>
					: null
				}
			</Dialog>
		</>
	);
}

export default ContactsMultiSelectMenu;
