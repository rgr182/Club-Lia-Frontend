import FuseAnimate from '@fuse/core/FuseAnimate';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { BorderColor } from '@material-ui/icons';
import clsx from 'clsx';
import DownloadDialog from './DownloadDialog';
import { openDownloadDialog, getActivities } from './store/activitiesSlice';

import { setActivitiesFilter } from './store/filterSlice';
import { useDeepCompareEffect, useForm } from '../../../../@fuse/hooks';
import { TreeItem, TreeView } from '@material-ui/lab';
import { SelectFormsy } from "@fuse/core/formsy";
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
	title: {
		color: '#00B1FF',
		marginTop: '15px',
		marginBottom: '15px',
		fontSize: '20px',
		fontWeight: 'bold',
		marginLeft: '4px'
	},
	title1: {
		color: '#00B1FF',
		fontFamily: `'grobold', 'rager'`,
		fontSize: '25px'
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
	exportButton: {
		position: 'fixed',
		right: 80,
		bottom: 12,
		zIndex: 99
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
	buttonRed: {
		color: "#FF2F54",
		border: "solid #FF2F54 3px",
		'&:hover': {
			background: "#FF2F54",
			borderColor: "#FF2F54",
		},
		'limpiar_filtros': {

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
		}
	},
	warnig: {
		fontFamily: "Poppins",
		fontSize: "13px",
		color: "#BEBEBE"
	},
}));

const defaultFormState = {
	group_id: 0,
	from: '',
	until: '',
	status: 0,
	customsubjects_id: 0,
	active_id: 3
};
const expanded = true;

function ActivitySidebarContent(props) {
	const dispatch = useDispatch();
	const groups = useSelector(({ ActivitiesApp }) => ActivitiesApp.groups.data);
	const customsubjects = useSelector(({ ActivitiesApp }) => ActivitiesApp.customsubjects.data);
	const role = useSelector(({ auth }) => auth.user.role);
	const { form, setForm, handleChange } = useForm(defaultFormState);
	const classes = useStyles(props);
	const [show, setShow] = useState(true);

	dispatch(setActivitiesFilter(form));

	useDeepCompareEffect(() => {
		dispatch(getActivities(role));
	}, [dispatch, form]);

	function handleFilterClean() {
		setForm({
			group_id: 0,
			from: '',
			until: '',
			status: 0,
			customsubjects_id: 0,
			active_id: 3
		});
	}

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} md={3} />
				<Grid item xs={12} md={6} className="text-center">
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<h2 className={classes.title1}>Tareas</h2>
					</FuseAnimate>
				</Grid>
				<Grid item xs={12} md={3} className='text-right'>
					<Button
						className={clsx(classes.button, classes.buttonFill, 'py-20 w-200')}
						to="/apps/editarActividades"
						component={Link}
					>
						+ Nueva tarea
					</Button>
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
							<div className="w-full sm:w-1 md:w-1/2 lg:pr-24">
								<>
									<InputLabel className={classes.label}>Por grupos</InputLabel>
									{groups ? (
										groups.length > 0 ?
											<Select
												id="group_id"
												name="group_id"
												value={form.group_id}
												onChange={handleChange}
												className={classes.select}
											>
												<MenuItem className='poppins' key={0} value={0}>Todos los grupos</MenuItem>
												{groups.map((row) => (
													<MenuItem className='poppins' key={row.name} value={row.id}>{row.name}</MenuItem>
												))}
											</Select>
											:
											<Typography className={clsx(classes.warnig, 'pt-20')}>
												No se han encontrado grupos
											</Typography>
									) : (
										<Typography variant="h4" ><Skeleton /></Typography>
									)}
								</>
							</div>
							<div className="w-full sm:w-1 md:w-1/4 lg:px-24">
								<InputLabel className={classes.label}>Por estados</InputLabel>
								<Select
									id="active_id"
									name="active_id"
									value={form.active_id}
									onChange={handleChange}
									className={classes.select}
								>
									<MenuItem className='poppins' key={0} value={3}>Todos los estados</MenuItem>
									<MenuItem className='poppins' key={1} value={1}>Activas</MenuItem>
									<MenuItem className='poppins' key={2} value={0}>Vencidas</MenuItem>
									<MenuItem className='poppins' key={3} value={4}>Programadas</MenuItem>
									<MenuItem className='poppins' key={3} value={2}>Borradores</MenuItem>
								</Select>
							</div>
							<div className="w-full sm:w-1 md:w-1/4 lg:pl-24">
								<InputLabel className={classes.label}>Por entregas</InputLabel>
								<Select
									id="status"
									name="status"
									value={form.status}
									onChange={handleChange}
									className={classes.select}
								>
									<MenuItem className='poppins' key={0} value={0}>Todos</MenuItem>
									<MenuItem className='poppins' key={1} value="No entregado">No Entregados</MenuItem>
									<MenuItem className='poppins' key={2} value="Entregado">Entregados</MenuItem>
									<MenuItem className='poppins' key={3} value="Calificado">Calificados</MenuItem>
								</Select>
							</div>
							<div className="w-full sm:w-1 md:w-1/2 lg:pr-24 pt-10">
								<>
									<InputLabel className={classes.label}>Por materias</InputLabel>
									{customsubjects ? (
										customsubjects.length > 0 ?
											<Select
												id="customsubjects_id"
												name="customsubjects_id"
												value={form.customsubjects_id}
												onChange={handleChange}
												className={classes.select}
												InputProps={{ disableUnderline: true }}
											>
												<MenuItem className='poppins' key={0} value={0}>Todas las materias</MenuItem>
												{customsubjects.map(row => (
													<MenuItem className='poppins' key={row.id} value={row.id}>{row.custom_name}</MenuItem>
												))}
											</Select>
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
								<InputLabel className={classes.label}>Desde</InputLabel>
								<TextField
									className={classes.textField}
									name="from"
									id="from"
									type="date"
									value={form.from}
									onChange={handleChange}
									max={form.until}
									InputProps={{ disableUnderline: true }}
								/>
							</div>
							<div className="w-full sm:w-1 md:w-1/4 lg:pl-24 pt-10">
								<InputLabel className={classes.label}>Hasta</InputLabel>
								<TextField
									className={classes.textField}
									name="until"
									id="until"
									type="date"
									value={form.until}
									onChange={handleChange}
									min={form.from}
									InputProps={{ disableUnderline: true }}
								/>
							</div>
						</div>
					</TreeItem>

					<Button
						// className={clsx(classes.button, classes.buttonRed)}
						style={{
							position: 'absolute',
							right: 0,
							top: 15,
							width: '124px'
						}}
						className="btnLimpiar"
						onClick={handleFilterClean}
					>
						Limpiar filtros
					</Button>
				</TreeView>
			</Grid>
		</>
	);
}

export default ActivitySidebarContent;
