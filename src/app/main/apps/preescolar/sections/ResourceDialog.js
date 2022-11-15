import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeResourceDialog } from '../store/miTarea';
import Iframe from 'react-iframe';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    TextTitle: {
        color: '#fff',
        fontFamily: ({ nivel }) => nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`,
        fontSize: ({ nivel }) => nivel == 2 ? '24px' : '18px',
        textShadow: '1px 1px 1px #595959',
        fontWeight: 'normal',
    } 
}));

function ResourceDialog() {
    const dispatch = useDispatch();
    const resourceDialog = useSelector(({ MiTareaApp }) => MiTareaApp.miTarea.resourceDialog);
    var role = useSelector(({ auth }) => auth.user.role);
    const grade = useSelector(({ auth }) => auth.user.grade);
    const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
	}
    const nivel = (role == 'alumno' && grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar'? 0 : 1 ;

    const classes = useStyles({ nivel });

    function closeComposeDialog() {
        return dispatch(closeResourceDialog());
    }
    
    return (
        <Dialog
            classes={{
                paper: 'rounded-8',
            }}
            {...resourceDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >
            <AppBar position="static" elevation={1}  >
                <Toolbar className="flex w-full justify-between">
                    <Typography variant="subtitle1" color="inherit" className={clsx(classes.TextTitle)}>
                        {resourceDialog.data && resourceDialog.data.name ? resourceDialog.data.name : 'Recurso' }
                    </Typography>
                    <Button style={{ backgroundColor: 'transparent'}} onClick={() => closeComposeDialog()}>
                        <Icon className={clsx(classes.TextTitle)}>close</Icon>
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent style={{backgroundColor: '#595959'}}>
                    {resourceDialog.data && resourceDialog.data.url_resource ? 
                        <div>
                            <Iframe url={resourceDialog.data.url_resource}
                                width="100%"
                                height="550px"
                                className="myClassname"
                                display="initial"
                                position="relative" 
                            />
                        </div>
                    : 
                        <div className="pt-20 pb-20 justify-center items-center float flex w-full">
                            <CircularProgress color="secondary" />
                        </div>
                    }
            </DialogContent>
        </Dialog>
    );
}

export default ResourceDialog;
