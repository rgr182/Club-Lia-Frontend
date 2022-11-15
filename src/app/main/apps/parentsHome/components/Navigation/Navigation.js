import React from 'react';
// Material UI
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// Hooks
import useOptions from '../../hooks/useOptions';
import useStyles from './styles';

const Navigation = () => {
	const classes = useStyles();
	const { options, optionPos, currentOption, changeOption } = useOptions();

	const currentPos = optionPos(currentOption.value);

	return (
		<FormControl fullWidth variant="outlined" className={classes.form}>
			<Select onChange={changeOption} defaultValue={currentPos} className={classes.input}>
				{options.map((option, key) => (
					<MenuItem key={key} value={key} className={classes.option}>
						{option.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default Navigation;
