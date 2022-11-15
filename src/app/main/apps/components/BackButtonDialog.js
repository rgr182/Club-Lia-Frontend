import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogContent, Icon} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
    buttonCancelar: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        borderRadius: "45px",
        background: "transparent",
        color: "#FF2F54",
        height: "35px",
        marginTop: "8px",
        marginRight: "7px",
        border: "solid #FF2F54 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        textTransform: 'none',
        '&:hover': {
            background: "#FF2F54",
            color: "#fff",
            borderColor: "#FF2F54",

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
    iconYellow: {
        fontSize: '80px',
        color: '#F4B335'
    },
    dialogFont: {
        fontSize: '20px',
        color: '#00B1FF',
        fontFamily: 'Poppins'
    },
}));

function BackButtonDialog(props) {

    const classes = useStyles(props);

    return (
        <Dialog classes={{ paper: 'm-24 rounded-8' }} open={props.openBackDialog} onClose={() => props.setOpenBackDialog(false)} maxWidth="sm">
            <DialogContent classes={{ root: 'p-40' }}>
                <div className="flex">
                    <div className="pr-20 ">
                        <Icon className={classes.iconYellow}>report_problem_outlined</Icon>
                    </div>
                    <div className={classes.dialogFont}>
                        ¿Seguro que deseas salir de esta pantalla? Si no guardas los cambios, se perderá toda la información
                    </div>
                </div>
                <div className="flex px-80 pt-10">
                    <Button className={clsx(classes.button, classes.buttonFill)} onClick={() => props.setOpenBackDialog(false)}>Seguir editando</Button>
                    <Button className={classes.buttonCancelar} onClick={() => props.goBack()}>Salir</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default BackButtonDialog;
