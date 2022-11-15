import { TextFieldFormsy } from '@fuse/core/formsy';
import React from 'react';
import { camelToSnakeCase, formatSnakeCase, pipe } from '../../../../utils/helpers';
import useStyles from './styles';
import composeConfig from './textFieldValidations';

const FormTextFIeld = ({ name, value, handleChange, label, required = false, type = 'text', passCheck }) => {
	const classes = useStyles();

	const { validations, errors } = composeConfig({ type, passCheck });

	if (!label) label = pipe(camelToSnakeCase, formatSnakeCase)(name);

	return (
		<div className={classes.container}>
			<label className={classes.label} htmlFor={name}>
				{label} {required && <span>*</span>}
			</label>
			<TextFieldFormsy
				className={classes.input}
				name={name}
				value={value}
				onChange={handleChange}
				validations={validations}
				type={type}
				validationErrors={errors}
				required={required}
				variant="outlined"
			/>
		</div>
	);
};

export default FormTextFIeld;
