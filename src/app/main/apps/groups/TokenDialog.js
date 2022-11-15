import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import reducer from './store';
import { openTokenDialog, closeTokenDialog } from './store/tokenSlice';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
    googleButton: {
        height: '46px',
        width: '191px',
        backgroundSize: 'contain',
        backgroundImage: 'url("assets/images/logos/btn_google_signin_dark_normal_web.png")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundImage: 'url("assets/images/logos/btn_google_signin_dark_focus_web.png")',
        }
    }
}));

function TokenDialog(props) {

    const dispatch = useDispatch();
    const routeParams = useParams();
    const user = useSelector(({ auth }) => auth.user);
    const token = useSelector(({ GroupsApp }) => GroupsApp.token.token) ;
    const tokenDialog = useSelector(({ GroupsApp }) => GroupsApp.token.tokenDialog);
    const classes = useStyles();

    const emailError = routeParams.error && routeParams.error == 'emailError' ? true : false;

    useEffect(() => {
        if(token === 'notLogged'){
            dispatch(openTokenDialog());
        } else {
            dispatch(closeTokenDialog());
        }
    },[dispatch, token]);

    function closeComposeDialog() {
        return dispatch(closeTokenDialog());
    }

    return (
        <div>
            {token ?
                <Dialog
                    classes={{
                        paper: 'm-24 rounded-8'
                    }}
                    {...tokenDialog.props}
                    fullWidth
                    maxWidth="xs"
                >
                    <AppBar position="static" elevation={1}>
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                Ingresa con Google
                            </Typography>
                        </Toolbar>

                    </AppBar>
                    <DialogContent classes={{ root: 'p-24' }}>
                        { emailError &&
                            <DialogContentText className="p-16 pb-0">
                                La cuenta de Google con la que intentas ingresar ya esta registrada por otro usuario.
                            </DialogContentText>
                        }
                        <DialogContentText id="alert-dialog-slide-description" className="p-16">
                            Es necesario ingresar con una cuenta de Google para hacer uso de las funciones del calendario.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="justify-between p-16">
                        <div className="px-16">
                            <Button
                                variant="contained"
                                color="default"
                                type="submit"
                                to={`/apps/dashboardmaestros`}
                                component={Link}
                            >
                                Cancelar
                            </Button>
                        </div>
                        <div className="px-16">
                            <Button
                                className={classes.googleButton}
                                type="submit"
                                onClick={() => window.location.href = process.env.REACT_APP_API+'/login/google/redirect/'+user.uuid+'/groups'}
                            >
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>:
                <h1>Cargando</h1>
            }
        </div>
    );
}
export default withReducer('GroupsApp', reducer)(TokenDialog);