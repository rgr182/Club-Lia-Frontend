import FuseAnimate from '@fuse/core/FuseAnimate';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import { setCoursesFilter } from "./store/filterSlice";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
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
			borderRadius: "5px",
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
	title1: {
		color: '#00B1FF',
		fontFamily: `'grobold', 'rager'`,
		fontSize: '25px'
	},
	goBackButton: {
		textTransform: 'none',
		justifyContent: 'left',
		fontFamily: 'poppins',
		fontStyle: 'normal',
		fontWeight: 'normal',
		padding: '0'
	}
}));

function TeacherCoursesSidebarContent(props) {

	const dispatch = useDispatch();
	const classes = useStyles(props);
	const progress = useSelector(({ TeacherCoursesApp }) => TeacherCoursesApp.filter.progress);

	function goBack() {
		props.history.goBack();
	}

	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">

			<Grid container>
				<Grid item md={3} xs={12} className="text-left">
					<Button
						disableRipple
						component={Link}
						to={'/apps/dashboardmaestros'}
						style={{ backgroundColor: 'transparent'}}
						className={classes.goBackButton}
					>
						{'< Regresar'}
					</Button>
				</Grid>
				<Grid item md={6} xs={12} className="text-center">
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<h2 className={classes.title1}>Mis cursos</h2>
					</FuseAnimate>
				</Grid>
				<Grid item md={3} xs={12} className="text-center">
					<Select
						id="progress"
						name="progress"
						value={progress || ''}
						onChange={ev => dispatch(setCoursesFilter(ev.target.value))}
						className={classes.select}
						displayEmpty
					>
						<MenuItem className='poppins' key={'todos'} value={''}>Todos los cursos</MenuItem>
						<MenuItem className='poppins' key={'encurso'} value={2}>En curso</MenuItem>
						<MenuItem className='poppins' key={'completados'} value={1}>Completados</MenuItem>
						<MenuItem className='poppins' key={'poriniciar'} value={0}>Por iniciar</MenuItem>
					</Select>
				</Grid>
			</Grid>
		</div>
	);
}

export default TeacherCoursesSidebarContent;
