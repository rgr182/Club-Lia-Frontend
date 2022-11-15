import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ProductSelect from '../../../FormUtils/ProductSelect/ProductSelect';
import useStyles from './styles';
import JwtService from 'app/services/jwtService';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

const Header = () => {
	const classes = useStyles();
	const { type: courseId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const [courses, setCourses] = useState([]);
	const load = async () => {
		try {
			const res = await JwtService.getStudentsCourses();
			const _courses = res.data?.courses;
			if (!!_courses) {
				setCourses(Object.values(_courses) || []);
			}
		} catch (error) {
			dispatch(showMessage({message:"Ha ocurrido un error obteniendo los cursos",variant: 'error'}));
			console.log('>>: error > ', error);
		}
	};
	useEffect(() => {
		load();
	}, []);
	const formatedMembershipPlans = useMemo(
		() =>
			courses.map(course => {
				const { name: label, id: value } = course;
				return {
					label,
					value
				};
			}),
		[courses]
	);
	const navigateToCourse = useCallback(
		({ target }) => {
			const { value } = target;
			history.push(`/apps/products/cursos/${value}`);
		},
		[history]
	);
	return (
		<div className={classes.container}>
			<h2 className={classes.subtitle}>Elige un curso</h2>
			<p className={classes.description}>Aplica para todos los hijos que elijas</p>
			<ProductSelect options={formatedMembershipPlans} changeOption={navigateToCourse} currentPos={courseId} />
		</div>
	);
};

export default Header;
