import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import ContactDialog from './ContactDialog';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import Download from './Download';
import reducer from './store';
import { openNewContactDialog, getContacts } from './store/contactsSlice';
import { getUserData } from './store/userSlice';
import {getSchoolsData} from "./store/schoolsSlice";
import {getRolesData} from "./store/rolesSlice";
import {getGroupsInfo} from "./store/groupSlice";
import {getParentsData} from "./store/parentsSlice";

const useStyles = makeStyles({
	addButton: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 99
	},
	exportButton: {
		position: 'absolute',
		right: 80,
		bottom: 12,
		zIndex: 99
	}
});

function ContactsApp(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const role = useSelector(({ auth }) => auth.user.role);
	
	var limited = false;

	if (role == 'maestro_preescolar' || role == 'maestro_secundaria' || role == 'profesor_summit_2021' ||
		role == 'maestro' || role == 'maestroe1' || role == 'maestroe2' || role == 'maestroe3' || role == 'Escuela-I' ||
		role == 'Escuela-M' || role == 'Escuela-A' || role == 'Maestro-I' ||  role == 'Maestro-M' || role == 'Maestro-A' ||
		role == 'Maestro-I-preescolar' || role == 'Maestro-M-preescolar' || role == 'Maestro-A-preescolar' ||
		role == 'Maestro-I-secundaria' || role == 'Maestro-M-secundaria' || role == 'Maestro-A-secundaria') {
		
		limited = true;
	}

	useDeepCompareEffect(() => {
		dispatch(getContacts(routeParams));
		dispatch(getUserData());
		dispatch(getSchoolsData());
		dispatch(getRolesData());
		dispatch(getGroupsInfo());
		dispatch(getParentsData());
	}, [dispatch, routeParams]);

	return (
		<>

			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				// header={<ContactsHeader pageLayout={pageLayout} />}
				content={<ContactsList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{!limited ?
				<>
					<FuseAnimate animation="transition.expandIn" delay={300}>

						<Fab
							color="primary"
							aria-label="add"
							className={classes.exportButton}
						>
							<Download />
						</Fab>
					</FuseAnimate>

					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Fab
							color="primary"
							aria-label="add"
							className={classes.addButton}
							onClick={ev => dispatch(openNewContactDialog())}
						>
							<Icon>person_add</Icon>
						</Fab>
					</FuseAnimate>
				</>
				: null
			}
			<ContactDialog /> 
		</>
	);
}

export default withReducer('contactsApp', reducer)(ContactsApp);
