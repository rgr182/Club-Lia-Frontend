import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import reducer from './store';
import TeacherCoursesList from './TeacherCoursesList';

function TeacherCoursesApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80',
					content: 'flex flex-col',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				content={ <TeacherCoursesList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
		</>
	);
}
export default withReducer('TeacherCoursesApp', reducer)(TeacherCoursesApp);
