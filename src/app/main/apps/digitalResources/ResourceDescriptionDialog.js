import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { closeResourceDescriptionDialog } from './store/resourcesSlice';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useParams } from 'react-router-dom';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { ThemeProvider } from '@material-ui/core/styles';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    titleDialog: {
        fontFamily: "Poppins",
        fontSize: "20px",
    },
    input: {
        height: '40px',
        width: '98%',
        borderRadius: '25px',
        alignSelf: "center"
    },
    button: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        borderRadius: "45px",
        background: "transparent",
        color: "#00B1FF",
        height: "35px",
        marginTop: "8px",
        marginRight: "7px",
        border: "solid #00B1FF 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        textTransform: 'none',
        '&:hover': {
            background: "#60CEFF",
            color: "#fff",
            borderColor: "#60CEFF",

        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5',
        }
    },
    buttonFill: {
        background: "#60CEFF",
        color: "#fff",
        border: "solid #60CEFF 3px",
        '&:hover': {
            backgroundColor: '#00B1FF',
            borderColor: '#00B1FF',
        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5',
        }
    },
}));


function ResourceDescriptionDialog() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const routeParams = useParams();

    const resourceDescriptionDialog = useSelector(({ ResourcesApp }) => ResourcesApp.resources.resourceDescriptionDialog);
    const mainTheme = useSelector(selectMainTheme);
    const [recurso, setRecurso] = useState(null);

    const [loading, setLoading] = useState(false);

    function closeComposeDialog() {
        return dispatch(closeResourceDescriptionDialog());
    }

    useEffect(() => {
        // After Dialog Open
        if (resourceDescriptionDialog.props.open) {
            setRecurso(resourceDescriptionDialog.data);
        }
    }, [resourceDescriptionDialog.props.open]);

    const getUrl = (val) => {
        setLoading(true);
		axios.get(process.env.REACT_APP_API + '/verifyURL', {
			params: { src: val }
		}).then(info => {
			if(info.data.data === 0){
				var iframe = `<html><head><style>body, html {width: 100vw; height: 100vh; margin: 0; padding: 0}</style></head><body><iframe src="${val}" style="height:calc(100% - 4px);width:calc(100% - 4px)" name="Maestros"></iframe></html></body>`;
				var win = window.open("","","width=600,height=480, location=no, toolbar=no, menubar=no, resizable=yes");
				win.document.write(iframe);
			}else{
				window.open(val);
			}
            setLoading(false);
		});
	}

    return (
        <Dialog
            classes={{
                paper: 'rounded-8',
            }}
            {...resourceDescriptionDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >
            <AppBar position="static" elevation={1}  >
                <Toolbar className="flex w-full justify-between">
                    <div className="flex w-full text-between items-between justify-between">
                        <Tooltip title={recurso && recurso.name ? recurso.name : 'Titulo del recurso'} placement={'top'}>
                            <Typography className={clsx(classes.titleDialog, 'truncate ...')} color="inherit">
                                {recurso && recurso.name ? recurso.name : 'Titulo del recurso'}
                            </Typography>
                        </Tooltip>
                        <IconButton style={{ backgroundColor: '#fff' }} onClick={() => closeComposeDialog()} size="small">
                            <Icon style={{ color: '#00B1FF', fontWeight: 'bold' }}>close</Icon>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="flex flex-1 items-center justify-center text-center px-8 sm:px-12 m-12">
                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        {recurso ?
                            <DialogContent>
                                <div className='flex w-full h-full items-center justify-center text-center'>
                                    <img className="h-80 pr-6" src={'assets/images/resources/iconos/' + recurso.category_name.replace('ó', 'o').replace('á', 'a') + '.svg'}/>
                                    <div className='text-left pl-6'>
                                        <Typography className="paginationfont font-700 pb-6">Tipo de actividad:</Typography>
                                        <Typography className="paginationfont font-700">{recurso.category_name}</Typography>
                                    </div>
                                </div>
                                <div className='paginationfont pt-20'>
                                    <strong>Grado: </strong> {recurso.grade + '° '+ (recurso.level == 1 ? "Preescolar" : recurso.level == 2 ? "Primaria" : "Secundaria")}{' | '}
                                    <strong>Boque: </strong> {recurso.bloque}{' | '}
                                    <strong>Materia: </strong> {recurso.subjects_name}
                                </div>
                                {recurso.description && <Typography className='paginationfont pt-20 break-words' >{recurso.description}</Typography>}
                                <div className='mt-20 h-60'>
                                    <Button className={clsx(classes.button, classes.buttonFill, 'mb-10')} style={{width: '50%'}} onClick={ev => getUrl(recurso.url_resource)} disabled={loading}>Ver actividad</Button>
                                    {loading && <LinearProgress />}
                                </div>
                            </DialogContent>
                        :
                            <div className="flex flex-1 flex-col items-center justify-center h-80 xl:h-160">
                                <Typography className="text-20 poppins">
                                    Consultando información...
                                </Typography>
                                <CircularProgress color="secondary" />
                            </div>
                        }
                    </FuseAnimate>
                </ThemeProvider>
            </div>
        </Dialog>
    );
}

export default ResourceDescriptionDialog;
