import { SelectFormsy } from '@fuse/core/formsy';
import { MenuItem } from '@material-ui/core';
import React from 'react';
import { camelToSnakeCase, capitalize, formatSnakeCase, pipe } from '../../../../utils/helpers';
import useStyles from './styles';

const FormTextFIeld = ({ name, value, handleChange, options, label }) => {
	const classes = useStyles();

	if (!label) label = pipe(camelToSnakeCase, formatSnakeCase)(name);

	const namedHandleChange = event => {
		handleChange(event, name);
	};

	return (
		<div className={classes.container}>
			<label className={classes.label} htmlFor={name}>
				{label}
			</label>
			<SelectFormsy
				className={classes.input}
				name={name}
				value={value}
				onChange={namedHandleChange}
				variant="outlined"
			>
				{options.map(option => (
					<MenuItem key={option.value} value={option.value} className={classes.option}>
						{capitalize(option.label)}
					</MenuItem>
				))}
			</SelectFormsy>
		</div>
	);
};

export default FormTextFIeld;
