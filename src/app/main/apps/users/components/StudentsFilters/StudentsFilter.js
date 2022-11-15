import React from 'react';
import Formsy from 'formsy-react';
import useStyles from './styles';
import FormSelectField from '../../../FormUtils/FormSelectField/FormSelectField';

const StudentsFilters = ({ filtersForm, handleChange, clearFilters, filterOptions }) => {
	const classes = useStyles();

	const { grade, level, status } = filtersForm;
	const { grades, statuses } = filterOptions;

	const levels = grade.level;

	return (
		<div className={classes.container}>
			<header className={classes.header}>
				<h2 className={classes.title}>Filtros</h2>
				<button type="button" className={classes.button} onClick={clearFilters}>
					Limpiar Filtros
				</button>
			</header>
			<Formsy className={classes.form}>
				<FormSelectField
					className={classes.select}
					name="level"
					label="Nivel Educativo"
					options={levels}
					value={level.value}
					handleChange={handleChange}
				/>
				<FormSelectField
					className={classes.select}
					name="grade"
					label="Grado Escolar"
					options={grades}
					value={grade.value}
					handleChange={handleChange}
				/>
				<FormSelectField
					className={classes.select}
					name="status"
					label="Estatus"
					options={statuses}
					value={status.value}
					handleChange={handleChange}
				/>
			</Formsy>
		</div>
	);
};

export default StudentsFilters;
