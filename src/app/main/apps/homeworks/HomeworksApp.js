import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import HomeworkDialog from './HomeworkDialog';
import HomeworksHeader from './HomeworksHeader';
import reducer from './store';
import { openNewHomeworkDialog, getHomeworks } from './store/homeworkSlice';
import { getTeacherInfo } from './store/teacherSlice';
import HomeworksList from './HomeworksList';
import Paper from '@material-ui/core/Paper';

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

function HomeworksApp(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const role = useSelector(({ auth }) => auth.user.role);			

	useDeepCompareEffect(() => {
		dispatch(getHomeworks(routeParams));
		dispatch(getTeacherInfo());
	}, [dispatch, routeParams]);

	return (
		<>		
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					/* header: 'min-h-72 h-72 sm:h-136 sm:min-h-136', */
					wrapper: 'min-h-0'
				}}
				content={<HomeworksList name={routeParams.name}/>}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>

		</>
	);
}

export default withReducer('HomeworksApp', reducer)(HomeworksApp);
