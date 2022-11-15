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
    buttonRed: {
        color: "#FF2F54",
        border: "solid #FF2F54 3px",
        '&:hover': {
            background: "#FF2F54",
            borderColor: "#FF2F54",
        },
    },
    iconRed: {
        fontSize: '80px',
        color: '#FF2F54'
    },
    dialogFont: {
        fontSize: '20px',
        color: '#353535',
        fontFamily: 'Poppins'
    },
}));

function DeleteButtonDialog(props) {

    const classes = useStyles(props);

    return (
        <Dialog classes={{ paper: 'm-24 rounded-8' }} open={props.openDeleteDialog} onClose={() => props.setOpenDeleteDialog(false)} maxWidth="sm">
            <DialogContent classes={{ root: 'p-40' }}>
                <div className="flex">
                    <div className="pr-20 ">
                        <Icon className={classes.iconRed}>error_outline_outlined</Icon>
                    </div>
                    <div className={classes.dialogFont}>
                        ¿Seguro que deseas eliminar {props.texto}? Ya no será posible recuperar los datos.
                    </div>
                </div>
                <div className="flex px-160 pt-10">
                    <Button className={clsx(classes.button, classes.buttonRed)} onClick={props.handleRemove}>Eliminar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteButtonDialog;
