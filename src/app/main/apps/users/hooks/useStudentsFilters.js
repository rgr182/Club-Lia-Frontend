import { useState, useEffect, useCallback } from 'react';
import gradeOptions from './mockGrades';
import JwtService from 'app/services/jwtService';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

const filterOptions = {
	grades: [
		{ value: 0, label: 'Todos los grados', level: [{ value: 0, label: 'Todos los niveles' }] },
		...gradeOptions.map(grade => ({ ...grade, level: [{ value: 0, label: 'Todos los niveles' }, ...grade.level] }))
	],
	levels: [{ value: 0, label: 'Todos los niveles' }, ...gradeOptions[0].level],
	statuses: [
		{ value: 1, label: 'Por Revisar' },
		{ value: 2, label: 'En proceso' },
		{ value: 3, label: 'Actualizado' },
		{ value: 4, label: 'Aprobado' }
	]
};

const initialFilter = {
	grade: filterOptions.grades[0],
	level: filterOptions.levels[0],
	status: filterOptions.statuses[0]
};

const useStudentsFilters = () => {
	const [filters, setFilters] = useState(initialFilter);
	const [students, setStudents] = useState();
	const dispatch = useDispatch();

	const loadStudents = useCallback(async () => {
		try {
			const res = await JwtService.getGlobalSchoolingStudents(filtersValues());
			const users = res.data.map(element => {
				const {
					name,
					last_name,
					grade,
					level_id,
					global_schooling: { status }
				} = element;
				return { name, last_name, grade, level_id, status };
			});
			setStudents(users || []);
		} catch (error) {
			dispatch(showMessage({ message: error?.response?.data?.message || 'Disculpe, ha ocurrido un error' }));
		}
	}, [filters]);

	const handleFiltersChange = ({ target }, customName) => {
		if (customName) target.name = customName;
		const { name, value } = target;
		const copyFilters = { ...filters };

		switch (name) {
			case 'grade':
				const grade = filterOptions.grades.find(grade => +grade.value === +value) ?? initialFilter.grade;
				copyFilters.grade = grade;

				if (filters.level.value > grade.level.length) copyFilters.level = grade.level[0];
				break;
			case 'level':
				copyFilters.level =
					copyFilters.grade?.level?.find(level => +level.value === +value) ?? initialFilter.level;
				break;
			case 'status':
				copyFilters.status = filterOptions.statuses.find(status => +status.value === +value);
				break;
		}

		setFilters({ ...copyFilters });
	};

	const filtersValues = () => {
		const {
			grade: { value: grade = '' },
			level: { value: level = '' },
			status: { value: value = '' }
		} = filters;
		return { grade, level, value };
	};

	const clearFilters = () => {
		setFilters(initialFilter);
	};

	useEffect(() => {
		loadStudents();
	}, [filters]);

	return {
		students,
		filters,
		handleFiltersChange,
		clearFilters,
		filterOptions
	};
};

export default useStudentsFilters;
