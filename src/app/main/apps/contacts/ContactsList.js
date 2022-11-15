import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import ContactsTable from './ContactsTable';
import { openEditContactDialog, removeContact, toggleStarredContact, selectContacts } from './store/contactsSlice';
import ContactsSidebarContent from "./ContactsSidebarContent";
import CircularProgress from '@material-ui/core/CircularProgress';

function ContactsList(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const searchText = useSelector(({ fuse }) => fuse.input.texto);
	const loading = useSelector(({ contactsApp }) => contactsApp.contacts.loading);
	const user = useSelector(({ contactsApp }) => contactsApp.user);
	const role = useSelector(({ auth }) => auth.user.role);
	var limited = false;
	if (role === 'Maestro-M' || role === 'Maestro-I' || role === 'Maestro-A' || role === 'maestro_preescolar' || role === 'maestro_secundaria' || role === 'profesor_summit_2021' || role === 'maestro' ||
		role == 'Maestro-I-preescolar' || role == 'Maestro-M-preescolar' || role == 'Maestro-A-preescolar' || role == 'Maestro-I-secundaria' || role == 'Maestro-M-secundaria' || role == 'Maestro-A-secundaria' ) {
		limited = true;
	}

	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: ({ selectedFlatRows }) => {
					const selectedRowIds = selectedFlatRows.map(row => row.original.uuid);
					return (
						selectedFlatRows.length > 0 && <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />
					);
				},
				accessor: 'avatar',
				Cell: ({ row }) => {
					return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
				},
				className: 'justify-center',
				width: 64,
				sortable: false
			},
			{
				Header: 'Nombre(s)',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Apellido(s)',
				accessor: 'last_name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Escuela',
				accessor: 'school_name',
				sortable: true
			},
			{
				Header: 'Grado',
				accessor: 'grade',
				sortable: true
			},
			{
				Header: 'Username',
				accessor: 'username',
				sortable: true
			},
			{
				Header: 'Rol',
				accessor: 'role_name',
				sortable: true
			},
			{
				Header: 'Email',
				accessor: 'email',
				sortable: true
			},
			{
				Header: 'Último login',
				accessor: 'last_login',
				sortable: true
			},
			{
				Header: 'Miembro desde',
				accessor: 'member_since',
				sortable: true
			},
			{
				id: 'action',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						{!limited ?
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(removeContact(row.original.uuid));
								}}
							>
								<Icon>delete</Icon>
							</IconButton>
							:
							null
						}
					</div>
				)
			}
		],
		[dispatch, user.starred]
	);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return contacts;
			}
			return FuseUtils.filterArrayByString(contacts, _searchText);
		}

		if (contacts) {
			setFilteredData(getFilteredArray(contacts, searchText));
		}
	}, [contacts, searchText]);

	if (!filteredData) {
		return null;
	}
let res
	if (loading) {
		res = (
			<>
				<div className="flex flex-1 flex-col items-center justify-center">
					<Typography className="text-20 mb-16" color="textSecondary">
						Se está consultando la información...
					</Typography>
					<CircularProgress color="secondary" />
				</div>
			</>
		);
	} else {
		if (filteredData.length === 0) {
			res = (
				<>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							No hay usuarios que mostrar!
						</Typography>
					</div>
				</>
			);
		}else{
			if (!limited){
				res =  (
				
					<ContactsTable
						columns={columns}
						data={filteredData}
						onRowClick={!limited ? (ev, row, limited) => {
							if (row) {
								dispatch(openEditContactDialog(row.original));
							}
						
						}
						:null
					}
					/>
				)
	
			}else{
				res =  (
				
					<ContactsTable
						columns={columns}
						data={filteredData}
					/>
				)
	
			}
			
		}
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>
			<ContactsSidebarContent />
				{res}
			</>
		</FuseAnimate>
	);
}

export default ContactsList;
