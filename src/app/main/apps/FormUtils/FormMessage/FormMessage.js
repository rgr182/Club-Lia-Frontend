import React from 'react';
import useStyles from './styles';

const FormMessage = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.formMessage}>{children}</div>;
};

export default FormMessage;
