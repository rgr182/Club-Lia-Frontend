import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from './store';
import SubjectsHeader from './SubjectsHeader';
import SubjectDialog from './SubjectsDialog';
import { openNewSubjectDialog, getSubjects, getGroups, getSubjectsList } from './store/subjectSlice';
import SubjectsList from './SubjectsList';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

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
    },
    textIcon: {
        textTransform: 'lowercase'
    },
	containerAddButtons: {
		display:'flex',
		flexDirection:'row',
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 99
	}    
});

function SubjectsApp(props) {
    const dispatch = useDispatch();

    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const routeParams = useParams();

    useDeepCompareEffect(() => {
        dispatch(getSubjects(routeParams));
        dispatch(getGroups());
        dispatch(getSubjectsList());
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
                header={<SubjectsHeader pageLayout={pageLayout} params={routeParams}/>}
                content={<SubjectsList params={routeParams}/>}
                // leftSidebarContent={<ContactsSidebarContent />}
                sidebarInner
                ref={pageLayout}
                innerScroll
            />

			<div className={classes.containerAddButtons}>
				<div style={{margin:5, marginTop: 9}}>
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Fab color="primary" aria-label="add"  variant="extended" size="medium" to={`/apps/eventscalendar/${routeParams.id}`} component={Link} style={{color:'white'}}>
                            
                               calendario
                            
                        </Fab>
                    </FuseAnimate>
				</div>
				<div style={{margin:5}}>
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Fab
                            color="primary"
                            aria-label="add"
                            //className={classes.addButton}
                            onClick={ev => dispatch(openNewSubjectDialog())}
                        >
                            <Icon>add</Icon>
                        </Fab>
                    </FuseAnimate>
				</div>					
			</div>


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
            <SubjectDialog params={routeParams}/>

        </>
    );
}

export default withReducer('SubjectsApp', reducer)(SubjectsApp);