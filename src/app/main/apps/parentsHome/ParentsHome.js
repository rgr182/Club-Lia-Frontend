import React from 'react';
// Components
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
// Hooks
import useOptions from './hooks/useOptions';
import PageCard from '../pageCard/PageCard';

const ParentsHome = () => {
	const { currentOption } = useOptions();

	return (
		<PageCard>
			<Header />
			<Banner />
			{currentOption.content}
		</PageCard>
	);
};

export default ParentsHome;
