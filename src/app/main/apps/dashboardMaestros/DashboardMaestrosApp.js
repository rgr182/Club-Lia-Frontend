import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from './store';
import DashboardContent from './DashboardContent';
import { getClasesInfo } from './store/clasesSlice';
import { getAlumnosInfo } from './store/alumnosSlice';

const useStyles = makeStyles({
	
});

function DashboardMaestrosApp(props) {
	const dispatch = useDispatch();
	const pageLayout = useRef(null);

	useDeepCompareEffect(() => {
		dispatch(getClasesInfo());
		dispatch(getAlumnosInfo()); 
	}, [dispatch]);
	
	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				// header={}
				content={<DashboardContent/>}
				sidebarInner				
				ref={pageLayout}
				innerScroll
			/>	
		</>
	);
}

export default withReducer('DashboardMaestrosApp', reducer)(DashboardMaestrosApp);
