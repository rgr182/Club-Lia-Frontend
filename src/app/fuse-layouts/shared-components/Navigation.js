import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNavigation, updateNavigationItem } from 'app/store/fuse/navigationSlice';
import { getDelivered } from 'app/store/fuse/avatarSlice';

function Navigation(props) {
	const dispatch = useDispatch();
	const navigation = useSelector(selectNavigation);
	const delivered = useSelector(({ fuse }) => fuse.avatar.delivered);
	
	useEffect(() => {
		if (!delivered){
			dispatch(getDelivered());
		}
	});

	useEffect(() => {
		dispatch(
			updateNavigationItem('actividades', {
				badge: {
					title: delivered > 0 && delivered,
					bg: delivered == 0 ? 'transparent' : '',
					fg: '#FFFFFF'
				}
			})
		);
	}, [delivered]);

	return (
		<FuseNavigation
			className={clsx('navigation', props.className)}
			navigation={navigation}
			layout={props.layout}
			dense={props.dense}
			active={props.active}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
