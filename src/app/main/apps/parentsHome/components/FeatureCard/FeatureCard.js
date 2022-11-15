import React from 'react';
import useStyles from './styles';

const FeatureCard = ({ feature }) => {
	const { title, desc, image, color } = feature;
	const classes = useStyles(color)();

	const imageURL = `assets/images/membershipFeatures/${image}`;

	return (
		<div className={classes.container}>
			<h3 className={classes.title}>{title}</h3>
			<img className={classes.image} src={imageURL} alt={title} />
			<p className={classes.desc}>{desc}</p>
		</div>
	);
};

export default FeatureCard;
