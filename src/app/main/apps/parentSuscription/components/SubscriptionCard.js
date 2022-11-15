import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useClasses = makeStyles(() => ({
	title: {
		fontWeight: 'bold',
		fontSize: '20px',
		textAlign: 'center',
		color: '#139E96',
		marginTop: '15px'
	},
	price: {
		fontWeight: '700',
		fontSize: '26px',
		color: '#1EC6BC',
		marginLeft: 6,
		marginRight: 6
	},
	description: {
		padding: 20,
		height: 130,
		fontWeight: '600',
		fontSize: '16px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#353535'
	}
}));

export default function SubscriptionCard({ title, price, description }) {
	const classes = useClasses();

	return (
		<div>
			<h4 className={classes.title}>{title}</h4>
			<div className="invitado" style={{ color: '#1EC6BC', fontSize: 14 }}>
				$<span className={classes.price}>{price}</span>MXN
			</div>
			<div className="invitado-1">
				<div className={classes.description}>{description}</div>
			</div>
		</div>
	);
}

SubscriptionCard.propTypes = {
	title: PropTypes.string,
	price: PropTypes.string,
	description: PropTypes.string
};

SubscriptionCard.defaultProps = {
	title: '',
	price: '',
	description: ''
};
