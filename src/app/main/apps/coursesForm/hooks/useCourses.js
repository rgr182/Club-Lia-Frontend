import { useHistory, useParams } from 'react-router';
import coursesData from '../../parentsHome/components/Courses/coursesInfo';

const useCourse = () => {
	const { type: courseId } = useParams();
	const history = useHistory();

	const getCourse = () => coursesData.find(course => course.id === +courseId);

	const currentCourse = getCourse();

	const navigateToCourse = ({ target }) => {
		const { value } = target;
		const { id } = coursesData[value];
		history.push(`/apps/products/cursos/${id}`);
	};

	const courseIndex = coursesData.findIndex(membership => membership.id === currentCourse.id);

	const navigateRegister = () => {
		history.push(`/apps/products/cursos/${currentCourse.id}/new`);
	};

	const isRegister = history.location.pathname.includes('new');

	return { currentCourse, coursesData, navigateToCourse, courseIndex, navigateRegister, isRegister };
};

export default useCourse;
