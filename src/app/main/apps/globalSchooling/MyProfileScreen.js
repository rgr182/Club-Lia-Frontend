import Formsy from 'formsy-react';
import { Badge } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    textField: {        
        width: '90%',
        height: '35px',
        marginTop: '8px',
        alignContent: 'left',
        textAlign: 'left',
        '& .MuiInput-root': {
            fontFamily: 'Poppins',
            borderRadius: '8px',
            background: 'transparent',
            color: 'black',
            border: 'solid #BEBEBE 3px',
            padding: '0 3px',
            '&:focus, &:hover, &:focus-visible': {
                border: 'solid #BEBEBE 3px'
            }
        },
        '& .Mui-focused': {
            borderColor: '#00B1FF'
        },
        '& .MuiInput-root.Mui-error': {
            borderColor: '#FF2F54',
            color: '#FF2F54',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#FF2F54'
            }
        },
        '& .MuiInput-root.Mui-disabled': {
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            color: '#BEBEBE',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#F5F5F5'
            }
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#FF2F54'
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover, &:focus-visible': {
                borderColor: 'transparent'
            }
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'transparent'
        },
        '& ::-webkit-calendar-picker-indicator': {
            filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
        },
        '& .MuiInput-inputMultiline': {
            padding: '5px 3px'
        }
    }
}));

export default function MyProfile() {
    const classes = useStyles();  
    const [edit, setEdit] = useState(false);
    const [button, setButton] = useState(false);
    const user = useSelector(({ auth }) => auth.user.data);

    const handleSubmit = () => {
        window.location.reload();
    }
    
    const enableButton = () => {
        setButton(false);
    }
    const disableButton = () => {
        setButton(true);
    }

    useEffect(() => {
        console.log(user);
    }, [user]);

    return(
        <>
            <div className='card-global' style={{width: 'auto'}}>
                <div className='title-global'>Mi cuenta</div>   
                <div className='message-global'>Hemos revisado tus documentos y tenemos algunas observaciones. Por favor, revísalas para continuar el proceso de validación</div>
                <div style={{ width: '100%', display: 'flex', marginTop: '2%' }}>
                    <div className='subtitle-global' style={{width: '50%'}}>INFORMACIÓN DEL TUTOR</div>
                    <div style={{width: '50%', display: 'flex', justifyContent: 'right', paddingBottom: '15px'}}>
                        <button className={edit ? 'btn-edit-global-2' : 'btn-edit-global-1'} style={ edit ? {marginRight: '10px'} : {marginRight: '0px'}} onClick={() => setEdit(!edit)}>
                            <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3.12109H3C2.46957 3.12109 1.96086 3.33181 1.58579 3.70688C1.21071 4.08195 1 4.59066 1 5.12109V19.1211C1 19.6515 1.21071 20.1602 1.58579 20.5353C1.96086 20.9104 2.46957 21.1211 3 21.1211H17C17.5304 21.1211 18.0391 20.9104 18.4142 20.5353C18.7893 20.1602 19 19.6515 19 19.1211V12.1211" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.5 1.62132C17.8978 1.2235 18.4374 1 19 1C19.5626 1 20.1022 1.2235 20.5 1.62132C20.8978 2.01915 21.1213 2.55871 21.1213 3.12132C21.1213 3.68393 20.8978 4.2235 20.5 4.62132L11 14.1213L7 15.1213L8 11.1213L17.5 1.62132Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        {
                            edit ? (
                                <button className={button === false ? 'btn-save-global': 'btn-save-global-2'} disabled={button ? true : false } onClick={() => handleSubmit()}>Guardar</button>
                            ): null
                        }
                    </div>
                </div>
                {
                    edit === true ? (
                        <Formsy 
                            className='formsy-global'                                                        
                            onValid={enableButton}
                            onInvalid={disableButton} 
                        >
                            <div className='flex flex-wrap flex-row w-full pb-20 pt-20'>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <div style={{display: 'flex'}}>
                                        <strong>Nombre</strong><strong style={{color: '#1EC6BC'}}>*</strong>
                                    </div>
                                    <TextFieldFormsy className={classes.textField} name="nombre"
                                        validations={{
                                            maxLength: 150,
                                            isWords: 'isWords'
                                        }}
                                        validationErrors={{                                        
                                            maxLength: 'El máximo de caracteres permitidos es 150',
                                            isWords: 'No se admiten números'
                                        }}
                                        required
                                    >Maribel</TextFieldFormsy>
                                </div>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <div style={{display: 'flex'}}>
                                        <strong>Apellido</strong><strong style={{color: '#1EC6BC'}}>*</strong>
                                    </div>
                                    <TextFieldFormsy className={classes.textField} name="apellido"
                                        validations={{
                                            maxLength: 150,
                                            isWords: 'isWords'
                                        }}
                                        validationErrors={{                                        
                                            maxLength: 'El máximo de caracteres permitidos es 150',
                                            isWords: 'No se admiten números'
                                        }}
                                        required
                                    >Maribel</TextFieldFormsy>
                                </div>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <div style={{display: 'flex'}}>
                                        <strong>Correo</strong><strong style={{color: '#1EC6BC'}}>*</strong>
                                    </div>
                                    <TextFieldFormsy className={classes.textField} name="correo"
                                        validations={{
                                            isEmail: 'isEmail'
                                        }}
                                        validationErrors={{
                                            isEmail: 'No es un correco electrónico'
                                        }}
                                        required
                                    >Maribel</TextFieldFormsy>
                                </div>
                            </div>
                            <div className='flex flex-wrap flex-row w-full pb-20'>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <div style={{display: 'flex'}}>
                                        <strong>Teléfono</strong><strong style={{color: '#1EC6BC'}}>*</strong>
                                    </div>
                                    <TextFieldFormsy className={classes.textField} name="telefono"
                                        validations={{
                                            isNumeric: true,
                                            maxLength: 10
                                        }}
                                        validationErrors={{
                                            isNumeric: 'No es un número',
                                            maxLength: 'El máximo de caracteres permitidos es 10'
                                        }}
                                        required
                                    >Maribel</TextFieldFormsy>
                                </div>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <div style={{display: 'flex'}}>
                                        <strong>Ciudad de residencia (en México)</strong><strong style={{color: '#1EC6BC'}}>*</strong>
                                    </div>
                                    <TextFieldFormsy className={classes.textField} name="ciudad"
                                        validations={{
                                            maxLength: 150                                            
                                        }}
                                        validationErrors={{                                        
                                            maxLength: 'El máximo de caracteres permitidos es 150'                                            
                                        }}
                                        required
                                    />
                                </div>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <div style={{display: 'flex'}}>
                                        <strong>Usuario</strong><strong style={{color: '#1EC6BC'}}>*</strong>
                                    </div>
                                    <TextFieldFormsy disabled className={classes.textField} name="usuario" value="usuario"/>
                                </div>
                            </div>
                        </Formsy>
                    ): (
                        <>
                            <div className='flex flex-wrap flex-row w-full pb-20 pt-20'>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <strong>Nombre(s)</strong>
                                    <div>{user.displayName}</div>
                                </div>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <strong>Apellidos(s)</strong>
                                    <div>{user.lastName}</div>
                                </div>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <strong>Correo</strong>
                                    <div>{user.email}</div>
                                </div>
                            </div>
                            <div className='flex flex-wrap flex-row w-full pb-20'>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <strong>Teléfono</strong>
                                    <div>Maribel</div>
                                </div>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <strong>Ciudad de residencia (en México)</strong>
                                    <div>Leon</div>
                                </div>
                                <div className='w-full sm:w-1 md:w-1/3'>
                                    <strong>Usuario</strong>
                                    <div>{user.username}</div>
                                </div>
                            </div>
                        </>
                    )
                }
                
                <div className='subtitle-global'>CONTRASEÑA</div>
                <div style={{width: '100%'}}>
                    <button className='btn-global'>Cambiar contraseña</button>
                </div>
                <div className='subtitle-global'>INFORMACIÓN DE LAS SUSCRIPCIONES</div>
                <div className='subscription-global'>
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <div>
                            <div className='center-gs' style={{marginTop: '50px'}}>
                                <Badge className='badge-global' badgeContent={1}>
                                    <img className='img-global' src='https://cdn-icons-png.flaticon.com/512/149/149071.png'/>
                                </Badge>
                            </div>
                            <div className='name-global'>Juan Pérez</div>
                            <div className='status-global' style={{background: '#F8CA27'}}>En revisión</div>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <div>
                            <div className='center-gs' style={{marginTop: '50px'}}>
                                <Badge className='badge-global' badgeContent={1}>
                                    <img className='img-global' src='https://cdn-icons-png.flaticon.com/512/149/149071.png'/>
                                </Badge>
                            </div>
                            <div className='name-global'>Juan Pérez</div>
                            <div className='status-global' style={{background: '#FF9457'}}>En proceso</div>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <div>
                            <div className='center-gs' style={{marginTop: '50px'}}>
                                <Badge className='badge-global' badgeContent={1}>
                                    <img className='img-global' src='https://cdn-icons-png.flaticon.com/512/149/149071.png'/>
                                </Badge>
                            </div>
                            <div className='name-global'>Juan Pérez</div>
                            <div className='status-global' style={{background: '#FF6CC4'}}>Actualizado</div>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <div>
                            <div className='center-gs' style={{marginTop: '50px'}}>
                                <Badge className='badge-global' badgeContent={1}>
                                    <img className='img-global' src='https://cdn-icons-png.flaticon.com/512/149/149071.png'/>
                                </Badge>
                            </div>
                            <div className='name-global'>Juan Pérez</div>
                            <div className='status-global' style={{background: '#1CD17A'}}>Aprobado</div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );

}
