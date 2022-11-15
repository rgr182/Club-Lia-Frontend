import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "../../../../store/fuse/messageSlice";
import { closeSuccessDialog } from '../store/profileParentSlice';
import axios from 'axios';
import {
	makeStyles,
	Dialog,
	DialogContent,
	Toolbar,
	AppBar,
	IconButton,
	Icon,
	Button,
	CircularProgress,
	Typography,
	Tooltip,
	Card
} from '@material-ui/core';
import clsx from 'clsx';

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
		borderRadius: "45px",
		background: "transparent",
		color: theme.palette.primary.main,
		height: "35px",
		marginTop: "8px",
		marginRight: "7px",
		border: "solid " + theme.palette.primary.main + " 3px",
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',
		'&:hover': {
			background: theme.palette.primary.light,
			color: "#fff",
			borderColor: theme.palette.primary.light,

		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5',
		}
	},
	buttonFill: {
		background: theme.palette.primary.light,
		color: "#fff",
		border: "solid " + theme.palette.primary.light + " 3px",
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			borderColor: theme.palette.primary.main,
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5',
		}
	},
	section: {
		width: 200,
		'@media max-width: 400': {
			width: 300,
		},
		'@media orientation: landscape': {
			width: 400,
		},
	},
	closeButton: {
		color: theme.palette.primary.main,
		fontWeight: 'bold'
	}
}));

function SuccessDialog(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const successDialog = useSelector(({ ProfileApp }) => ProfileApp.profileParent.successDialog);

	function closeComposeDialog() {
		return dispatch(closeSuccessDialog());
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...successDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full justify-between">
					<div className="flex w-full text-between items-between justify-between">
						<Typography className={clsx(classes.titleDialog, 'truncate ...')} color="inherit">
							Usuario creado exitosamente
						</Typography>
						<IconButton style={{ backgroundColor: '#fff' }} onClick={closeComposeDialog} size="small">
							<Icon className={classes.closeButton}>close</Icon>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: 'p-24' }} className='text-center items-center justify-center poppins py-40' >
				{(successDialog.props.open && successDialog.data) &&
					<>
						<div className='text-center items-center justify-center poppins text-center'>
							El usuario ha sido creado exitosamente <br />
							Usuario:  <strong>{successDialog.data.username}</strong><br />
							Contraseña: <strong>{successDialog.data.password}</strong><br />
						</div>

						<Button className={clsx(classes.button, classes.buttonFill, 'w-160 mt-32')} onClick={closeComposeDialog}>
							Cerrar
						</Button>
					</>
				}
			</DialogContent >
		</Dialog >
	);
}

export default SuccessDialog;
