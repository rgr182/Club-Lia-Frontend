import React from 'react';

import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';

import deLocale from 'date-fns/locale/es';
import DateFnsUtils from '@date-io/date-fns';

import Formsy from 'formsy-react';

import PropTypes from 'prop-types';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { SelectFormsy } from '@fuse/core/formsy';

import { IUserStatus, IGrades } from 'app/main/apps/users/models/UserModel';

const useStyles = makeStyles(theme => ({
	label: {
		fontFamily: 'Poppins',
		fontSize: '15px',
		color: '#353535',
		textAlign: 'left'
	},
	inputNoLabel: {
		marginTop: '30px !important'
	},
	textInput: {
		maxWidth: '290px',
		width: '100%',
		height: '35px',
		marginTop: '8px',
		alignContent: 'center',
		textAlign: 'left',
		alignSelf: 'center',
		'& .MuiInput-root': {
			fontFamily: 'Poppins',
			borderRadius: '5px',
			background: 'transparent',
			color: '#353535',
			border: 'solid #BEBEBE 2px',
			padding: '0 3px',
			'&:focus, &:hover, &:focus-visible': {
				border: 'solid ' + theme.palette.primary.main + ' 3px'
			}
		},
		'& .Mui-focused': {
			borderColor: theme.palette.primary.main
		},
		'& .MuiInput-root.Mui-disabled': {
			borderColor: '#F5F5F5',
			backgroundColor: '#F5F5F5',
			color: '#BEBEBE',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#F5F5F5'
			}
		},
		'& .MuiInput-underline': {
			'&:before, &:after, &:focus, &:hover, &:focus-visible': {
				borderColor: 'transparent'
			}
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
			borderColor: 'transparent'
		},
		'& ::-webkit-calendar-picker-indicator': {
			filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
		},
		'& .MuiInput-inputMultiline': {
			padding: '5px 3px'
		}
	}
}));

export default function FilterSection(props) {
	const classes = useStyles(props);

	const grades = Object.values(IGrades).map(grade => (
		<MenuItem className="poppins" key={grade.id} value={grade.id}>
			{grade.grade}
		</MenuItem>
	));
	const statusItems = Object.values(IUserStatus).map(status => (
		<MenuItem className="poppins" key={status.value} value={status.value}>
			{status.displayValue}
		</MenuItem>
	));

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<Formsy className="flex flex-wrap w-full flex-row items-center justify-center inline-block">
				<div className="flex flex-wrap w-full flex-row align-left justify-left py-12 mb-24">
					{/* GRADE */}
					<div className="w-full sm:w-full md:w-1/3 py-4 md:pr-20">
						<Typography className={classes.label}>Grado</Typography>
						<SelectFormsy
							className={classes.textInput}
							id="grade"
							name="grade"
							value={props.grade.value}
							onChange={e => props.setGrade({ value: e.target.value, filter: true })}
						>
							<MenuItem className="poppins" key={'grade'} value={-1}>
								Todos los grados
							</MenuItem>
							{grades}
						</SelectFormsy>
					</div>
					{/* CONTACT DATE START */}
					<div className="w-full sm:w-1/2 sm:pr-6 md:w-1/3 py-4 md:px-20">
						<Typography className={classes.label}>Por fecha de contacto</Typography>
						<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
							<KeyboardDatePicker
								className={classes.textInput}
								disableToolbar
								format="yyyy-MM-dd"
								name="start"
								id="start"
								placeholder="Desde"
								maxDate={props.contactDateEnd.value}
								initialFocusedDate={props.today}
								value={props.contactDateStart.value}
								onChange={date => props.setContactDateStart({ value: date, filter: true })}
								invalidDateMessage={'Fecha inválida'}
							/>
						</MuiPickersUtilsProvider>
					</div>
					{/* CONTACT DATE END */}
					<div className="w-full sm:w-1/2 md:w-1/3 py-4 md:pl-20 flex justify-end">
						<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
							<KeyboardDatePicker
								className={`${classes.textInput} ${classes.inputNoLabel}`}
								disableToolbar
								format="yyyy-MM-dd"
								name="end"
								id="end"
								placeholder="Hasta"
								initialFocusedDate={props.today}
								value={props.contactDateEnd.value}
								onChange={date => props.setContactDateEnd({ value: date, filter: true })}
								invalidDateMessage={'Fecha inválida'}
							/>
						</MuiPickersUtilsProvider>
					</div>
					{/* STATUS */}
					<div className="w-full sm:w-full md:w-1/3 py-4 md:pr-20">
						<Typography className={classes.label}>Estatus</Typography>
						<SelectFormsy
							className={classes.textInput}
							id="status"
							name="status"
							value={props.status.value}
							onChange={e => props.setStatus({ value: e.target.value, filter: true })}
						>
							<MenuItem className="poppins" key={'statusDefault'} value={-1}>
								Todos los Estatus
							</MenuItem>
							{statusItems}
						</SelectFormsy>
					</div>
					{/* DATE START */}
					<div className="w-full sm:w-1/2 sm:pr-6 md:w-1/3 py-4 md:px-20">
						<Typography className={classes.label}>Por fecha de cita</Typography>
						<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
							<KeyboardDatePicker
								className={classes.textInput}
								disableToolbar
								format="yyyy-MM-dd"
								name="start"
								id="start"
								placeholder="Desde"
								maxDate={props.dateEnd.value}
								initialFocusedDate={props.today}
								value={props.dateStart.value}
								onChange={date => props.setDateStart({ value: date, filter: true })}
								invalidDateMessage={'Fecha inválida'}
							/>
						</MuiPickersUtilsProvider>
					</div>
					{/* DATE END */}
					<div className="w-full sm:w-1/2 md:w-1/3 py-4 md:pl-20 flex justify-end">
						<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
							<KeyboardDatePicker
								className={`${classes.textInput} ${classes.inputNoLabel}`}
								disableToolbar
								format="yyyy-MM-dd"
								name="dateEnd"
								id="dateEnd"
								placeholder="Hasta"
								initialFocusedDate={props.today}
								value={props.dateEnd.value}
								onChange={date => props.setDateEnd({ value: date, filter: true })}
								invalidDateMessage={'Fecha inválida'}
							/>
						</MuiPickersUtilsProvider>
					</div>
				</div>
			</Formsy>
		</FuseAnimate>
	);
}


FilterSection.propTypes = {
	grade: PropTypes.shape({ value: PropTypes.number, filter: PropTypes.bool }),
	status: PropTypes.shape({ value: PropTypes.number, filter: PropTypes.bool }),
	contactDateStart: PropTypes.shape({ value: PropTypes.number, filter: PropTypes.bool }),
	contactDateEnd:PropTypes.shape({ value: PropTypes.number, filter: PropTypes.bool }),
	dateStart: PropTypes.shape({ value: PropTypes.number, filter: PropTypes.bool }),
	dateEnd: PropTypes.shape({ value: PropTypes.number, filter: PropTypes.bool }),
	setGrade: PropTypes.func,
	setStatus: PropTypes.func,
	setContactDateStart: PropTypes.func,
	setContactDateEnd: PropTypes.func,
	setDateStart: PropTypes.func,
	setDateEnd: PropTypes.func,
	today: PropTypes.instanceOf(Date),
};
