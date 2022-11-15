import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupStudents } from './store/contactsSlice';
import {setContactsUnstarred, setContactsStarred, removeContacts, openEditContactGroupDialog, openMassiveMessageGroupDialog, openAddToGroupDialog } from './store/contactsSlice';

function ContactsMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const { selectedContactIds } = props;
	const [rowS, setRowS] =  React.useState([]);
	const role = useSelector(({ auth }) => auth.user.role);

	useEffect(()=>{
		console.log('a ver', selectedContactIds);
		dispatch(getGroupStudents());
		//setRowS(selectedContactIds);
		//getGroupStudents()
		//var onCharge = JSON.parse(localStorage.getItem('auxId'));
		/* if(onCharge != selectedContactIds){
			localStorage.setItem('auxId', selectedContactIds)
			dispatch(getGroupStudents());
			console.log('funcniona');
		} */
	})

	useEffect(() => {
    }, [rowS]);


	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedContactMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedContactsMenu() {
		setAnchorEl(null);
	}

	return (
		<>
			
		</>
	);
}

export default ContactsMultiSelectMenu;
