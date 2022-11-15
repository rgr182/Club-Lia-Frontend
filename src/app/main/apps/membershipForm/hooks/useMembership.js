import { useHistory, useParams } from 'react-router';
import membershipPlans from '../../parentsHome/components/Membership/membershipPlans';

const useCourse = () => {
	const { type: membersipType } = useParams();
	const history = useHistory();

	const getMembership = () => membershipPlans.find(membership => membership.id === +membersipType);

	const currentMembership = getMembership();
	console.log('>>: membership > ', membersipType, currentMembership)

	const navigateToMembership = ({ target }) => {
		const { value } = target;
		const { id } = membershipPlans[value];
		history.push(`/apps/products/membresias/${id}`);
	};

	const membershipIndex = membershipPlans.findIndex(membership => membership.id === currentMembership.id);

	const navigateRegister = () => {
		history.push(`/apps/products/membresias/${currentMembership.id}/new`);
	};

	const isRegister = history.location.pathname.includes('new');

	return { currentMembership, membershipPlans, navigateToMembership, membershipIndex, navigateRegister, isRegister };
};

export default useCourse;
