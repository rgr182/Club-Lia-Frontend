
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import Typography from '@material-ui/core/Typography';
import reducer from './store';
import PricingTabs from './PricingTabs';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';


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
	},
	divHeader:{
		flexGrow:1,
		height:"10%"
	},
	headerImg:{height:40,margin:2},
	loginButton:{backgroundColor:"#4883C0",color:"white"},
	signupButton:{backgroundColor:"#D9AB0C",color:"white"},
	gridHeader:{justifyContent:"flex-end",alignContent:"flex-end", textAlign:"right"},
});

function PricingApp(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
	}, [dispatch, routeParams]);

	return (
		<>
    <FusePageSimple
				classes={{
					contentWrapper: 'p-0 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'w-full',
					wrapper: 'min-h-0'
				}}
				content={<PricingTabs />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
      
		
		</>
	);
}

export default withReducer('PricingApp', reducer)(PricingApp);
