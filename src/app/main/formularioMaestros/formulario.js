import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, FormControlLabel, FormGroup, Input, MenuItem, Select, TextareaAutosize, TextField, Icon, Radio, RadioGroup, FormControl, useMediaQuery } from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Add from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';
import axios from 'axios';
import Formsy from "formsy-react";
import { TextFieldFormsy, SelectFormsy } from "@fuse/core/formsy";
import { showMessage } from "../../store/fuse/messageSlice";
import { useDispatch } from 'react-redux';
import { Zoom } from '@material-ui/core/';
import clsx from 'clsx';
import { 
    withStyles,
    MuiThemeProvider, 
    createMuiTheme
} from '@material-ui/core/styles';
import { fileCreateForm } from './store/formularioSlice';

const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
            fontSize: "10px",
            color: "black",
            backgroundColor: "white",
            boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.15)',
            fontFamily: 'Poppins',
            borderRadius: '0%'
        }
      }
    }
});

const useStyles = makeStyles(theme => ({
    conteiner: {
        height: 'auto',
        width: '100%',
        paddingLeft: '14%',
        paddingRight: '14%',
        paddingTop: '3%',
        fontFamily: 'Poppins !important',
        background: 'white'
    },
    conteiner2: {
        height: 'auto',
        width: '100%',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '3%',
        fontFamily: 'Poppins !important',
        background: 'white'
    },
    child: {
        textAlign: 'center'
    },
    child2: {
        display: 'flex',
        justifyContent: 'left',
        marginBottom: '1%'
    },
    child3: {
        marginBottom: '1%',
        width: '100%',
        marginRight: '2%',
        '& > div': {
            width: '100%'
        }
    },
    child4: {
        marginBottom: '1%',
        width: '100%',
        marginRight: '2%',
        '& > div': {
            width: '100%'
        }
    },
    child5: {
      height: '350px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    child6: {
        width: '1015px',
        height: 'auto',
        background: '#F5F5F5',
        borderRadius: '6px',
        borderTopLeftRadius: '0%'
    },
    input: {
        width: '100%',
        height: '35px',
        background: '#FFFFFF',
        border: '1px solid #353535',
        boxSizing: 'border-box',
        borderRadius: '15px',
        padding: '5px',
        '&:before, &:after, &:focus': {
            border: '0px',
            content: 'none',
            transition: 'none'
        } 
    },
    centerA: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        height: 'auto',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '30px',
        lineHeight: '45px',
        textAlign: 'center',
        color: '#4457FF',
        marginBottom: '2%'
    },
    bold: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '15px',
        lineHeight: '22px',
        color: '#353535'
    },
    buttonSubir: {
        width: '8vw',
        height: '35px',
        background: '#60CEFF',
        borderRadius: '28px',
        fontFamily: 'Poppins',
        color: 'white',
        marginTop: '9px',
        marginLeft: '10px'
    },
    buttonPlus: {
        width: '30px !important',
        height: '30px !important',
        background: '#60CEFF',
        color: 'white',
        borderRadius: '50%'
    },
    text: {
        marginLeft: '3%',
        marginTop: '2%'
    },
    componenteEduativo: {
        width: '161px',
        height: '59px',
        background: '#F5F5F5',
        borderTopLeftRadius: '6px', 
        borderTopRightRadius: '6px',
        borderBottomLeftRadius: '0%',
        paddingLeft: '10px',        
        paddingTop: '9px',
        borderBottomRightRadius: '0%',
        '& > span': {
            fontFamily: 'Poppins'
        }
    },
    checkbox: {
        marginLeft: '5px',
        marginRight: '5px',
        '& > span': {
            fontFamily: 'Poppins'
        }
    },
    checkbox2: {
        width: '161px',
        height: '59px',
        background: 'white',
        borderRadius: '6px',
        borderBottomLeftRadius: '0%',
        paddingLeft: '10px',        
        paddingTop: '9px',
        borderBottomRightRadius: '0%',
        '& > span': {
            fontFamily: 'Poppins'
        }
    },
    tooltip: {
        width: '18px',
        height: '18px',
        background: '#00B1FF',
        marginLeft: '3%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        borderRadius: '50%',
        position: 'relative',
        right: '25px',
        top: '12px'
    },
    tooltip2: {
        width: '18px',
        height: '18px',
        background: '#00B1FF',
        marginLeft: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        borderRadius: '50%',
        position: 'relative',
        right: '25px',
        top: '12px'
    },
    message: {
        width: '192px',
        height: '38px',
        background: '#FFFFFF',
        boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.15)',
    },
    textFieldButton: {
        backgroundColor: 'transparent',
        width: "23vw",
        borderRadius: "15px",
        background: "transparent",
        height: "35px",
        marginTop: "8px",
        // marginRight: "7px",
        border: "solid #BEBEBE 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        fontWeight: 'normal',
        textTransform: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        '&:before, &:after, &:focus, &:hover, &:focus-visible': {
            border: "solid #00B1FF 3px",
            outlineColor: '#00B1FF',
            backgroundColor: 'transparent'
        },
        '& .MuiButton-label': {
            justifyContent: 'left',
        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE !important',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5',
        }
    },
    textField: {
        height: "35px",
        marginTop: "8px",
        alignContent: "left",
        textAlign: "left",      
        width: '100%',  
        '& .MuiInput-root': {
            width: '95%',
            fontFamily: 'Poppins',
            borderRadius: "10px",
            background: "white",
            color: "#353535",
            border: "solid #BEBEBE 3px",
            padding: '0 3px',
            '&:focus, &:hover, &:focus-visible': {
                border: "solid #00B1FF 3px",
            },
        },
        '& .Mui-focused': {
            borderColor: "#00B1FF"
        },
        '& .MuiInput-root.Mui-error': {
            borderColor: '#FF2F54',
            color: '#FF2F54',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#FF2F54',
            },
        },
        '& .MuiInput-root.Mui-disabled': {
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            color: '#BEBEBE',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#F5F5F5',
            },
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#FF2F54',
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover, &:focus-visible': {
                borderColor: 'transparent',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'transparent'
        },
        '& ::-webkit-calendar-picker-indicator': {
            filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
        },
        '& .MuiInput-inputMultiline': {
            padding: '5px 3px',
        }
    },
    textFieldFull: {
        height: "35px",
        marginTop: "8px",
        alignContent: "left",
        textAlign: "left",      
        width: '100%',  
        '& .MuiInput-root': {
            width: '99%',
            fontFamily: 'Poppins',
            borderRadius: "10px",
            background: "white",
            color: "#353535",
            border: "solid #BEBEBE 3px",
            padding: '0 3px',
            '&:focus, &:hover, &:focus-visible': {
                border: "solid #00B1FF 3px",
            },
        },
        '& .Mui-focused': {
            borderColor: "#00B1FF"
        },
        '& .MuiInput-root.Mui-error': {
            borderColor: '#FF2F54',
            color: '#FF2F54',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#FF2F54',
            },
        },
        '& .MuiInput-root.Mui-disabled': {
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            color: '#BEBEBE',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#F5F5F5',
            },
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#FF2F54',
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover, &:focus-visible': {
                borderColor: 'transparent',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'transparent'
        },
        '& ::-webkit-calendar-picker-indicator': {
            filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
        },
        '& .MuiInput-inputMultiline': {
            padding: '5px 3px',
        }
    },
    textFieldNew2: {
        height: "35px",
        marginTop: "8px",
        alignContent: "left",
        textAlign: "left", 
        width: '50%',       
        '& .MuiInput-root': {
            width: '307px',
            fontFamily: 'Poppins',
            borderRadius: "10px",
            background: "white",
            color: "#353535",
            border: "solid #BEBEBE 3px",
            padding: '0 3px',
            '&:focus, &:hover, &:focus-visible': {
                border: "solid #00B1FF 3px",
            },
        },
        '& .Mui-focused': {
            borderColor: "#00B1FF"
        },
        '& .MuiInput-root.Mui-error': {
            borderColor: '#FF2F54',
            color: '#FF2F54',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#FF2F54',
            },
        },
        '& .MuiInput-root.Mui-disabled': {
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            color: '#BEBEBE',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#F5F5F5',
            },
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#FF2F54',
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover, &:focus-visible': {
                borderColor: 'transparent',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'transparent'
        },
        '& ::-webkit-calendar-picker-indicator': {
            filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
        },
        '& .MuiInput-inputMultiline': {
            padding: '5px 3px',
        }
    },
    textFieldNew: {
        height: "35px",
        marginTop: "8px",
        alignContent: "left",
        textAlign: "left", 
        width: '100%',       
        '& .MuiInput-root': {
            width: '95%',
            fontFamily: 'Poppins',
            borderRadius: "10px",
            background: "white",
            color: "#353535",
            border: "solid #BEBEBE 3px",
            padding: '0 3px',
            '&:focus, &:hover, &:focus-visible': {
                border: "solid #00B1FF 3px",
            },
        },
        '& .Mui-focused': {
            borderColor: "#00B1FF"
        },
        '& .MuiInput-root.Mui-error': {
            borderColor: '#FF2F54',
            color: '#FF2F54',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#FF2F54',
            },
        },
        '& .MuiInput-root.Mui-disabled': {
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            color: '#BEBEBE',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#F5F5F5',
            },
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#FF2F54',
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover, &:focus-visible': {
                borderColor: 'transparent',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'transparent'
        },
        '& ::-webkit-calendar-picker-indicator': {
            filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
        },
        '& .MuiInput-inputMultiline': {
            padding: '5px 3px',
        }
    },
    textField2: {
        width: "100%",
        height: "35px",
        marginTop: "8px",
        alignContent: "center",
        textAlign: "left",
        '& .MuiInput-root': {
            fontFamily: 'Poppins',
            borderRadius: "10px",
            background: "transparent",
            width: '300px',
            color: "#353535",
            border: "solid #BEBEBE 3px",
            padding: '0 3px',
            '&:focus, &:hover, &:focus-visible': {
                border: "solid #00B1FF 3px",
            },
        },
        '& .Mui-focused': {
            borderColor: "#00B1FF"
        },
        '& .MuiInput-root.Mui-error': {
            borderColor: '#FF2F54',
            color: '#FF2F54',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#FF2F54',
            },
        },
        '& .MuiInput-root.Mui-disabled': {
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            color: '#BEBEBE',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#F5F5F5',
            },
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#FF2F54',
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover, &:focus-visible': {
                borderColor: 'transparent',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'transparent'
        },
        '& ::-webkit-calendar-picker-indicator': {
            filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
        },
        '& .MuiInput-inputMultiline': {
            padding: '5px 3px',
        }
    },
    textField3: {
        width: "98%",
        height: "100px !important",
        marginTop: "8px",
        alignContent: "center",
        textAlign: "left",
        '& .MuiInput-root': {
            fontFamily: 'Poppins',
            borderRadius: "10px",
            background: "transparent",
            color: "#353535",
            border: "solid #BEBEBE 3px",
            padding: '0 3px',
            '&:focus, &:hover, &:focus-visible': {
                border: "solid #00B1FF 3px",
            },
        },
        '& .Mui-focused': {
            borderColor: "#00B1FF"
        },
        '& .MuiInput-root.Mui-error': {
            borderColor: '#FF2F54',
            color: '#FF2F54',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#FF2F54',
            },
        },
        '& .MuiInput-root.Mui-disabled': {
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            color: '#BEBEBE',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#F5F5F5',
            },
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#FF2F54',
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover, &:focus-visible': {
                borderColor: 'transparent',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'transparent'
        },
        '& ::-webkit-calendar-picker-indicator': {
            filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
        },
        '& .MuiInput-inputMultiline': {
            padding: '5px 3px',
        }
    },
    textArea: {
        width: "100%",
        height: "100px !important",
        marginTop: "8px",
        alignContent: "center",
        textAlign: "left",
        fontFamily: 'Poppins',
        borderRadius: "10px",
        background: "white",
        color: "#353535",
        padding: '0 3px',
        border: "solid #BEBEBE 3px",
        paddingTop: '5px',
        '&:focus, &:hover, &:focus-visible, &:active': {
            border: "solid #00B1FF 3px",
        },
    },
    messageTooltip: {
        '& .MuiTooltip-root': {
            color: 'red'
        }
    },
    buttonDanger: {
        borderRadius: '50%',
        color: 'white', 
        background: '#FF2F54',
        marginLeft: '2%',
        width: '30px',
        height: '30px'
    },
    button: {
        alignContent: 'center',
        textAlign: 'center',
        width: '150px',
        borderRadius: '45px',
        background: 'transparent',
        color: '#00B1FF',
        height: '35px',
        marginTop: '8px',
        marginRight: '7px',
        border: 'solid #00B1FF 3px',
        fontFamily: 'Poppins',
        padding: '3px',
        textTransform: 'none',
        '&:hover': {
            background: '#60CEFF',
            color: '#fff',
            borderColor: '#60CEFF'
        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5'
        }
    },
    buttonFill: {
        background: '#60CEFF',
        color: 'white',
        border: 'solid #60CEFF 3px',
        '&:hover': {
            backgroundColor: '#00B1FF',
            borderColor: '#00B1FF'
        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5'
        }
    },
}));

var dataUser = {  
    name: "",  
    last_name: "",
    email: "",        
    username: "",
    childrens: "",
    role_id: "28",
    password: "",
    c_password: "",
    level_id: "1",
    grade: "",
    user_id: '',
    phone_number: '',
    country: '',
    state: '',
    city: '',
    level_school: 'Preescolar',
    membership: "Maestro invitado",
    document_type: '',
    school_name: '',
    intereses: '',
    grades: '',
    files: [],
    type_of_file: ""
}

export default function Formulario(props) {
    const dispatch = useDispatch();
    const classes = useStyles(props);
    const [dataNumber, setDataNumber] = useState(1);
    const [button, setButton] = useState(true);
    const [validatesForm, setValidatesForm] = useState(true);
    const [newToken, setNewToken] = useState([]);
    const [states, setStates] = useState([]);
    const [country, setCountry] = useState([]);
    const [cities, setCities] = useState([]);
    const [sta, setSta] = useState("Elige una opción");
    const [countr, setCountr] = useState("Elige una opción");
    const [cit, setCit] = useState("Elige una opción");
    const [number, setNumber] = useState(10);
    const [file, setFile] = useState("");
    const [file2, setFile2] = useState("");
    const [file3, setFile3] = useState("");
    const [bandera1, setBandera1] = useState(false);
    const [bandera2, setBandera2] = useState(false);
    const [bandera3, setBandera3] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [id, setId] = useState(null);
    const [count, setCount] = useState(0);
    const [key, setKey] = useState(20);
    const [contador, setContador] = useState(0);
    const [datosArray, setDatosArray] = useState([]);
    const [arrayLevel, setArrayLevel] = useState([]);
    const [name, setName] = useState("");
    const [documentType, setDocumentType] = useState("Título profesional");
    const matches = useMediaQuery('(min-width:960px)', { noSsr: true });

    useEffect(() => {
        var locations = window.location.pathname.slice(12,14);
        switch(locations){
            case "10": setNumber(10); break;
            case "20": setNumber(20); break;
            case "30": setNumber(30); break;
        }
        var array = [];
        axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
            headers: {
                "Accept": "application/json",
                "api-token": "3IyyI9_LtS4bU7P1nQRUPaV7Kbts8LYoFTyaSjtUPXBInukYt64a1yUNJnH3jSD_F2w",
                "user-email": "erik4tohj@gmail.com"
            }
        }).then(data => {
            var token = data.data.auth_token;
            setNewToken(data.data.auth_token);
            axios.get("https://www.universal-tutorial.com/api/countries/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            }).then(data => {                
                for(let i=0; i<data.data.length; i++){
                    array.push(data.data[i].country_name);
                }
                setCountry(array);
            });
        });
        var routes = document.location;
        if(file3 !== file3){
            setBandera3(false);
        }
    }, []);    

    const state = (name) => {
        setCountr(name);
        setSta("Elige una opción");
        setCit("Elige una opción");
        dataUser.country = name;
        axios.get(`https://www.universal-tutorial.com/api/states/${name}`, {
            headers: {
                "Authorization": `Bearer ${newToken}`,
                "Accept": "application/json"
            }
        }).then(data => {
            setStates(data.data);
        });
    }

    const citie = (name) => {
        setSta(name);
        setCit("Elige una opción");
        dataUser.state = name;
        dataUser.state = name;
        axios.get(`https://www.universal-tutorial.com/api/cities/${name}`, {
            headers: {
                "Authorization": `Bearer ${newToken}`,
                "Accept": "application/json"
            }
        }).then(data => {
            setCities(data.data);
            if(data.data.length === 0){
                dataUser.city = name;
            }            
        });
    }

    const citieInfo = (name) => {
        setCit(name);
        dataUser.city = name;
    }

    const nivel = (number, id) => {        
        dataUser.level_school = number;
        dataUser.level_id = id;
        setDataNumber(id);
        var numbers = [1,2,3,4];
        for(let i=0; i<numbers.length; i++){
            var e = document.getElementById(`c${i+1}`);
            var c = e.querySelector('input').checked;
            e.className = "";
            if(c == true){
                e.className = classes.componenteEduativo;  
            }else{
                e.className = "";
                e.className = classes.checkbox2;
            }
        }
    }

    const check = () => {
        var d1 = document.querySelectorAll("#abilitar1");
        var d2 = document.querySelectorAll("#abilitar2");
        if(d1[0].checked === true && d2[0].checked === true){
            setButton(false);
        }else{
            setButton(true);
        }
    }

    const handleSubmit = () => {             
        if(dataNumber.membership === "" || dataUser.name === "" || dataUser.last_name === "" || dataUser.email === "" || dataUser.country === "" || dataUser.state === "" || dataUser.city === "" || dataUser.phone_number === "" || dataUser.school_name === "" || dataUser.level_school === "" || dataUser.level_id === "" || dataUser.username === "" || dataUser.password === "" || dataUser.c_password === "" || dataUser.intereses === "" || dataUser.document_type === "" || dataUser.type_of_file === "" || dataUser.document_type.length === 0 || dataUser.type_of_file.length === 0 || dataUser.grade === "[]"){            
            dispatch(showMessage({ message: 'Completar campos obligatorios', variant: 'error' }));            
        }else{
            axios.post(process.env.REACT_APP_API + '/teacher', dataUser).then(data => {                
                mostrar(data.data.data.lia.id);
                axios.post(process.env.REACT_APP_API + '/teacherRegister', dataUser).then(data => {    
                    console.log(data.data);                
                    dispatch(showMessage({ message: 'Su información fue enviada con éxito', variant: 'success' }));
                    setTimeout(()=> {
                        window.location.href = "/login";     
                    }, 3000);
                });       
            });   
        }
    }
    
    function disableButton() {
        setValidatesForm(false);
    }
    
    function enableButton() {
        setValidatesForm(true);
    }
    
    const files = (data, index) => {
        var array = [];
        var archivos = document.querySelectorAll('#file');
        if(archivos[0].checked === true){
            array = [];
            for(let n=1; n<archivos.length; n++){
                archivos[n].disabled = true;                
            }
            array.push({id: 1, nombre: 'Comunidad LIA'}, {id: 2, nombre: 'Cursos LIA U'}, {id: 3, nombre: 'Certificación LIA docente Creador'}, {id: 4, nombre: 'Instructor / Autor LIA U'}, {id: 5, nombre: 'Maestro Global Schooling'});
            setKey(Math.random());
        }else{
            array = [];
            for(let n=1; n<archivos.length; n++){
                archivos[n].disabled = false;
            }
            for(let i=0; i<archivos.length; i++){            
                var position = array.findIndex(dato => dato.id === i+1);
                if(archivos[i].checked === true){
                    if(position === -1){
                        array.push({id: i, nombre: archivos[i].value});
                    }else{
                        // console.log('Ya existe ese componente');
                    }
                }else{                    
                    datosArray.splice(position, 1);                    
                }
            }    
        }        
        dataUser.document_type = JSON.stringify(array);            
    }
    
    const handleChangeSelect = (value) => {        
        switch(value) {
            case 10: dataUser.membership = "Maestro invitado"; break;
            case 20: dataUser.membership = "Maestro Acreditado"; break;
            case 30: dataUser.membership = "Maestro Certificado"; break;
        }
    }
    
    function setNewSelectedFile(newFile) {    
        setSelectedFiles([...selectedFiles, newFile]); 
    }
    
    const mostrar = (param) => {           
        var archivos = [];
        const fd = new FormData();
        selectedFiles.forEach(element => {
            element.type && archivos.push(element);            
        });
        Array.isArray(archivos) &&
        archivos.forEach(file => {
            fd.append('files[]', file);
        });
        axios.post(process.env.REACT_APP_API + `/fileUpload/${param}`, fd).then(data => {
            console.log(data);
        });    
    }
    // var count = 0;
    const newFile = (number) => {
        switch(count){
            case 0: 
            document.getElementById("container3").style.display = "block"; setCount(1);     
            document.getElementById("agregar").style.display = "block"; setContador(1);              
            break;
            case 1: 
            document.getElementById("container2").style.display = "block"; 
            document.getElementById("agregar").style.display = "none"; setContador(2);
            break;
        }        
        var archivos = document.querySelectorAll('#checked');
        for(let n=0; n<archivos.length; n++){
            if(archivos[n].checked === false){
                archivos[n].disabled = false;
            }
        }
    }

    const changeDocument = (name) => {
        var array = [];
        var archivos = document.querySelectorAll('#checked');
        var innputArchivo = document.querySelectorAll('#divFile');
        for(let n=0; n<archivos.length; n++){
            if(archivos[n].checked === false){
                archivos[n].disabled = false;
            }
        }
        
        for(let i=0; i<archivos.length; i++){
            var position = array.findIndex(dato => dato.id === i+1);
            if(archivos[i].checked === true){
                if(position === -1){
                    if(array.length === contador){
                        for(let n=0; n<archivos.length; n++){
                            if(archivos[n].checked === false){
                                archivos[n].disabled = true;
                            }
                        }
                    }else{
                        for(let n=0; n<archivos.length; n++){
                            if(archivos[n].checked === false){
                                archivos[n].disabled = false;
                            }
                        }
                    }
                    array.push({id: i, nombre: archivos[i].value});
                    setDatosArray(array);
                    
                }else{
                    // console.log('Ya existe ese componente');
                }
            }else{                    
                datosArray.splice(position, 1);                    
            }
        } 
        
        dataUser.type_of_file = array;
        setDocumentType(name);
    }

    const changeLevel = (name) => {
        var array = [];
        var archivos = document.querySelectorAll('#checked2');
        for(let i=0; i<archivos.length; i++){
            var position = array.findIndex(dato => dato.id === i+1);
            if(archivos[i].checked === true){
                if(position === -1){                    
                    array.push({id: i, nombre: archivos[i].value});
                    setArrayLevel(array);                    
                }else{
                    // console.log('Ya existe ese componente');
                }
            }else{                    
                arrayLevel.splice(position, 1);                    
            }
        } 
        dataUser.grade = JSON.stringify(array);
    }

    const regresar = () => {
        props.history.goBack()
    }

    return (
        <>
            <div className={ matches ? classes.conteiner : classes.conteiner2}>
                    <div>
                        <ArrowBackIos style={{ width: '15px' }}/>
                        <button onClick={regresar}><div className={classes.bold}>Regresar</div></button>
                    </div>
                    <div className={classes.child}>
                        <h3 className={classes.title}>¡Bienvenido a Club LIA!</h3>                        
                    </div>
                    <div className={classes.centerA}>
                        <div>
                            <div className={classes.child2}>
                                <strong className={classes.bold}>Tipo de membresia</strong>
                                <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                            </div>
                            <Formsy>
                                <SelectFormsy
                                    name="membresia"
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    className={classes.textField2}
                                    value={number}
                                >
                                    <MenuItem id="dataInputSelect" value={10} onClick={(e) => handleChangeSelect(10)}>Maestro invitado</MenuItem>
                                    <MenuItem id="dataInputSelect" value={20} onClick={(e) => handleChangeSelect(20)}>Maestro Acreditado</MenuItem>
                                    <MenuItem id="dataInputSelect" value={30} onClick={(e) => handleChangeSelect(30)}>Maestro Certificado</MenuItem>
                                </SelectFormsy>
                            </Formsy>
                        </div>
                    </div>
                    <div style={{ marginTop: '8%' }}>
                        <strong className={classes.bold} style={{ color: '#4457FF' }}>DATOS PERSONALES</strong><br/>
                        <strong className={classes.bold}>Por favor, llena los siguientes campos con tus datos</strong>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Formsy
                            onValid={enableButton}
                            onInvalid={disableButton}
                        >
                            <div style={{ marginTop: '2%'}} className="flex flex-wrap flex-row w-full">
                                <div className="w-full sm:w-1 md:w-1/3" style={{marginTop: '3%'}}>
                                    <div style={{display: 'flex'}}>
                                        <strong className={classes.bold}>Nombre(s)</strong>
                                        <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                    </div>
                                    
                                        <TextFieldFormsy 
                                            name="nombre"
                                            className={classes.textField}
                                            id="nombre"
                                            type='text' 
                                            onChange={(e) => dataUser.name = e.target.value}   
                                            required                                      
                                        />                    
                                </div>
                                <div className="w-full sm:w-1 md:w-1/3" style={{marginTop: '3%'}}>
                                    <div style={{display: 'flex'}}>
                                        <strong className={classes.bold}>Apellido(s)</strong>
                                        <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                    </div>
                                    <TextFieldFormsy required name="apellido" className={classes.textField} type='text' onChange={(e) => dataUser.last_name = e.target.value}/>
                                </div>
                                <div className="w-full sm:w-1 md:w-1/3" style={{marginTop: '3%'}}>
                                    <div style={{display: 'flex'}}>
                                        <strong className={classes.bold}>Correo</strong>
                                        <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                    </div>
                                    <TextFieldFormsy type='email' onChange={(e) => dataUser.email = e.target.value}
                                        name="email"
                                        validations={{
                                            isEmail: 'isEmail'
                                        }}
                                        validationErrors={{
                                            isEmail: "El correo electrónico es incorrecto"
                                        }}
                                        className={classes.textField}
                                        required
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: '2%'}} className="flex flex-wrap flex-row w-fulls">
                                <div className="w-full sm:w-1 md:w-1/3" style={{marginTop: '3%'}}>
                                    <div style={{display: 'flex'}}>
                                        <strong className={classes.bold}>País</strong>
                                        <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                    </div>
                                    <SelectFormsy
                                        name="Pais"
                                        className={classes.textField}
                                        style={{ marginTop: '9px' }}
                                        value={countr}
                                        required
                                    >
                                        <MenuItem id="dataInputSelect" key="1" value="Elige una opción">Elige una opción</MenuItem>
                                        {
                                            country ? country.map((data, index) => (
                                                <MenuItem id="dataInputSelect" key={index} value={data} onClick={(e) => state(data)}>{ data }</MenuItem>
                                            )): null
                                        }
                                    </SelectFormsy>
                                </div>
                                <div className="w-full sm:w-1 md:w-1/3" style={{marginTop: '3%'}}>
                                    <div style={{display: 'flex'}}>
                                        <strong className={classes.bold}>Estado</strong>
                                        <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                    </div>
                                    <SelectFormsy
                                        name="Estado"
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"                                        
                                        className={classes.textField}
                                        style={{ marginTop: '9px' }}
                                        value={sta}
                                        required
                                    >
                                        <MenuItem id="dataInputSelect" value="Elige una opción">Elige una opción</MenuItem>
                                        {
                                            states ? states.map((s, index) => (
                                                <MenuItem id="dataInputSelect" key={index} value={s.state_name} onClick={(e) => citie(s.state_name)}>{s.state_name}</MenuItem>
                                            )): null
                                        }
                                    </SelectFormsy>
                                </div>
                                <div className="w-full sm:w-1 md:w-1/3" style={{marginTop: '3%'}}>
                                    <div style={{display: 'flex'}}>
                                        <strong className={classes.bold}>Ciudad</strong>
                                        <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                    </div>
                                    <SelectFormsy
                                        name="Ciudad"
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"                                        
                                        className={classes.textField}
                                        style={{ marginTop: '9px' }}
                                        value={cit}
                                        required
                                    >
                                        <MenuItem id="dataInputSelect" value="Elige una opción">Elige una opción</MenuItem>
                                        {
                                            cities ? cities.map((c, index) => (
                                                <MenuItem id="dataInputSelect" key={index} value={c.city_name} onClick={(e) => citieInfo(c.city_name)}>{c.city_name}</MenuItem>
                                            )): null
                                        }
                                    </SelectFormsy>
                                </div>
                            </div>
                            <div style={{ marginTop: '2%'}} className="flex flex-wrap flex-row w-full pb-35">
                                <div className="w-full sm:w-1 md:w-1/3" style={{marginTop: '3%'}}>
                                    <div style={{display: 'flex'}}>
                                        <strong className={classes.bold}>Teléfono</strong>                                        
                                    </div>
                                    <TextFieldFormsy name="phone" type='text'onChange={(e) => dataUser.phone_number = e.target.value} 
                                        validations='maxLength:10'
                                        validationError='Máximo 10 numeros' 
                                        className={classes.textField}  
                                    />
                                </div>
                                <div className="w-full sm:w-full" style={{marginTop: '3%', width: '66%'}}>
                                    <div style={{display: 'flex'}}>
                                        <strong className={classes.bold}>Escuela o empresa</strong>
                                        <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                    </div>
                                    <TextFieldFormsy name="nombreEscuela" type='text' className={classes.textFieldFull} style={{width: '100%'}} onChange={(e) => dataUser.school_name = e.target.value}/>
                                </div>
                            </div>
                        </Formsy>
                    </div>
                    
                    {matches && (    
                        <div style={{ marginTop: '5%', marginBottom: '5%' }}>
                            
                                <div style={{display: 'flex', marginBottom: '1%'}}>
                                    <strong className={classes.bold}>Nivel educativo</strong>
                                    <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                </div>
                                <div>                                    
                                    <FormControl>
                                        <RadioGroup
                                            defaultValue="1" 
                                            style={{ fontFamily: 'Poppins', display: 'flex' }}
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <div style={{ display: 'flex', overflowX: 'auto'}}>
                                                <FormControlLabel value='1' id='c1' className={classes.componenteEduativo} onClick={(e) => nivel("Preescolar", 1)} control={<Radio/>} label="Preescolar" />
                                                <FormControlLabel value='2' id='c2' className={classes.checkbox2} onClick={(e) => nivel("Primaria", 2)} control={<Radio/>} label="Primaria" />
                                                <FormControlLabel value='3' id='c3' className={classes.checkbox2} onClick={(e) => nivel("Secundaria", 3)} control={<Radio/>} label="Secundaria" />
                                                <FormControlLabel value='4' id='c4' className={classes.checkbox2} onClick={(e) => nivel("Otro", 4)} control={<Radio/>} label="Otro" />
                                            </div>      
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={classes.child6} style={{ width: '100%' }}>
                                    <div style={{display: 'flex', marginBottom: '1%' }}>
                                        { 
                                            dataNumber !== 4 ?  <strong style={{ marginLeft: '4%', marginTop: '3%' }} className={classes.bold}>Grado</strong> : null
                                        }                
                                    </div>
                                    {
                                        dataNumber === 2 ?
                                            <div>                                        
                                                <FormGroup style={{ fontFamily: 'Poppins', marginBottom: '25px', marginTop: '25px' }}>
                                                    <div style={{ paddingLeft: '30px' }} className="gridForm3">                                                    
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Primero" />} onClick={(e) => changeLevel(e.target.value)} label="Primero" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Segundo" />} onClick={(e) => changeLevel(e.target.value)} label="Segundo" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Tercero" />} onClick={(e) => changeLevel(e.target.value)} label="Tercero" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Cuarto" />} onClick={(e) => changeLevel(e.target.value)} label="Cuarto" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Quinto" />} onClick={(e) => changeLevel(e.target.value)} label="Quinto" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Sexto" />} onClick={(e) => changeLevel(e.target.value)} label="Sexto" />
                                                    </div>      
                                                </FormGroup>
                                                
                                            </div> 
                                        : dataNumber === 4 ? 
                                            <div>                                        
                                                <div style={{ display: 'flex', width: '100%', padding: '15px 15px 15px 21px' }}>
                                                    <div className={classes.child3}>
                                                        <div style={{ display: 'flex' }}>
                                                            <strong className={classes.bold}>Indicar nivel</strong>
                                                            <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                                        </div>
                                                        <Formsy
                                                            onValid={enableButton}
                                                            onInvalid={disableButton}
                                                            // className="w-full sm:w-1/2 md:w-1"
                                                        >
                                                            <TextFieldFormsy className={classes.textFieldNew2} name="nivel" type='text' onClick={(e) => dataUser.level_school = e.target.value}/>
                                                        </Formsy>
                                                    </div>
                                                </div>                                        
                                            </div> 
                                        : 
                                            dataNumber === 1 ?
                                            <div>                                        
                                                <FormGroup style={{ fontFamily: 'Poppins', marginBottom: '25px', marginTop: '25px' }}>
                                                    <div style={{ paddingLeft: '30px' }} className="gridForm3">
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Primero" />} onClick={(e) => changeLevel(e.target.value)} label="Primero" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Segundo" />} onClick={(e) => changeLevel(e.target.value)} label="Segundo" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Tercero" />} onClick={(e) => changeLevel(e.target.value)} label="Tercero" />
                                                    </div>      
                                                </FormGroup>
                                            </div>
                                            : dataNumber === 3 ? 
                                                    <FormGroup style={{ fontFamily: 'Poppins', marginBottom: '25px', marginTop: '25px' }}>
                                                        <div style={{ paddingLeft: '30px' }} className="gridForm3">
                                                            <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Primero" />} onClick={(e) => changeLevel(e.target.value)} label="Primero" />
                                                            <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Segundo" />} onClick={(e) => changeLevel(e.target.value)} label="Segundo" />
                                                            <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Tercero" />} onClick={(e) => changeLevel(e.target.value)} label="Tercero" />
                                                        </div>      
                                                    </FormGroup>                                            
                                            : null
                                    }           
                                    <Formsy
                                        onValid={enableButton}
                                        onInvalid={disableButton}
                                    >
                                        <div style={{ padding: '15px 15px 15px 21px' }} className="gridForm">
                                            <div className={classes.child3}>
                                                <div style={{ display: 'flex' }}>
                                                    <strong className={classes.bold}>Crea un usuario</strong>
                                                    <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                                </div>
                                                <TextFieldFormsy name="username" className={classes.textField} type='email' onChange={(e) => dataUser.username = e.target.value} />
                                            </div>
                                            <div className={classes.child3}>
                                                <div style={{ display: 'flex' }}>
                                                    <strong className={classes.bold}>Crear contraseña</strong>
                                                    <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                                </div>
                                                <TextFieldFormsy type='password' onChange={(e) => dataUser.password = e.target.value}
                                                    name="password1"
                                                    updateImmediately
                                                    className={classes.textField}
                                                />
                                            </div>
                                            <div className={classes.child3}>
                                                <div style={{ display: 'flex' }}>
                                                    <strong className={classes.bold}>Confirma tu contraseña</strong>
                                                    <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                                </div>
                                                <TextFieldFormsy name="password2" type='password' onChange={(e) => dataUser.c_password = e.target.value}
                                                    validations='equalsField:password1'
                                                    validationError='Las contraseñas no coinciden'
                                                    updateImmediately
                                                    className={classes.textField}
                                                />
                                            </div>
                                        </div>
                                    </Formsy>
                                    <div style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%', paddingBottom: '4%' }}>
                                        <div style={{ display: 'flex', marginBottom: '1%' }}>
                                            <strong className={classes.bold}>Materias que impartes</strong>
                                            <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                        </div>                                    
                                        <TextareaAutosize name="textarea" onChange={(e) => dataUser.intereses = e.target.value} className={classes.textArea} style={{height: '100px'}}></TextareaAutosize>
                                    </div>                     
                                </div>
                            
                        </div>   
                    )}
                    {!matches && (    
                        <div style={{ marginTop: '5%', marginBottom: '5%' }}>
                            
                                <div style={{display: 'flex', marginBottom: '1%'}}>
                                    <strong className={classes.bold}>Nivel educativo</strong>
                                    <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                </div>
                                <div>
                                    <FormControl>
                                        <RadioGroup
                                            defaultValue="1" 
                                            style={{ fontFamily: 'Poppins', display: 'flex' }}
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <div style={{ display: 'flex', overflowX: 'auto'}}>
                                                <FormControlLabel value='1' id='c1' style={{ width: 'auto', justifyContent: 'center', display: 'flex', paddingTop: '0px', paddingLeft: '0px', marginLeft: '0%' }} className={classes.componenteEduativo} onClick={(e) => nivel(1)} control={<Radio/>} />
                                                <FormControlLabel value='2' id='c2' style={{ width: 'auto', justifyContent: 'center', display: 'flex', paddingTop: '0px', paddingLeft: '0px' }} className={classes.checkbox2} onClick={(e) => nivel(2)} control={<Radio/>} />
                                                <FormControlLabel value='3' id='c3' style={{ width: 'auto', justifyContent: 'center', display: 'flex', paddingTop: '0px', paddingLeft: '0px' }} className={classes.checkbox2} onClick={(e) => nivel(3)} control={<Radio/>} />
                                                <FormControlLabel value='4' id='c4' style={{ width: 'auto', justifyContent: 'center', display: 'flex', paddingTop: '0px', paddingLeft: '0px' }} className={classes.checkbox2} onClick={(e) => nivel(4)} control={<Radio/>} />
                                            </div>       
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={classes.child6} style={{ width: '100%' }}>
                                    <div style={{display: 'flex', marginBottom: '1%' }}>
                                        { 
                                            dataNumber !== 4 ?  <strong style={{ marginLeft: '4%', marginTop: '3%' }} className={classes.bold}>Grado</strong> : null
                                        }                
                                    </div>
                                    {
                                        dataNumber === 2 ?
                                            <div>                                        
                                                <FormGroup style={{ fontFamily: 'Poppins', marginBottom: '25px', marginTop: '25px' }}>
                                                    <div style={{ paddingLeft: '30px' }} className="gridForm3">                                                    
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Primero" />} onClick={(e) => changeLevel(e.target.value)} label="Primero" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Segundo" />} onClick={(e) => changeLevel(e.target.value)} label="Segundo" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Tercero" />} onClick={(e) => changeLevel(e.target.value)} label="Tercero" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Cuarto" />} onClick={(e) => changeLevel(e.target.value)} label="Cuarto" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Quinto" />} onClick={(e) => changeLevel(e.target.value)} label="Quinto" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Sexto" />} onClick={(e) => changeLevel(e.target.value)} label="Sexto" />
                                                    </div>      
                                                </FormGroup>
                                                
                                            </div> 
                                        : dataNumber === 4 ? 
                                            <div>                                        
                                                <div style={{ padding: '15px 15px 15px 21px' }} className="gridForm">
                                                    <div className={classes.child3}>
                                                        <div style={{ display: 'flex' }}>
                                                            <strong className={classes.bold}>Indicar nivel</strong>
                                                            <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                                        </div>
                                                        <Formsy
                                                            onValid={enableButton}
                                                            onInvalid={disableButton}
                                                            // className="w-full sm:w-1/2 md:w-1"
                                                        >
                                                            <TextFieldFormsy className={classes.textFieldNew} style={{ width: '100%' }} name="nivel" type='text' onClick={(e) => dataUser.level_school = e.target.value}/>
                                                        </Formsy>
                                                    </div>
                                                </div>                                        
                                            </div> 
                                        : 
                                            dataNumber === 1 ?
                                            <div>                                        
                                                <FormGroup style={{ fontFamily: 'Poppins', marginBottom: '25px', marginTop: '25px' }}>
                                                    <div style={{ paddingLeft: '30px' }} className="gridForm3">
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Primero" />} onClick={(e) => changeLevel(e.target.value)} label="Primero" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Segundo" />} onClick={(e) => changeLevel(e.target.value)} label="Segundo" />
                                                        <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Tercero" />} onClick={(e) => changeLevel(e.target.value)} label="Tercero" />
                                                    </div>      
                                                </FormGroup>
                                            </div>
                                            : dataNumber === 3 ? 
                                                    <FormGroup style={{ fontFamily: 'Poppins', marginBottom: '25px', marginTop: '25px' }}>
                                                        <div style={{ paddingLeft: '30px' }} className="gridForm3">
                                                            <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Primero" />} onClick={(e) => changeLevel(e.target.value)} label="Primero" />
                                                            <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Segundo" />} onClick={(e) => changeLevel(e.target.value)} label="Segundo" />
                                                            <FormControlLabel className={classes.checkbox} control={<Checkbox id="checked2" value="Tercero" />} onClick={(e) => changeLevel(e.target.value)} label="Tercero" />
                                                        </div>      
                                                    </FormGroup>                                            
                                            : null
                                    }           
                                    <Formsy
                                        onValid={enableButton}
                                        onInvalid={disableButton}
                                    >
                                        <div style={{ padding: '15px' }} className="gridForm">
                                            <div className={classes.child3}>
                                                <div style={{ display: 'flex' }}>
                                                    <strong className={classes.bold}>Crea un usuario</strong>
                                                    <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                                </div>
                                                <TextFieldFormsy name="username" className={classes.textField} type='email' onChange={(e) => dataUser.username = e.target.value} />
                                            </div>
                                            <div className={classes.child3}>
                                                <div style={{ display: 'flex' }}>
                                                    <strong className={classes.bold}>Crear contraseña</strong>
                                                    <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                                </div>
                                                <TextFieldFormsy type='password' onChange={(e) => dataUser.password = e.target.value}
                                                    name="password1"
                                                    updateImmediately
                                                    className={classes.textField}
                                                />
                                            </div>
                                            <div className={classes.child3}>
                                                <div style={{ display: 'flex' }}>
                                                    <strong className={classes.bold}>Confirma tu contraseña</strong>
                                                    <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                                </div>
                                                <TextFieldFormsy name="password2" type='password' onChange={(e) => dataUser.c_password = e.target.value}
                                                    validations='equalsField:password1'
                                                    validationError='Passwords do not match'
                                                    updateImmediately
                                                    className={classes.textField}
                                                />
                                            </div>
                                        </div>
                                    </Formsy>
                                    <div style={{ width: '100%', paddingLeft: '5%', paddingRight: '11%', paddingBottom: '4%' }}>
                                        <div style={{ display: 'flex', marginBottom: '1%' }}>
                                            <strong className={classes.bold}>Materias que impartes</strong>
                                            <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                        </div>                                    
                                        <TextareaAutosize name="textarea" onChange={(e) => dataUser.intereses = e.target.value} className={classes.textArea} style={{height: '100px'}}></TextareaAutosize>
                                    </div>                     
                                </div>
                            
                        </div>   
                    )}                    



                    <div style={{ marginTop: '4%', display: 'flex' }}>
                        <strong className={classes.bold}>Elige las opciones de tu interés</strong><br/>
                        <strong className={classes.bold} style={{ color: '#4457FF' }}>* (Esta información no afectará el tipo de membresía que elijas)</strong>
                    </div>  
                    {
                        matches ? (
                        <Formsy
                            onValid={enableButton}
                            onInvalid={disableButton}
                        >
                            <FormGroup style={{ fontFamily: 'Poppins' }}>
                                <div style={{ display: 'flex' }}>
                                    <FormControlLabel className={classes.checkbox} control={<Checkbox id='file' value="Todos" onClick={(e) => files("Todos", 1)} />} label="Todos" />
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <FormControlLabel className={classes.checkbox} control={<Checkbox id='file' key={key} value="Comunidad LIA" onClick={(e) => files("Comunidad LIA", 2)} />} label="Comunidad LIA" />
                                    <MuiThemeProvider theme={theme}>
                                        <Tooltip className={classes.messageTooltip} TransitionComponent={Zoom} id="tooltip" title={"Inspira, conecta y potencializa en nuestra comunidad Educativa Interactiva en línea de educación básica"} placement="right-end">
                                            <div className={classes.tooltip}>
                                                ?
                                            </div>
                                        </Tooltip>
                                    </MuiThemeProvider>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <FormControlLabel className={classes.checkbox} control={<Checkbox key={key} id='file' value="Cursos LIA U" onClick={(e) => files("Cursos LIA U", 3)} />} label="Cusos LIA U" />
                                    <MuiThemeProvider theme={theme}>
                                        <Tooltip TransitionComponent={Zoom} id='tooltip' title="Nuestra plataforma de cursos en línea, a tu ritmo, tiempo, aprende y desarrolla las habilidades necesarias para ser un super maestro." placement="right-end">
                                            <div className={classes.tooltip}>
                                                ?
                                            </div>
                                        </Tooltip>
                                    </MuiThemeProvider>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <FormControlLabel className={classes.checkbox} control={<Checkbox key={key} id='file' value="Certificación LIA docente Creador" onClick={(e) => files("Certificación LIA docente Creador", 4)} />} label="Certificación LIA docente Creador" />
                                    <MuiThemeProvider theme={theme}>
                                        <Tooltip TransitionComponent={Zoom} id='tooltip' title="Docente Creador Con esta certificación, podrás crear contenido para nuestra comunidad recibiendo el crédito como maestro creador LIA, imagina compartir tu trabajo con miles de personas." placement="right-end">
                                            <div className={classes.tooltip}>
                                                ?
                                            </div>
                                        </Tooltip>
                                    </MuiThemeProvider>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <FormControlLabel className={classes.checkbox} control={<Checkbox key={key} id='file' value="Instructor / Autor LIA U" onClick={(e) => files("Instructor / Autor LIA U", 5)} />} label="Instructor / Autor LIA U" />
                                    <MuiThemeProvider theme={theme}>
                                        <Tooltip TransitionComponent={Zoom} id='tooltip' title="Tus capacidades y habilidades llevadas al máximo, conviértete en un instructor LIA, en donde podrás subir tus cursos e impartirlos a nuestra comunidad en línea a maestros, papás, y público en general." placement="right-end">
                                            <div className={classes.tooltip}>
                                                ?
                                            </div>
                                        </Tooltip>
                                    </MuiThemeProvider>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <FormControlLabel className={classes.checkbox} control={<Checkbox key={key} id='file' value="Maestro Global Schooling" onClick={(e) => files("Maestro Global Schooling", 6)} />} label="Maestro Global Schooling" />
                                    <MuiThemeProvider theme={theme}>
                                        <Tooltip TransitionComponent={Zoom} id='tooltip' title="Únete al equipo de instructores global impartiendo clases a los alumnos de nuestra escuela en línea de primaria y secundaria." placement="right-end">
                                            <div className={classes.tooltip}>
                                                ?
                                            </div>
                                        </Tooltip>
                                    </MuiThemeProvider>
                                </div>
                            </FormGroup>
                        </Formsy> 
                        ): 
                        <Formsy
                            onValid={enableButton}
                            onInvalid={disableButton}
                        >
                        <FormGroup style={{ fontFamily: 'Poppins' }}>
                            <div style={{ display: 'flex'}}>
                                <FormControlLabel className={classes.checkbox} control={<Checkbox id='file' value="Todos" onClick={(e) => files("Todos", 1)} />} label="Todos" />
                            </div>
                            <div style={{ display: 'flex'}}>
                                <FormControlLabel className={classes.checkbox} control={<Checkbox id='file' value="Comunidad LIA" onClick={(e) => files("Comunidad LIA", 2)} />} label="Comunidad LIA"/>
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip className={classes.messageTooltip} TransitionComponent={Zoom} id="tooltip" title={"Inspira, conecta y potencializa en nuestra comunidad Educativa Interactiva en línea de educación básica"} placement="right-end">
                                        <div className={classes.tooltip2}>
                                            ?
                                        </div>
                                    </Tooltip>
                                </MuiThemeProvider>
                            </div>
                            <div style={{ display: 'flex'}}>
                                <FormControlLabel className={classes.checkbox} control={<Checkbox id='file' value="Cursos LIA U" onClick={(e) => files("Cursos LIA U", 3)} />} label="Cusos LIA U"/>
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip TransitionComponent={Zoom} id='tooltip' title="Nuestra plataforma de cursos en línea, a tu ritmo, tiempo, aprende y desarrolla las habilidades necesarias para ser un super maestro." placement="right-end">
                                        <div className={classes.tooltip2}>
                                            ?
                                        </div>
                                    </Tooltip>
                                </MuiThemeProvider>
                            </div>
                            <div style={{ display: 'flex'}}>
                                <FormControlLabel className={classes.checkbox} control={<Checkbox id='file' value="Certificación LIA docente Creador" onClick={(e) => files("Certificación LIA docente Creador", 4)} />} label="Certificación LIA docente Creador"/>
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip TransitionComponent={Zoom} id='tooltip' title="Docente Creador Con esta certificación, podrás crear contenido para nuestra comunidad recibiendo el crédito como maestro creador LIA, imagina compartir tu trabajo con miles de personas." placement="right-end">
                                        <div className={classes.tooltip2} style={{ width: '24px' }}>
                                            ?
                                        </div>
                                    </Tooltip>
                                </MuiThemeProvider>
                            </div>
                            <div style={{ display: 'flex'}}>
                                <FormControlLabel className={classes.checkbox} control={<Checkbox id='file' value="Instructor / Autor LIA U" onClick={(e) => files("Instructor / Autor LIA U", 5)} />} label="Instructor / Autor LIA U"/>
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip TransitionComponent={Zoom} id='tooltip' title="Tus capacidades y habilidades llevadas al máximo, conviértete en un instructor LIA, en donde podrás subir tus cursos e impartirlos a nuestra comunidad en línea a maestros, papás, y público en general." placement="right-end">
                                        <div className={classes.tooltip2}>
                                            ?
                                        </div>
                                    </Tooltip>
                                </MuiThemeProvider>
                            </div>
                            <div style={{ display: 'flex'}}>
                                <FormControlLabel className={classes.checkbox} control={<Checkbox id='file' value="Maestro Global Schooling" onClick={(e) => files("Maestro Global Schooling", 6)} />} label="Maestro Global Schooling"/>
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip TransitionComponent={Zoom} id='tooltip' title="Únete al equipo de instructores global impartiendo clases a los alumnos de nuestra escuela en línea de primaria y secundaria." placement="right-end">
                                        <div className={classes.tooltip2}>
                                            ?
                                        </div>
                                    </Tooltip>
                                </MuiThemeProvider>
                            </div>
                        </FormGroup>
                    </Formsy> 
                    }
                                             
                    <div style={{ marginTop: '3%' }}>
                        <strong className={classes.bold} style={{ color: '#4457FF' }}>VALIDACION</strong><br/>
                        <strong className={classes.bold}>
                            La seguridad es muy importante para nosotros, queremos que formes parte de nuestra comunidad.<br/>
                            Por favor, compártenos al menos <strong style={{ color: '#4457FF' }}>3 documentos</strong> de tu elección que te acrediten como maestro para poderte autorizar.
                        </strong>                    
                    </div>                
                    <div style={{ marginBottom: '3%', marginTop: '2%' }}>
                        <strong className={classes.bold}>
                            Documento (Formatos permitidos: .pdf, .jpg, .png, .jpeg. Máximo 3 archivos)
                        </strong>
                        <div className={classes.child3} id="divFile" style={{ marginTop: '2%', marginBottom: '2%' }}>
                            <div id='container'>
                                <div id='child' style={{ display: 'flex' }}>
                                    <div>
                                        <input
                                            style={{ display: 'none' }}
                                            id="raised-button-file"
                                            type="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            accept="image/*"
                                        />
                                        <label htmlFor="raised-button-file">
                                            <Button className={classes.textFieldButton} component="span" style={{ color: file ? '#353535' : '#A2A2A2' }}>
                                                {file ? file.name : 'Examinar'}
                                            </Button>
                                        </label>
                                    </div>
                                    <div>
                                        <Button onClick={(e) => setNewSelectedFile(file)} className={clsx(classes.buttonFill, classes.buttonSubir)} disabled={bandera1 === true || file === '' ? true : false}>Subir</Button>
                                    </div>
                                    
                                </div>
                            </div>
                            <div id='container2' style={{ display: 'none' }}>
                                <div id='child' style={{ display: 'flex' }}>
                                    <div>
                                        <input
                                            style={{ display: 'none' }}
                                            id="raised-button-file2"
                                            type="file"
                                            onChange={(e) => setFile2(e.target.files[0])}
                                            accept="image/*"
                                        />
                                        <label htmlFor="raised-button-file2">
                                            <Button className={classes.textFieldButton} component="span" style={{ color: file2 ? '#353535' : '#A2A2A2' }}>
                                                {file2 ? file2.name : 'Examinar'}
                                            </Button>
                                        </label>
                                    </div>
                                    <div>
                                        <Button onClick={(e) => setNewSelectedFile(file2)} className={clsx(classes.buttonFill, classes.buttonSubir)} disabled={bandera2 === true || file2 === '' ? true : false}>Subir</Button>
                                    </div>
                                </div>
                            </div>
                            <div id='container3' style={{ display: 'none' }}>
                                <div id='child' style={{ display: 'flex' }}>
                                    <div>
                                        <input
                                            style={{ display: 'none' }}
                                            id="raised-button-file3"
                                            type="file"
                                            onChange={(e) => setFile3(e.target.files[0])}
                                            accept="image/*"
                                        />
                                        <label htmlFor="raised-button-file3">
                                            <Button className={classes.textFieldButton} component="span" style={{ color: file3 ? '#353535' : '#A2A2A2' }}>
                                                {file3 ? file3.name : 'Examinar'}
                                            </Button>
                                        </label>
                                    </div>
                                    <div>
                                        <Button onClick={(e) => setNewSelectedFile(file3)} className={clsx(classes.buttonFill, classes.buttonSubir)} disabled={bandera3 === true || file3 === '' ? true : false}>Subir</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.child3} id="agregar">
                            <button className={clsx(classes.buttonFill, classes.buttonPlus)} type="file" onClick={newFile}><Add></Add></button>
                            <strong className={classes.text}>Anadir otro archivo</strong>
                        </div>                        
                    </div>
                    <div id="dataInputForm">                        
                        <FormGroup style={{ fontFamily: 'Poppins', marginTop: '2%' }}>
                            <RadioGroup
                                defaultValue="Título profesional"
                                style={{ fontFamily: 'Poppins', display: 'flex'}}
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group-2"
                            >
                                <FormControlLabel value='1' className={classes.checkbox} control={<Checkbox id='checked' value="Título profesional"/>} onClick={(e) => changeDocument(e.target.value)} label="Título profesional" />
                                <FormControlLabel value='2' className={classes.checkbox} control={<Checkbox id='checked' value="Cédula" />} onClick={(e) => changeDocument(e.target.value)} label="Cédula" />                                
                                <FormControlLabel value='3' className={classes.checkbox} control={<Checkbox id='checked' value="Certificado" />} onClick={(e) => changeDocument(e.target.value)} label="Certificado"/>                                
                                <FormControlLabel value='4' className={classes.checkbox} control={<Checkbox id='checked' value="Credencial actual o carta de trabajo" />} onClick={(e) => changeDocument(e.target.value)} label="Credencial actual o carta de trabajo"/>                                
                                <FormControlLabel value='5' className={classes.checkbox} control={<Checkbox id='checked' value="Certificaciones u otros documentos"/>} onClick={(e) => changeDocument(e.target.value)} label="Certificaciones u otros documentos"/>                                
                                <FormControlLabel value='6' className={classes.checkbox} control={<Checkbox id='checked' value="CV" />} onClick={(e) => changeDocument(e.target.value)} label="CV"/>                                
                            </RadioGroup>
                        </FormGroup>
                    </div>  
                    <div className={ !matches ? "flex termsH flex-wrap flex-col terms pt-40 justify-left align-center items-center mb-28" : "flex termsH flex-wrap flex-col w-full pt-40 justify-left align-center items-center mb-28"}>
                        <div className="flex flex-wrap flex-col w-full pt-40 justify-left sm:w-1 md:w-1/3">
                            <div className={classes.child2} style={{ marginBottom: '0% !important' }}>
                                <strong className={classes.bold} style={{ color: '#4457FF' }}>*</strong>
                                <strong className={classes.bold}>Campos obligatorios</strong>
                            </div>
                            <div className={classes.label} style={{width: '130%'}}>
                                <Checkbox id="abilitar1" onClick={check} required></Checkbox>He leído y acepto los
                                <a href={process.env.REACT_APP_BRANDING_PAGE + '/terminos-y-condiciones/'}
                                    target="_blank"
                                    underline='hover'
                                    style={{ backgroundColor: 'transparent', color: '#5667ff', border: 0 }}
                                    disableRipple> Términos y condiciones</a>
                            </div>
                            <div className={classes.label} style={{width: '108%'}}>
                                <Checkbox id="abilitar2" onClick={check} required></Checkbox>He leído y acepto el
                                <a href={process.env.REACT_APP_BRANDING_PAGE + '/politicas-de-privacidad/'}
                                    target="_blank"
                                    underline='hover'
                                    style={{ backgroundColor: 'transparent', color: '#5667ff', border: 0 }}
                                    disableRipple> Aviso de privacidad</a>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button className={clsx(classes.buttonFill, classes.button)} style={{width: '150px'}} disabled={button === false && validatesForm === true ? false : true} onClick={handleSubmit}>Continuar</Button>
                        </div>
                    </div>
                
            </div>
        </>
    )
}