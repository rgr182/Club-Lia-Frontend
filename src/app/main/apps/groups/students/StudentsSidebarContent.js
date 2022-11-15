import FuseAnimate from '@fuse/core/FuseAnimate';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
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
import { setStudentsFilter } from '../store/filterSlice';

// import { setActivitiesFilter } from './store/filterSlice';
import { useForm } from '@fuse/hooks';
import { TreeItem, TreeView } from '@material-ui/lab';
import { SelectFormsy } from "@fuse/core/formsy";
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
	title1: {
		color: '#00B1FF',
		fontFamily: `'grobold', 'rager'`,
		fontSize: '25px'
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
	warnig: {
		fontFamily: "Poppins",
		fontSize: "13px",
		color: "#BEBEBE"
	},
}));

const defaultFormState = {
	level: '',
	grade: '',
	group: '',
};

function StudentsSidebarContent(props) {
	const dispatch = useDispatch();
	const teacherGroups = useSelector(({ GroupsApp }) => GroupsApp.group.teacherGroups.data);
	const { form, setForm, handleChange, setInForm } = useForm(defaultFormState);
	const classes = useStyles(props);

	useEffect(() => {
		dispatch(setStudentsFilter(form));
	}, [form]);
	
	useEffect(() => {
		if ((form.level == 1 || form.level == 3) && form.grade > 3) {
			setInForm('grade', '');
		}
	}, [form.level]);

	function handleFilterClean() {
		setForm(defaultFormState);
	}

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} className="text-center">
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<h2 className={classes.title1}>Mis alumnos</h2>
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
							<div className="w-full sm:w-1 md:w-1/2 lg:pr-24">
								<>
									<InputLabel className={classes.label}>Por grupos</InputLabel>
									{teacherGroups ? (
										teacherGroups.length > 0 ?
											<Select
												id="group"
												name="group"
												value={form.group}
												onChange={handleChange}
												className={classes.select}
												displayEmpty
											>
												<MenuItem className='poppins' value={''}>Todos los grupos</MenuItem>
												<MenuItem className='poppins' value={'0'}>Sin asignar</MenuItem>
												{teacherGroups.map((row) => (
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
							<div className="w-full sm:w-1 md:w-1/4 lg:pl-24">
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
									{(form.level == 2 || form.level == '') && <MenuItem className='poppins' key={'grade4'} value={4}>4</MenuItem>}
									{(form.level == 2 || form.level == '') && <MenuItem className='poppins' key={'grade5'} value={5}>5</MenuItem>}
									{(form.level == 2 || form.level == '') && <MenuItem className='poppins' key={'grade6'} value={6}>6</MenuItem>}
								</Select>
							</div>
						</div>
					</TreeItem>

					<Button
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

export default StudentsSidebarContent;
