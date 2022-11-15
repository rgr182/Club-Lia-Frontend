import React, { useMemo } from 'react';
import PageCard from 'app/main/apps/pageCard/PageCard';
import StudentsFilters from '../StudentsFilters/StudentsFilter';
import UserTable from '../../UsersTable';
import useStudentsFilters from '../../hooks/useStudentsFilters';
import useStyles from './styles';
import StatusHelper from '../StatusHelper/StatusHelper';
import GlobalBadge from '../GlobalBadge';

const StudentsList = () => {
	const classes = useStyles();
	const { students, filters, handleFiltersChange, clearFilters, filterOptions } = useStudentsFilters();

	const columns = useMemo(() => [
		{
			Header: 'Nombre(s)',
			accessor: 'name',
			sortable: true
		},
		{
			Header: 'Apellido(s)',
			accessor: 'last_name',
			sortable: true
		},
		{
			Header: 'Nivel Educativo',
			accessor: 'grade',
			sortable: true,
			Cell: ({ row }) => ['Kinder', 'Primaria', 'Secundaria', 'Preparatoria'][row.original.grade - 1] ?? '-'
		},
		{
			Header: 'Grado Escolar',
			accessor: 'level_id',
			sortable: true,
			Cell: ({ row }) =>
				['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'][row.original.level_id - 1] ?? '-'
		},
		{
			Header: 'Estatus',
			accessor: 'status',
			sortable: true,
			Cell: ({ row }) => <GlobalBadge status={row.original.status} />
		}
	]);

	const handleClick = () => {
		console.log('handleClick');
	};

	if (!students) return null;
	return (
		<PageCard>
			<h1 className={classes.title}>Alumnos registrados</h1>
			<StudentsFilters
				filtersForm={filters}
				handleChange={handleFiltersChange}
				clearFilters={clearFilters}
				filterOptions={filterOptions}
			/>
			<main className={classes.content}>
				{students.length > 0 ? (
					<UserTable columns={columns} data={students} onRowClick={handleClick} />
				) : (
					'No hay estudiantes registrados'
				)}
			</main>
			<StatusHelper />
		</PageCard>
	);
};

export default StudentsList;
