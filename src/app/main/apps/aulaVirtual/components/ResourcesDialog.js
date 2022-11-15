import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import clsx from 'clsx';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {showMessage} from "../../../../store/fuse/messageSlice";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
// import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
// import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link, useParams } from 'react-router-dom';
import { openResourceDialog, closeResourceDialog } from '../store/resourcesSlice';
import { addResource, getNonPlannedResources } from '../store/nonPlannedResourcesSlice';



const useStyles = makeStyles(theme => ({
    Text: {
		fontFamily:  ({ nivel }) => nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`,
		fontSize: ({ nivel }) => nivel == 2 ? "30px" : "22px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	textclose: {
		color: 'white'
	},
	imgIcon: {
		height: '50px'
	},
	buttonText: {
		fontSize: "25px",
		color: 'white',
		textShadow: '2px 2px 2px black',
    },
	item: ({ nivel }) => nivel == 2 ? {
		fontFamily: 'haettenschweilerRegular',
		fontSize: '20px'
	} : {
		fontFamily: `'grobold', 'rager'`,
		fontSize: '14px'

	}
	
}));

function ResourcesDialog(props) {
    const dispatch = useDispatch();
	const resources = useSelector(({AulaVirtualApp}) => AulaVirtualApp.resources.data);
    const resourceDialog = useSelector(({AulaVirtualApp}) => AulaVirtualApp.resources.resourceDialog);
	const role = useSelector(({ auth }) => auth.user.role);
	const [bloque, setBloque] = useState(0);
	const [gradeFilter, setGradeFilter] = useState(0);
	const [materia, setMateria] = useState(0);
	const routeParams = useParams();
	const [filteredData, setFilteredData] = useState([]);
	const npresource = useSelector(({AulaVirtualApp}) => AulaVirtualApp.npresources.npresource);
	const subjects = useSelector(({AulaVirtualApp}) => AulaVirtualApp.subjects.data);
	

	const [values, setValues] = React.useState({
		loading : false
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);
	const classes = useStyles();

	function filter(event) {
		setBloque(event.target.value);
    }
	function filterGrade(event) {
		setGradeFilter(event.target.value);
    }
	function filterMateria(event) {
		setMateria(event.target.value);
    }
	

	function disableButton() {
		setIsFormValid(false);
	}

	useEffect(() => { setFilteredData(resources)}, [resources] );

	useEffect(() => {
		if(resources != null){
			setFilteredData(resources.filter(obj => bloque > 0 ? obj.bloque == bloque : obj)
			.filter(obj => gradeFilter > 0 ? obj.grade == gradeFilter : obj)
			.filter(obj => materia > 0 ? obj.id_materia_base == materia : obj));
		}
	}, [bloque, gradeFilter, materia]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (resourceDialog.props.open) {
			// initDialog();
		}
	}, [resourceDialog.props.open]);

	useEffect(() => {
		if (npresource.error) {

			dispatch(showMessage({message: 'Error al agregar recurso.', variant: 'error'}));
			setValues({ loading: false });
		}

		if(npresource.success){
			setValues({ ...values, loading: false });
			dispatch(showMessage({message:'Operación exitosa!',variant: 'success'	}));
			dispatch(getNonPlannedResources(routeParams));
			closeComposeDialog();
		}
	}, [npresource.error,npresource.success]);
    
	function closeComposeDialog() {
        return ( dispatch(closeResourceDialog() ));
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();		
	}

	function submitAddResource(resourcedata) {

		setValues({ loading: true });

		let values = {
			calendar_id: routeParams.calendar,
			meeting_id: routeParams.id,
			resource_id: resourcedata.id,

		};
        dispatch(addResource(values));
    }

	function enableButton() {
		setIsFormValid(true);
	}
	function validateForm (values) {
		// setForm(values);
	}
	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...resourceDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="sm"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full justify-center">
					<Typography ariant="h6" color="inherit" className="pt-8">
						Agregar Recurso
					</Typography>
				</Toolbar>
			</AppBar>
			<Formsy
				onValidSubmit={handleSubmit}
				onChange={validateForm}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col md:overflow-hidden"
			>
				<DialogContent classes={{ root: 'p-18' }}>

					<div id="container" className={"w-full flex-row flex-wrap"}>
						<FormControl className={clsx(classes.borde, "flex-wrap flex-row p-50 m-6")} variant="outlined">
							<Select id="bloque" name="bloque" InputLabelProps={{ shrink: false }} value={bloque} onChange={filter} style={{ backgroundColor: "rgb(255, 255, 255, 0.4)" }}>
								<MenuItem className={clsx(classes.item)} key={'bloque1'} value={0}>Todos</MenuItem>
								<MenuItem className={clsx(classes.item)} key={"bloque1"} value={1}>Bloque 1</MenuItem>
								<MenuItem className={clsx(classes.item)} key={"bloque2"} value={2}>Bloque 2</MenuItem>
								<MenuItem className={clsx(classes.item)} key={"bloque3"} value={3}>Bloque 3</MenuItem>
							</Select>
						</FormControl >

						<FormControl className={clsx(classes.borde, " flex-wrap flex-row p-50 m-6")} variant="outlined">
							<Select id="grade" name="grade" InputLabelProps={{ shrink: false }} value={gradeFilter} onChange={filterGrade} style={{ backgroundColor: "rgb(255, 255, 255, 0.4)" }}>
								<MenuItem className={clsx(classes.item)} key={'grade0'} value={0}>Grado</MenuItem>
								<MenuItem className={clsx(classes.item)} key={'grade1'} value={1}>1°</MenuItem>
								<MenuItem className={clsx(classes.item)} key={'grade2'} value={2}>2°</MenuItem>
								<MenuItem className={clsx(classes.item)} key={'grade3'} value={3}>3°</MenuItem>
								<MenuItem className={clsx(classes.item)} key={'grade4'} value={4}>4°</MenuItem>
								<MenuItem className={clsx(classes.item)} key={'grade5'} value={5}>5°</MenuItem>
								<MenuItem className={clsx(classes.item)} key={'grade6'} value={6}>6°</MenuItem>
							</Select>
						</FormControl >

						{subjects && subjects.length > 0 ?
							<FormControl className={clsx(classes.borde, " flex-wrap flex-row p-50 m-6")} variant="outlined">
								<Select id="materia" name="materia" InputLabelProps={{ shrink: false }} value={materia} onChange={filterMateria} style={{ backgroundColor: "rgb(255, 255, 255, 0.4)" }}>
									<MenuItem className={clsx(classes.item)} value={0}>Materia</MenuItem>
									{subjects.map((row) => (
										<MenuItem className={clsx(classes.item)} key={row.id} value={row.id}>{row.name}</MenuItem>
									))
									}
								</Select>
							</FormControl>
							:
							<CircularProgress color="secondary" />
						}
					</div>

					{filteredData && filteredData.length > 0 ?
						<>
							{filteredData.map((row) => (

								<div className="flex w-full flex-wrap flex-row" >
									<Button
										disableRipple
										style={{
											backgroundColor: 'transparent',
											textTransform: 'none',
											borderBottom: 'none'
										}}
										onClick={() => submitAddResource(row)}
										disabled={values.loading}
										target="_blank"
										type="button"
									>
										<img
											className={clsx(classes.imgIcon)}
											src={'assets/images/resources/iconos/' + row.category_name.replace('ó', 'o').replace('á', 'a') + '.svg'} />
										<Typography color="inherit" className="pt-8 pl-8">
											{row.name}
										</Typography>
									</Button>
								</div>
							))}
						</>
						:
						<Typography variant="h6" color="inherit" className="pt-8">
							No hay recursos
						</Typography>
					}
					{values.loading && <LinearProgress />}

				</DialogContent>
                
			</Formsy>
			{ values.loading ?
					<DialogContent classes={{ root: 'p-8' }}>
						<div className="px-16">
							<LinearProgress color="secondary" />
						</div>
					</DialogContent>
					: null
				}
		</Dialog>
	);
}

export default ResourcesDialog;
