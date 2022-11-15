import React from 'react';
// Material UI
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from './styles';

const ProductSelect = ({ options, changeOption, currentPos }) => {
	const classes = useStyles();

	return (
		<FormControl fullWidth variant="outlined" className={classes.form}>
			<Select onChange={changeOption} defaultValue={currentPos} className={classes.input} autoWidth>
				{options.map((option, key) => (
					<MenuItem key={key} value={option.value} className={classes.option}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default ProductSelect;
