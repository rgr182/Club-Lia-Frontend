import React from 'react';
import { useHistory } from 'react-router';
import useStyles from './styles';

const MembershipPlan = ({ plan }) => {
	const { name, price, alert, features, color, id } = plan;
	const classes = useStyles(color)();

	const history = useHistory();

	const navigateToPlan = () => history.push(`/apps/products/membresias/${id}`);

	return (
		<div className={classes.container}>
			<h3 className={classes.title}>Membresía {name}</h3>
			<div className={classes.price}>
				<p>{price.toLocaleString('en-US')}</p>
			</div>
			<div className={classes.featuresList}>
				<p className={classes.alert}>{alert}</p>
				{features.map(feature => (
					<p key={feature} className={classes.feature}>
						<img src="assets/images/logos/checkInverse.svg" alt="✅" />
						{feature}
					</p>
				))}
				<button type="button" className={classes.button} onClick={navigateToPlan}>
					Adquiere la Membresía
				</button>
			</div>
		</div>
	);
};

export default MembershipPlan;
