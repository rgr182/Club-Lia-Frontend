import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeItem,
	updateItem,
	addItem,
	closeNewItemDialog,
	closeEditItemDialog
} from './store/itemSlice';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import { showMessage } from "../../../store/fuse/messageSlice";
import clsx from 'clsx';

const defaultFormState = {
	id: '',
	School: '',
	Description: '',
	Admin: '',
	IsActive: false,
};

const useStyles = makeStyles(theme => ({
	closeButton: {
		color: theme.palette.primary.main,
		fontWeight: 'bold'
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
	buttonRed: {
        color: "#FF2F54",
        border: "solid #FF2F54 3px",
        '&:hover': {
            background: "#FF2F54",
            borderColor: "#FF2F54",
        },
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
}));

function ItemDialog(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const itemDialog = useSelector(({ schoolsApp }) => schoolsApp.items.itemDialog);
	const school = useSelector(({ schoolsApp }) => schoolsApp.items.school);
	const [toDelete, setToDelete] = React.useState(false);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const [values, setValues] = React.useState({
		showPassword: false,
		loading: false
	});
	const initDialog = useCallback(() => {
		setToDelete(false);
		/**
		 * Dialog type: 'edit'
		 */
		if (itemDialog.type === 'edit' && itemDialog.data) {
			setForm({ ...itemDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (itemDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...itemDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [itemDialog.data, itemDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (itemDialog.props.open) {
			initDialog();
		}
	}, [itemDialog.props.open, initDialog]);
	useEffect(() => {
		if (school.error) {
			setValues({ ...values, loading: false });
			dispatch(showMessage({ message: school.error?.response?.data?.message || 'Ya existe una escuela con ese nombre', variant: 'error' }));
		}

		if (school.success) {
			setValues({ ...values, loading: false });
			dispatch(showMessage({ message: school.response?.data?.message || 'La escuela se añadió satisfactoriamente!', variant: 'success' }));
			closeComposeDialog();
		}
	}, [school.error, school.success]);

	function closeComposeDialog() {
		return itemDialog.type === 'edit' ? dispatch(closeEditItemDialog()) : dispatch(closeNewItemDialog());
	}

	function canBeSubmitted() {
		return itemDialog.type === 'edit' ? form.School.length > 0 : form.School.length > 0 && form.Admin.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (itemDialog.type === 'new') {
			dispatch(addItem(form));
		} else {
			dispatch(updateItem(form));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(removeItem(form.id));
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...itemDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full justify-between">
					<div className="flex w-full text-between items-between justify-between">
						<Typography variant="subtitle1" color="inherit">
							{toDelete ? 'Eliminar escuela' : itemDialog.type === 'new' ? 'Nueva Escuela' : 'Editar Escuela'}
						</Typography>
						<IconButton style={{ backgroundColor: '#fff' }} onClick={() => closeComposeDialog()} size="small">
							<Icon className={classes.closeButton}>close</Icon>
						</IconButton>
					</div>
				</Toolbar>
				{!toDelete &&
					<div className="flex flex-col items-center justify-center pb-24">
						{itemDialog.type === 'edit' && (
							<Typography variant="h6" color="inherit" className="pt-8">
								{form.School}
							</Typography>
						)}
					</div>
				}
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				{toDelete ?
					<>
						<DialogContent classes={{ root: 'p-24 px-40' }}>
							<div>
								<div className="flex w-full pb-20 items-center justify-center">
									<Icon style={{ fontSize: '60px', color: '#F8CA27' }}>report_problem_outlined</Icon>
								</div>
								<div style={{ fontSize: '16px' }} className="flex pb-20 w-full items-center justify-center poppins">
									¿Seguro que deseas eliminar la escuela? Ya no será posible recuperar la información de los usuarios relacionados con ella.
								</div>
							</div>
						</DialogContent>
						<DialogActions className="justify-center pt-0 p-40">
							<div className="pr-10">
								<Button
									className={clsx(classes.button, classes.buttonRed, 'px-20')}
									onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); setToDelete(false); }}
								>
									Cancelar
								</Button>
							</div>
							<div className="pl-10">
								<Button
									className={clsx(classes.button, classes.buttonFill, 'px-24')}
									onClick={handleRemove}
								>
									Eliminar
								</Button>
							</div>
						</DialogActions>
					</>
					:
					<>
						<DialogContent classes={{ root: 'p-24' }}>
							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">domain</Icon>
								</div>

								<TextField
									className="mb-24"
									label="Nombre"
									autoFocus
									id="School"
									name="School"
									value={form.School}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
							</div>

							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">work</Icon>
								</div>
								<TextField
									className="mb-24"
									label="Descripción"
									id="Description"
									name="Description"
									value={form.Description}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>
							{itemDialog.type === 'new' && (
								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">mail</Icon>
									</div>
									<TextField
										className="mb-24"
										validations="isEmail"
										validationErrors={{
											isEmail: 'Email invalido.'
										}}
										label="Administrador"
										id="Admin"
										name="Admin"
										value={form.Admin}
										onChange={handleChange}
										variant="outlined"
										required
										fullWidth
									/>
								</div>
							)}
							<FormControl variant="outlined" >
								<FormControlLabel
									control={
										<Switch checked={form.IsActive}
											name="IsActive"
											onChange={(event, newValue) => {
												event.target.name = 'IsActive';
												event.target.value = newValue;
												handleChange(event);
											}}
										/>}
									label="Estatus"
								/>
							</FormControl>
						</DialogContent>

						{itemDialog.type === 'new' ? (
							<DialogActions className="justify-between p-8">
								<div className="px-16">
									<Button
										variant="contained"
										color="primary"
										onClick={handleSubmit}
										type="submit"
										disabled={!canBeSubmitted()}
									>
										Agregar
									</Button>
								</div>
							</DialogActions>
						) : (
							<DialogActions className="justify-between p-8">
								<div className="px-16">
									<Button
										variant="contained"
										color="primary"
										type="submit"
										onClick={handleSubmit}
										disabled={!canBeSubmitted()}
									>
										Guardar
									</Button>
								</div>
								<IconButton onClick={() => setToDelete(true)}>
									<Icon>delete</Icon>
								</IconButton>
							</DialogActions>
						)}
					</>
				}
			</form>
		</Dialog>
	);
}

export default ItemDialog;
