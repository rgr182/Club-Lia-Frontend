import FusePageSimple from '@fuse/core/FusePageSimple';
import React, { useRef } from 'react';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import ProfileParentContent from './ProfileParentContent';

function ProfileParentPage() {
	const pageLayout = useRef(null);

	return (
		<FusePageSimple
			classes={{
				contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
				content: 'flex flex-col h-full',
				leftSidebar: 'w-256',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
				wrapper: 'min-h-0'
			}}
			// header={}
			content={<ProfileParentContent/>}
			sidebarInner				
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('ProfileApp', reducer)(ProfileParentPage);
