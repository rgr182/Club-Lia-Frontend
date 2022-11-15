import React, { useState } from 'react';
import useStyles from './styles';
import membershipFeatures from './featuresInfo';
import ItemFeature from '../FeatureItem/FeatureItem';
import FeatureCard from '../FeatureCard/FeatureCard';

const MembershipFeatures = () => {
	const [currentFeature, setCurrentFeature] = useState(membershipFeatures[0]);
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<ul className={classes.list}>
				{membershipFeatures.map(feature => (
					<ItemFeature key={feature.id} feature={feature} onClick={() => setCurrentFeature(feature)} />
				))}
			</ul>
			<FeatureCard feature={currentFeature} />
		</div>
	);
};

export default MembershipFeatures;
