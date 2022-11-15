import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeRecordDialog } from './store/recordSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { showMessage } from "../../../store/fuse/messageSlice";

function RecordDialog() {
    const dispatch = useDispatch();
    const recordDialog = useSelector(({ RecordsApp }) => RecordsApp.record.recordDialog);
    const role = useSelector(({ auth }) => auth.user.role);

    const [blobUrl, setBlobUrl] = useState(null);
    const [error, setError] = useState(false);

    function closeComposeDialog() {
        return dispatch(closeRecordDialog());
    }

    useEffect(() => {
        setBlobUrl(null);
        // console.log("video/: ", MediaRecorder.isTypeSupported("video/webm"))
        if (role === 'admin' && recordDialog.data && recordDialog.data.downloadURL) {
            createBlob(recordDialog.data.downloadURL);
        }
    }, [recordDialog.data,]);

    function createBlob(url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function (event) {
            const blob = xhr.response;
            setBlobUrl(URL.createObjectURL(blob));
        };
        xhr.open('GET', url);
        xhr.send();
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
                                <Typography variant="subtitle1" style={{fontWeight: 'bold', color: '#fff'}}>
                                    {recordDialog.data.recordName}
                                </Typography>
                                {role === 'admin' &&
                                    <>
                                        <Button style={{ backgroundColor: 'transparent' }}
                                            onClick={ev => {
                                                ev.stopPropagation();
                                                navigator.clipboard.writeText(recordDialog.data.downloadURL);
                                                dispatch(showMessage({ message: 'Enlace copiado' }));
                                            }}
                                        >
                                            <Icon style={{color: '#fff'}}>link</Icon>
                                        </Button>
                                        {blobUrl ?
                                            <Button style={{ backgroundColor: 'transparent' }} >
                                                <a href={blobUrl} download={recordDialog.data.recordName}>
                                                    <Icon style={{color: '#fff'}}>save_alt</Icon>
                                                </a>
                                            </Button>
                                            :
                                            <div >
                                                <CircularProgress color="fff" />
                                            </div>
                                        }
                                    </>
                                }
                            </div>

                            <Button style={{ backgroundColor: 'transparent' }} onClick={() => closeComposeDialog()}>
                                <Icon style={{color: '#fff'}}>close</Icon>
                            </Button>
                        </>
                        :
                        <Typography variant="subtitle1" color="inherit" style={{color: '#fff'}}>
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
                                <Typography color="textSecondary" variant="h5" >
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
