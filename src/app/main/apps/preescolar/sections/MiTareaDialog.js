import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMiTareaDialog } from '../store/miTarea';
import Formsy from "formsy-react";
import validator from 'validator';
import FuseChipSelect from '@fuse/core/FuseChipSelect';

const useStyles = makeStyles(theme => ({
    header: ({ nivel }) => nivel == 2 ? {
        background: 'rgb(0,58,131,203)',
        background: 'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
    } : {
        backgroundColor: '#fff',
    },
    content: {
        backgroundColor: ({ nivel }) => nivel == 2 ? '#00AECF' : '#FFC600',
    },
    TextTitle: ({ nivel }) => nivel == 2 ? {
        color: '#fff',
        fontFamily: 'haettenschweilerRegular',
        fontSize: '24px',
        textShadow: '1px 1px 1px #595959',
        fontWeight: 'normal',
    } : {
        color: '#FF0236',
        fontFamily: `'grobold', 'rager'`,
        fontSize: '18px',
        textShadow: '1px 1px 1px #595959',
        fontWeight: 'normal'
    },
    borde: ({ nivel }) => nivel == 2 ? {
        fontFamily: 'haettenschweilerRegular',
        '& .fuse-chip-select__input': {
            fontFamily: 'haettenschweilerRegular',
            fontSize: '18px',
            color: '#fff',
            textShadow: '2px 2px 2px #595959',
        },
        '& .MuiChip-label': {
            fontFamily: 'haettenschweilerRegular',
            fontSize: '18px',
        },
        '& .css-tlfecz-indicatorContainer': {
            color: 'rgba(0, 0, 0, 0.54)',
            '&:hover': {
                color: 'rgb(0,58,131,203)',
            },
        },
        '& .fileName': {
            fontFamily: 'haettenschweilerRegular',
            fontSize: '24px',
            color: '#fff',
            textShadow: '2px 2px 2px #595959',
        },
        '& label.Mui-focused': {
            color: 'rgb(0,58,131,203)',
            fontFamily: 'haettenschweilerRegular',
            fontSize: '20px',
        },
        '& label': {
            fontFamily: 'haettenschweilerRegular',
            fontSize: '24px',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgb(0,58,131,203)',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'rgb(0,58,131,203)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgb(0,58,131,203)',
            },
        }
    } : {
        fontFamily: 'rager',
        '& .fuse-chip-select__input': {
            fontFamily: 'rager',
            fontSize: '16px',
            color: '#fff',
            textShadow: '2px 2px 2px #595959',
        },
        '& .MuiChip-label': {
            fontFamily: 'rager',
            fontSize: '14px',
        },
        '& .css-tlfecz-indicatorContainer': {
            color: 'rgba(0, 0, 0, 0.54)',
            '&:hover': {
                color: '#fff',
            },
        },
        '& .fileName': {
            fontFamily: 'rager',
            fontSize: '16px',
            color: '#fff',
            textShadow: '2px 2px 2px #595959',
        },
        '& label.Mui-focused': {
            color: '#fff',
            fontFamily: 'rager',
            textShadow: '1px 1px 1px #595959',
        },
        '& label': {
            fontFamily: 'rager',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
            },
        }
    }
}));

function MiTareaDialog(props) {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const miTareaDialog = useSelector(({ MiTareaApp }) => MiTareaApp.miTarea.miTareaDialog);
    var role = useSelector(({ auth }) => auth.user.role);
    const grade = useSelector(({ auth }) => auth.user.grade);
    const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
	}
    const nivel = (role == 'alumno' && grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar'? 0 : 1 ;

    const classes = useStyles({ nivel });

    const [tags, setTags] = useState([]); 
    const [error, setError] = useState([]); 

    /**
     * After Dialog Open
     */
    useEffect(() => {
        setTags(props.urlPath);
        setError([]);
    }, [miTareaDialog.props.open]);

    function closeComposeDialog() {
        return dispatch(closeMiTareaDialog());
    }

    function handleSubmit(event) {
        props.setUrlPath(tags);
        dispatch(closeMiTareaDialog());
    }

    function handleChipChange(val) {
        setTags([]);
        for(let i=0; i < val.length; i++){    
            if (validator.isURL(val[i].value)) {
                setError("");
                if (!val[i].label)
                    val[i].label = val[i].value;
                const label = val[i].label.split('//',2)[1] ? val[i].label.split('//',2)[1] : val[i].label;
                setTags(values => [...values, { id: i, label: label.length <= 8 ? label : `${label.substr(0, 8)}...`, value: val[i].value }]);
            } else {
                setError('No es una url valida');
            }
        }
    }

    return (
        <Dialog
            classes={{
                paper: 'm-24 rounded-8'
            }}
            {...miTareaDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >
            <AppBar position="static" elevation={1} className={clsx(classes.header)} >
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit" className={clsx(classes.TextTitle)}>
                        Adjuntar
                    </Typography>
                </Toolbar>
            </AppBar>
            <Formsy
                ref={formRef}
                className={clsx(classes.content, classes.borde, "flex flex-col md:overflow-hidden")}
                autoComplete="off"
            >
                <DialogContent classes={{ root: 'p-24' }}>
                    <FuseChipSelect
                        className="w-full my-16 mb-16 chipselect"
                        value={tags}
                        placeholder={error}
                        onChange={handleChipChange}
                        size="6"
                        textFieldProps={{
                            label: 'Url',
                            width: '10px',
                            InputLabelProps: {
                                shrink: true
                            },
                            variant: 'outlined'
                        }}
                         isMulti
                    />

                    <Button
						variant="contained"
						className={clsx(classes.header, classes.TextTitle)}
						onClick={e => props.fileInput.current && props.fileInput.current.click()}
						type="button"
					>
						Archivo <Icon>attach_file</Icon>
					</Button>
                    <Typography className="fileName" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap', height: 40 }}>
                            {(props.selectedFile && props.selectedFile.length !== 0) && props.selectedFile.map(row => ( ' ' + row.name ))}
                    </Typography> 
                   
					{props.fileName === 'Error' && (
						<Typography className="fileName" >
							<span className="text-red">Archivo no permitido</span>
						</Typography>
					)}
                </DialogContent>

                <DialogActions className="justify-end p-8">
                    <div className="px-16">
                        <Button
                            variant="contained"
                            className={clsx(classes.header, classes.TextTitle)}
                            onClick={handleSubmit}
                            type="submit"
                        >
                            Aceptar
                        </Button>
                    </div>
                </DialogActions>
            </Formsy>
        </Dialog>
    );
}

export default MiTareaDialog;
