import React from 'react';
import GlobalFeatures from '../GlobalFeatures/GlobalFeatures';
import GlobalPrices from '../GlobalPrices/GlobalPrices';
import useStyles from './styles';

const GlobalSchool = () => {
	const classes = useStyles();

	return (
		<>
			<GlobalFeatures />
			<h1 className={classes.phrase}>
				Democratizando el acceso a la mejor educación de calidad para el futuro, al precio más accesible
			</h1>
			<GlobalPrices />
		</>
	);
};

export default GlobalSchool;
