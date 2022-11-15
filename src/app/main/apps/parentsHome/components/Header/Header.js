import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation/Navigation';
import useStyles from './styles';

const Header = () => {
	const classes = useStyles();

	return (
		<header className={classes.header}>
			<h1 className={classes.title}>Bienvenido</h1>
			<h2 className={classes.subtitle}>Conoce un poco más acerca de nuestras membresías</h2>
			<Navigation />
		</header>
	);
};

Header.propTypes = {
	changeOption: PropTypes.func.isRequired
};

export default Header;
