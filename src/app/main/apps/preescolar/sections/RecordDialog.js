import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeRecordDialog } from '../store/recordSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    Text: {
		fontFamily: ({ nivel }) => (nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`),
		fontSize: ({ nivel }) => (nivel == 2 ? '26px' : '20px'),
	},
}));

function RecordDialog() {
    const dispatch = useDispatch();
    const recordDialog = useSelector(({ MisTareasApp }) => MisTareasApp.record.recordDialog);
    var role = useSelector(({ auth }) => auth.user.role);
    const info = useSelector(({ auth }) => auth.user);
    const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
	}
	const nivel = (role == 'alumno' && info.grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar' ? 0 : 1;

    const classes = useStyles({ nivel });

    const [error, setError] = useState(false);

    function closeComposeDialog() {
        return dispatch(closeRecordDialog());
    }

    return (
        <Dialog
            classes={{
                paper: 'rounded-8',
            }}
            {...recordDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >
            <AppBar position="static" elevation={1}  >
                <Toolbar className="flex w-full justify-between">
                    {recordDialog.data && recordDialog.data.recordName ?
                        <>
                            <div className="flex w-full items-center">
                                <Typography variant="subtitle1" style={{color: '#fff'}} className={classes.Text} >
                                    {recordDialog.data.recordName}
                                </Typography>
                            </div>

                            <Button style={{ backgroundColor: 'transparent' }} onClick={() => closeComposeDialog()}>
                                <Icon style={{color: '#fff'}}>close</Icon>
                            </Button>
                        </>
                        :
                        <Typography variant="subtitle1" color="inherit" style={{color: '#fff'}} className={classes.Text} >
                            Clase
                        </Typography>
                    }

                </Toolbar>
            </AppBar>
            <DialogContent className="items-center justify-center">
                {recordDialog.data && recordDialog.data.downloadURL ?
                    <div className="items-center justify-center">
                        {!error ? 
                            <video onError={() => {setError(true)}} style={{ display: 'block', margin: 'auto' }} width='1080' height='720' src={recordDialog.data.downloadURL} controls controlsList="nodownload" />
                            :
                            <div className="flex flex-1 items-center justify-center h-full" style={{height: '720px'}}>
                                <Typography color="textSecondary" variant="h5" className={classes.Text} >
                                    El navegador no es compatible con el formato del video
                                </Typography>
                            </div>
                            
                        }
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

export default RecordDialog;
