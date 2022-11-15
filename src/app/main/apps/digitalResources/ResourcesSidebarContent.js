import FuseAnimate from '@fuse/core/FuseAnimate';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import {useDeepCompareEffect, useForm} from "../../../../@fuse/hooks";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {setResourcesFilter} from "./store/filterSlice";
import {  getResources } from './store/resourcesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from "@material-ui/core/Button";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { TreeItem, TreeView } from '@material-ui/lab';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	formControl:{
		width:'95%',
		margin: 5,
		height:53
	},
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	},
	label: {
		fontFamily: 'Poppins',
		color: '#353535',
		fontSize: '11px'
	},
	select: {
		alignContent: "left",
		textAlign: "left",
		width: "100%",
		marginTop: "8px",
		marginRight: "7px",
		'& .MuiSelect-select': {
			borderRadius: "10px",
			background: "transparent",
			color: "#353535",
			height: "18px",
			border: "solid #BEBEBE 3px",
			fontFamily: 'Poppins',
			padding: '6px 3px',
			fontFamily: 'Poppins',
			'&:before, &:after, &:focus': {
				backgroundColor: 'transparent',
				border: "solid #BEBEBE 3px",
				content: 'none'
			},
			'&:hover': {
				border: "solid #00B1FF 3px",
			},
		},
		'& .Mui-focused': {
			borderColor: "#00B1FF"
		},
		'& .MuiInput-underline': {
			'&:before, &:after, &:focus, &:hover': {
				borderColor: 'transparent'
			},
		},
		'&:before, &:after, &:focus': {
			border: 'transparent',
			content: 'none'
		},
	},
	treeView: {
		'& .MuiTreeItem-group': {
			marginLeft: '0'
		}
	},
	textField: {
		width: "100%",
		height: "35px",
		marginTop: "8px",
		alignContent: "left",
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
		'& .MuiInput-underline': {
			'&:before, &:after, &:focus, &:hover, &:focus-visible': {
				borderColor: 'transparent',
			},
		},
		'& ::-webkit-calendar-picker-indicator': {
			filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
		},
		'& .MuiInput-inputMultiline': {
			padding: '5px 3px',
		},
	},
	colorPlaceholder: {
		"& input::placeholder": {
			color: '#353535',
			opacity: '1',
		}
	},
	warnig: {
		fontFamily: "Poppins",
		fontSize: "13px",
		color: "#BEBEBE"
	},
	title1: {
		color: '#00B1FF',
		fontFamily: `'grobold', 'rager'`,
		fontSize: '25px'
	},
}));
const defaultFormState = {
	id_materia_base: '',
	grade: '',
	level: '',
	id_category : '',
	bloque: ''
};


function ResourcesSidebarContent(props) {

	const dispatch = useDispatch();
	const categories = useSelector(({ ResourcesApp }) => ResourcesApp.categories.data);
	const subjects = useSelector(({ ResourcesApp }) => ResourcesApp.subjects.data);
	const {form, setForm, handleChange} = useForm(defaultFormState);
	const [inputValue, setInputValue] = React.useState('');
	const [value, setValue] = React.useState('');
	const classes = useStyles(props);
	const role = useSelector(({ auth }) => auth.user.role);
	var limited = false;
	if (role === 'Maestro-M' || role === 'Maestro-I' || role === 'Maestro-A') {
		limited = true;
	}

	dispatch(setResourcesFilter(form));
	useDeepCompareEffect(() => {
		dispatch(getResources());
	}, [dispatch,form]);
	function handleFilterClean(){
		setForm({defaultFormState})
		setValue({value: ''})
		setInputValue({inputValue: ''})
		dispatch(getResources());
	}
	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
				
			 <Grid container>
				<Grid item xs={12} className="text-center">
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<h2 className={classes.title1}>Actividades LIA</h2>
					</FuseAnimate>
				</Grid>
			</Grid>

			<Grid className='divFiltros pt-20'>
				<TreeView
					aria-label="file system navigator"
					defaultCollapseIcon={<Icon>expand_less</Icon>}
					defaultExpandIcon={<Icon>expand_more</Icon>}
					className={clsx("treeView flex flex-1", classes.treeView)}
					defaultExpanded={['1']}
				>
					<TreeItem nodeId="1" label="Filtros" className="elementosFilter w-full">
						<div className='flex flex-wrap w-full py-16'>
							<div className="w-full sm:w-1 md:w-1/2 lg:pr-24 pt-10">
								<>
									<InputLabel className={classes.label}>Por tipo</InputLabel>
									{categories ? (
										categories.length > 0 ?
										<Select
											id="id_category"
											name="id_category"
											value={form.id_category || ''}
											onChange={handleChange}
											className={classes.select}
											displayEmpty
										>
											<MenuItem className='poppins' key={0} value={''}>Todas las categorías</MenuItem>
											{categories.map((row) => (
												<MenuItem className='poppins' key={row.id} value={row.id}>{row.name}</MenuItem>
											))}
										</Select>
										:
										<Typography className={clsx(classes.warnig, 'pt-20')}>
											No se han encontrado categorías
										</Typography>
									) : (
										<Typography variant="h4" ><Skeleton /></Typography>
									)}
								</>
							</div>
							<div className="w-full sm:w-1 md:w-1/2 lg:pl-24 pt-10">
								<InputLabel className={classes.label}>Por bloque</InputLabel>
								<Select
									id="bloque"
									name="bloque"
									value={form.bloque || ''}
									onChange={handleChange}
									className={classes.select}
									displayEmpty
								>
									<MenuItem className='poppins' key={'todos'} value={''}>Todas los bloques</MenuItem>
									<MenuItem className='poppins' key={'bloque1'} value={1}>1</MenuItem>
									<MenuItem className='poppins' key={'bloque2'} value={2}>2</MenuItem>
									<MenuItem className='poppins' key={'bloque3'} value={3}>3</MenuItem>
								</Select>
							</div>
							<div className="w-full sm:w-1 md:w-1/2 lg:pr-24 pt-10">
								<>
									<InputLabel className={classes.label}>Por materia</InputLabel>
									{subjects ? (
										subjects.length > 0 ?
											
											<Autocomplete
												id="id_materia_base"
												name="id_materia_base"
												value={value || ''}
												onChange={(event, newValue) => {
													setValue(newValue);
													event.target.name = 'id_materia_base';
													event.target.value = newValue.id;
													handleChange(event);
												}}
												disableClearable={true}
												className={classes.select}
												inputValue={inputValue}
												onInputChange={(event, newInputValue) => {
													setInputValue(newInputValue);
												}}
												options={subjects}
												getOptionLabel={(option) => option.name}
												InputProps={{ disableUnderline: true }}
												classes={{ listbox: 'paginationfont text-14', groupUl: 'paginationfont text-14', noOptions: 'poppins'}}
												noOptionsText='No hay opciones'
												renderInput={(params) => 
													<TextField 
														{...params} 
														name="id_materia_base" 
														classes={{ root: classes.colorPlaceholder }}
														placeholder='Todas las materias'
														className={clsx("mt-0", classes.textField)} 
														InputProps={{...params.InputProps, disableUnderline: true}}
													/>
												}
											/>
											:
											<Typography className={clsx(classes.warnig, 'pt-12')}>
												No se han encontrado materias
											</Typography>
									) : (
										<Typography variant="h4" ><Skeleton /></Typography>
									)}
								</>
							</div>
							<div className="w-full sm:w-1 md:w-1/4 lg:px-24 pt-10">
								<InputLabel className={classes.label}>Por nivel</InputLabel>
								<Select
									id="level"
									name="level"
									value={form.level || ''}
									onChange={handleChange}
									className={classes.select}
									displayEmpty
								>
									<MenuItem className='poppins' key={'level0'} value={''}>Todos los niveles</MenuItem>
									<MenuItem className='poppins' key={'level1'} value={1}>Preescolar</MenuItem>
									<MenuItem className='poppins' key={'level2'} value={2}>Primaria</MenuItem>
									<MenuItem className='poppins' key={'level3'} value={3}>Secundaria</MenuItem>
								</Select>
							</div>
							<div className="w-full sm:w-1 md:w-1/4 lg:pl-24 pt-10">
								<InputLabel className={classes.label}>Por grado</InputLabel>
								<Select
									id="grade"
									name="grade"
									value={form.grade || ''}
									onChange={handleChange}
									className={classes.select}
									displayEmpty
								>
									<MenuItem className='poppins' key={'grade0'} value={''}>Todos los grados</MenuItem>
									<MenuItem className='poppins' key={'grade1'} value={1}>1</MenuItem>
									<MenuItem className='poppins' key={'grade2'} value={2}>2</MenuItem>
									<MenuItem className='poppins' key={'grade3'} value={3}>3</MenuItem>
									<MenuItem className='poppins' key={'grade4'} value={4}>4</MenuItem>
									<MenuItem className='poppins' key={'grade5'} value={5}>5</MenuItem>
									<MenuItem className='poppins' key={'grade6'} value={6}>6</MenuItem>
								</Select>
							</div>
						</div> 
					</TreeItem>
					<Button
						className="btnLimpiar"
						onClick={handleFilterClean}
						style={{
							position: 'absolute',
							right: 0,
							top: 15,
							width: '124px'
						}}
					>
						Limpiar filtros
					</Button>
				</TreeView>
			</Grid>
		</div>
	);
}

export default ResourcesSidebarContent;
