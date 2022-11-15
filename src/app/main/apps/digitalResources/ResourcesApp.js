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
import reducer from './store';
import { getResources, openNewResourceDialog } from './store/resourcesSlice';
import { getCategories } from './store/categorySlice';
import { getSubjects } from './store/subjectsSlice';
import ResourcesList from './ResourcesList';
import ResourceDialog from './ResourceDialog';
import ResourceDescriptionDialog from './ResourceDescriptionDialog';

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

function ResourcesApp(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const role = useSelector(({ auth }) => auth.user.role);

	useDeepCompareEffect(() => {
        dispatch(getResources());
		dispatch(getCategories());
		dispatch(getSubjects());
	}, [dispatch, routeParams]);

	return (
		<>

			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80',
					content: 'flex flex-col',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				content={ <ResourcesList params={routeParams}/>}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{role === 'admin' ? (
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Fab
						color="primary"
						aria-label="add"
						className={classes.addButton}
						onClick={ev => dispatch(openNewResourceDialog())}
					>
						<Icon>assignment_add</Icon>
					</Fab>
				</FuseAnimate> )
				:
				null
			}
			
			<ResourceDialog/>
			<ResourceDescriptionDialog/>
		</>
	);
}
export default withReducer('ResourcesApp', reducer)(ResourcesApp);
