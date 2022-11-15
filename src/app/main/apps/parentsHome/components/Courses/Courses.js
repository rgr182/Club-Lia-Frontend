import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import CourseCard from '../CourseCard/CourseCard';
// Should be fetched from the server
import useStyles from './styles';
import JwtService from 'app/services/jwtService';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

const Courses = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [courses, setCourses] = useState([]);
	const load = async () => {
		try {
			const res = await JwtService.getStudentsCourses();
			const _courses = res.data?.courses
			if(!!_courses){
				setCourses(Object.values(_courses) || []);
			}
		} catch (error) {
			dispatch(showMessage({message:"Ha ocurrido un error obteniendo los cursos",variant: 'error'}));
			console.log('>>: error > ', error)
		}
	};
	useEffect(() => {
		load();
	}, []);
	return (
		<section className={classes.container}>
			<h2 className={classes.subtitle}>Cursos Especializados</h2>
			<Carousel
				enableAutoPlay
				showArrows={false}
				autoPlaySpeed={2500}
				className={classes.carousel}
				enableSwipe={false}
			>
				{courses.map(course => (
					<CourseCard key={course.id} course={course} />
				))}
			</Carousel>
		</section>
	);
};

export default Courses;
