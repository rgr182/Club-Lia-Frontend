import React from 'react';
import useStyles from './styles';

const GlobalPriceCard = ({ content }) => {
	const classes = useStyles();
	const { name, price, description } = content;

	return (
		<div className={classes.container}>
			<p className={classes.title}>{name}</p>
			<h2 className={classes.price}>{price.toLocaleString('en-US')}</h2>
			<div className={classes.description}>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default GlobalPriceCard;
