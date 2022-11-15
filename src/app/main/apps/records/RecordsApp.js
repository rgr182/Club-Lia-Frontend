import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import RecordDialog from './RecordDialog';
import RecordsHeader from './RecordsHeader';
import reducer from './store';
import { getRecords } from './store/recordSlice';
import RecordsTabs from './RecordsTabs';

const useStyles = makeStyles({
	addButton: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 99
	},
	backButton: {
		position: 'absolute',
		left: 12,
		bottom: 12,
		zIndex: 99
	}
});

function RecordsApp(props) {
	const dispatch = useDispatch();

	const userInfo = useSelector(({ auth }) => auth.user.data);

	const classes = useStyles(props);
	const pageLayout = useRef(null);

	var permisos = 3;
	const role = useSelector(({ auth }) => auth.user.role);
	if (role === 'admin' ) {
		permisos = 1;
	} else if (role === 'admin_escuela' || role === 'director_escuela'){
		permisos = 2;
	} else if (role ==='maestro_preescolar' || role === 'maestro_secundaria' || role === 'profesor_summit_2021' 
		|| role === 'maestro' || role === 'maestroe1' || role === 'maestroe2' || role === 'maestroe3' || role === 'Escuela-I' 
		|| role === 'Escuela-M' || role === 'Escuela-A' || role === 'Maestro-I' || role === 'Maestro-M' || role === 'Maestro-A' 
		|| role == 'Maestro-I-preescolar' || role == 'Maestro-M-preescolar' || role == 'Maestro-A-preescolar' || role == 'Maestro-I-secundaria' || role == 'Maestro-M-secundaria' || role == 'Maestro-A-secundaria') {
		permisos = 3;
	}

	useDeepCompareEffect(() => {
		switch (permisos) {
			case 1: 
				dispatch(getRecords(''));
				break;
			case 2: 
				dispatch(getRecords(userInfo.school_id + '/'));
				break;
			case 3: 
				dispatch(getRecords(userInfo.school_id + '/' + userInfo.uuid + '/'));
				break;
		}
	}, [dispatch , ]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 sm:pt-10 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				content={<RecordsTabs />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="secondary"
					aria-label="add"
					className={classes.backButton}
					onClick={env => props.history.goBack()}
				>
					<Icon>{'chevron_left'}</Icon>
				</Fab>
			</FuseAnimate>
			<RecordDialog />

		</>
	);
}

export default withReducer('RecordsApp', reducer)(RecordsApp);
