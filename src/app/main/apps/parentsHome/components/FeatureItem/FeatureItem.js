import React from 'react';
import useStyles from './styles';

const ItemFeature = ({ feature, onClick }) => {
	const { color, id, title } = feature;
	const classes = useStyles(color)();

	return (
		<li key={id} className={classes.item} onClick={onClick}>
			{title}
		</li>
	);
};

export default ItemFeature;
