import React from 'react';
import useStyles from './styles';
import MembershipPlan from '../MembershipPlan/MembershipPlan';
import membersipPlans from './membershipPlans';
import MembershipFeatures from '../MembershipFeatures/MembershipFeatures';

const Membership = () => {
	const classes = useStyles();

	return (
		<>
			<h1>Que Incluye?</h1>
			<MembershipFeatures />
			<h1>Planes para alumnos</h1>
			<h2>(Y sus papás)</h2>
			<div className={classes.container}>
				{membersipPlans.map(plan => (
					<MembershipPlan key={plan.id} plan={plan} />
				))}
			</div>
		</>
	);
};

export default Membership;
