import React from 'react';
import useMembership from '../../hooks/useMembership';
import ProductSelect from '../../../FormUtils/ProductSelect/ProductSelect';
import useStyles from './styles';

const Header = () => {
	const { membershipPlans, navigateToMembership, membershipIndex } = useMembership();
	const classes = useStyles();

	const formatedMembershipPlans = membershipPlans.map(membership => {
		return {
			label: `Membresía ${membership.name}`,
			value: membership.id
		}
	});
	return (
		<div className={classes.container}>
			<h2 className={classes.subtitle}>Membresía</h2>
			<p className={classes.description}>
				Tipo de membresía <span>*</span>
			</p>
			<ProductSelect
				options={formatedMembershipPlans}
				changeOption={navigateToMembership}
				currentPos={formatedMembershipPlans[membershipIndex].value}
			/>
		</div>
	);
};

export default Header;
