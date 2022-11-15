import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef,useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import UserInfoHeader from '../preescolar/components/UserInfoHeader';
import { Component } from 'react';
import Carousel from 'react-elastic-carousel';
//import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import { PDFReader } from 'react-read-pdf';
import Count from "./Count";


const useStyles = makeStyles({
	TextTitle: {
		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
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
	img: {
        width:100,
        position:"absolute",
        margin:"1%",
	},
	imgHeader: {
		maxHeight: "20%",
		maxWidth: "20%",
	},
    imgBackgroundStyle: {
        backgroundImage: "url(assets/images/backgrounds/Countdown-004.png)", backgroundRepeat: 'no-repeat', backgroundSize:"cover", backgroundPosition: 'center',
        width: '100%',
        height: '100%',
    },
    imgBackgroundStyle2: {
        backgroundImage: "url(assets/images/backgrounds/Countdown-003.png)", backgroundRepeat: 'no-repeat', backgroundSize:"cover", backgroundPosition: 'center',
        width: '100%',
        height: '100%',
    },

    
});

    var hideConsole = true;
    var gamesShow = true;

    

function CountDownApp(props) {
	
    const pageLayout = useRef(null);
    const classes = useStyles(props);

    const user = useSelector(({ auth }) => auth.user.data);
    const role = user.role;
    

	return (
		<>
            {
           /* <DragDropContext onDragEnd={(result)=>console.log(result)}></DragDropContext> */}
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				content={ 
                    <div className={ (role === 'preescolar' ? classes.imgBackgroundStyle2 : classes.imgBackgroundStyle) }>   
                       <h1> </h1>
                        <Count className={classes.videoScreen}/>
                    </div>
                }
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
		</>
	);
}
export default withReducer('CountDownApp')(CountDownApp);
