import React from 'react';

import { makeStyles } from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
	back: {
		color: '#353535',
		cursor: 'pointer'
	}
}));

export default function BackLink({ onBack }) {
	const classes = useStyles();
	return (
		<div className="w-full p-10">
			<a className={classes.back} href="#" onClick={onBack}>
				{'<'} Regresar
			</a>
		</div>
	);
}

BackLink.propTypes = {
	onBack: PropTypes.func
};

BackLink.defaultProps = {
	onBack: () => {}
};
