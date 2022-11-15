import React from 'react';
import useStyles from './styles';

const PriceFooter = ({ value, quantity, title }) => {
	const classes = useStyles();

	if (!quantity) return null;
	return (
		<section className={classes.container}>
			<div className={classes.product}>
				<span className={classes.quantity}>{quantity}</span>
				<span className={classes.title}>{title}</span>
				<span className={classes.price}>{value}</span>
			</div>
			<div className={classes.product}>
				<span className={classes.totalTitle}>Total</span>
				<span className={classes.price}>{value * quantity}</span>
			</div>
		</section>
	);
};

export default PriceFooter;
