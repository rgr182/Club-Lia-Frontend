import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import GroupDialog from './GroupDialog';
import GroupsHeader from './GroupsHeader';
import reducer from './store';
import { openNewGroupDialog, getGroups } from './store/groupSlice';
import { getStudentInfo, getTeacherInfo } from './store/teacherSlice';
import GroupsList from './GroupsList';
import { getToken } from './store/tokenSlice';
import TokenDialog from './TokenDialog';
import Download from './Download';
import '../../../../styles/newdesign.css';
import { CircularProgress } from '@material-ui/core';

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

function GroupsApp(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const token = useSelector(({ GroupsApp }) => GroupsApp.token.token);
	const groupStudents = useSelector(({ GroupsApp }) => GroupsApp.groupstudents.groupstudents);
	const role = useSelector(({ auth }) => auth.user.role);
	let admin = false;
	if (role === 'admin' || role === 'admin_escuela') {
		admin = true;
	}

	useEffect(() => {
		dispatch(getToken());
	}, []);

	useDeepCompareEffect(() => {
		dispatch(getGroups(routeParams));
		dispatch(getStudentInfo());
		dispatch(getTeacherInfo());
	}, [dispatch, routeParams]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-24',
					content: 'flex flex-col',
					leftSidebar: 'w-256 border-0',
					// wrapper: 'min-h-0'
				}}
				content={<GroupsList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{groupStudents ? (
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Fab color="primary" aria-label="add" className={classes.exportButton}>
						<Download />
					</Fab>
				</FuseAnimate>
			) : (
				<></>
			)}
			<GroupDialog />
			{ !admin ?
				<>
					{token ?
						<TokenDialog />
						:
						<CircularProgress variant="determinate" value={25} />
					}
				</>
				:
				null
			}
		</>
	);
}

export default withReducer('GroupsApp', reducer)(GroupsApp);
