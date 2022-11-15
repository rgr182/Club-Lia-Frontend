import '../../../../styles/newdesign.css';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from './store';
import { getUsers } from './store/usersSlice';
import Card from '@material-ui/core/Card';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Typography from '@material-ui/core/Typography';
import UsersList from './UsersList'
import BackLink from 'app/ui/BackLink';

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
    title: {
        fontFamily: 'Wendyone',
        fontSize: '25px',
        fontWeight: 400,
        lineHeight: '26px',
    },
    cardStyle: {
        display: 'block',
        width: '30vw',
        transitionDuration: '0.3s',
        height: '45vw'
    }
});

function UsersApp(props) {
    const dispatch = useDispatch();
    const classes = useStyles(props);
    const routeParams = useParams();
    const role = useSelector(({ auth }) => auth.user.role);
    const users = useSelector(({ usersApp }) => usersApp.users.data);

    var limited = false;

    if (role == 'maestro_preescolar' || role == 'maestro_secundaria' || role == 'profesor_summit_2021' ||
        role == 'maestro' || role == 'maestroe1' || role == 'maestroe2' || role == 'maestroe3' || role == 'Escuela-I' ||
        role == 'Escuela-M' || role == 'Escuela-A' || role == 'Maestro-I' || role == 'Maestro-M' || role == 'Maestro-A') {
        limited = true;
    }

    useDeepCompareEffect(() => {
        dispatch(getUsers(routeParams));
    }, [dispatch, routeParams]);

    const onBack = env => { 
		env.preventDefault(); 
		props.history.goBack(); 
	}
    
    return (

        <div>
            <FuseAnimateGroup
                className="flex flex-wrap justify-center"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >
                <Card elevation={1} class="cardUsers">
                    <BackLink onBack={onBack} />
                    <div className="w-full sm:w-1 md:w-1/3 text-center p-12 px-40">
                        <Typography color="primary" className={classes.title}>
                            {routeParams.type == 'teachers' ? 'Maestros' : null}
                        </Typography>
                    </div>
                    <div className="w-full sm:w-1 md:w-1/3 p-12 px-40"></div>


                    <div class="sectionTable">
                        <UsersList
                            data={users}
                        />
                    </div>
                </Card>
            </FuseAnimateGroup>
        </div>
    );
}

export default withReducer('usersApp', reducer)(UsersApp);
