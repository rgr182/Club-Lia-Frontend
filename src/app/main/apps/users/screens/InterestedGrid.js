import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';

import moment from 'moment';

import withReducer from 'app/store/withReducer';
import reducer from './../store';
import BackLink from 'app/ui/BackLink';
import FilterSection from './components/FilterSection';
import { getInterested } from '../store/interested';
import { useDispatch, useSelector } from 'react-redux';
import UsersTable from './../UsersTable';
import StatusBadge from '../components/StatusBadge';
import LoadingGrid from './components/LoadingGrid';

const useClasses = makeStyles(() => ({
	title: {
		fontFamily: 'Wendyone',
		fontSize: '25px',
		fontWeight: 400,
		lineHeight: '26px'
	}
}));

function InterestedGrid(props) {
	const dispatch = useDispatch();
	const classes = useClasses();
	const today = new Date();
	const res = useSelector(({ interested }) => interested.interested.data);
	const loading = useSelector(({ interested }) => interested.interested.loading);
	const history = useHistory();

	const dropdownDefaultValue = { value: -1, filter: false };
	const dateDefaultValue = { value: today, filter: false };

	const [interestedData, setInterestedData] = useState([]);
	const [grade, setGrade] = useState(dropdownDefaultValue);
	const [status, setStatus] = useState(dropdownDefaultValue);
	const [contactDateStart, setContactDateStart] = useState(dateDefaultValue);
	const [contactDateEnd, setContactDateEnd] = useState(dateDefaultValue);
	const [dateStart, setDateStart] = useState(dateDefaultValue);
	const [dateEnd, setDateEnd] = useState(dateDefaultValue);

	useEffect(() => {
		dispatch(getInterested());
	}, []);

	useEffect(() => {
		setInterestedData(res ?? []);
	}, [res]);

	useEffect(() => {
		if (
			!grade.filter &&
			!status.filter &&
			!contactDateStart.filter &&
			!contactDateEnd.filter &&
			!dateStart.filter &&
			!dateEnd.filter
		) {
			setInterestedData(res ?? []);
			return;
		}
		let resFiltered = res;
		if (grade.filter) {
			resFiltered =
				grade.value !== -1
					? resFiltered.filter(data => {
							const gradeList = JSON.parse(data.grades);
							return gradeList.some(g => g.id === grade.value);
					  })
					: resFiltered;
		}
		if (status.filter) {
			resFiltered = status.value !== -1 ? resFiltered.filter(data => data.status === status.value) : resFiltered;
		}
		if (contactDateStart.filter) {
			resFiltered = resFiltered.filter(data => {
				return (
					moment(data.contactDate).isAfter(contactDateStart.value, 'day') ||
					moment(data.contactDate).isSame(contactDateStart.value, 'day')
				);
			});
		}
		if (contactDateEnd.filter) {
			resFiltered = resFiltered.filter(data => {
				return (
					moment(data.contactDate).isBefore(contactDateEnd.value, 'day') ||
					moment(data.contactDate).isSame(contactDateEnd.value, 'day')
				);
			});
		}
		if (dateStart.filter) {
			resFiltered = resFiltered.filter(data => {
				return (
					moment(data.date).isAfter(dateStart.value, 'day') ||
					moment(data.date).isSame(dateStart.value, 'day')
				);
			});
		}
		if (dateEnd.filter) {
			resFiltered = resFiltered.filter(data => {
				return (
					moment(data.date).isBefore(dateEnd.value, 'day') || moment(data.date).isSame(dateEnd.value, 'day')
				);
			});
		}

		setInterestedData(resFiltered);
	}, [grade, status, contactDateStart, contactDateEnd, dateStart, dateEnd]);

	const cleanFilters = () => {
		setGrade(dropdownDefaultValue);
		setStatus(dropdownDefaultValue);
		setContactDateStart(dateDefaultValue);
		setContactDateEnd(dateDefaultValue);
		setDateStart(dateDefaultValue);
		setDateEnd(dateDefaultValue);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Nombre',
				accessor: 'fullName',
				className: 'font-bold ',
				sortable: true,
				Cell: ({ row }) => <label className="max-w-3xl whitespace-pre-wrap">{row.original.fullName}</label>
			},
			{
				Header: 'Correo',
				accessor: 'email',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Grado',
				accessor: 'grades',
				className: 'font-bold',
				sortable: false,
				Cell: ({ row }) => {
					let grades = row.original.grades ?? [];
					grades = JSON.parse(grades);
					return (
						<label className="text-center">
							{grades.length === 1 ? grades[0].grade : 'Mas de una opción'}
						</label>
					);
				}
			},
			{
				Header: 'Fecha de contacto',
				accessor: 'contactDate',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Fecha de cita',
				accessor: 'date',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Estatus',
				accessor: 'status',
				sortable: false,
				Cell: ({ row }) => <div style={{ paddingRight: 10, paddingLeft: 10}} >
						<StatusBadge status={row.original.status} />
					</div>
			}
		],
		[dispatch]
	);

	const onBack = env => { 
		env.preventDefault(); 
		props.history.goBack(); 
	}

	return (
		<div>
			<FuseAnimateGroup
				className="flex flex-wrap justify-center"
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<Card elevation={1} class="cardUsers">
					<BackLink onBack={onBack} />
					<div className="w-full sm:w-1 md:w-1/3 text-center p-12 px-40">
						<Typography color="primary" className={classes.title}>
							Papás Interesados
						</Typography>
					</div>
					<div className="w-full sm:w-1 md:w-1/3 p-12 px-40 flex justify-end">
						<Button onClick={cleanFilters} className="btnLimpiar" style={{ marginTop: '0 !important' }}>
							Limpiar filtros
						</Button>
					</div>

					<div class="sectionTable">
						<FilterSection
							grade={grade}
							setGrade={setGrade}
							status={status}
							setStatus={setStatus}
							contactDateStart={contactDateStart}
							setContactDateStart={setContactDateStart}
							contactDateEnd={contactDateEnd}
							setContactDateEnd={setContactDateEnd}
							dateStart={dateStart}
							setDateStart={setDateStart}
							dateEnd={dateEnd}
							setDateEnd={setDateEnd}
							today={today}
						/>
					</div>

					<div className="flex flex-col overflow-hidden w-full">
						{loading && <LoadingGrid />}
						{!loading && (
							<UsersTable
								columns={columns}
								data={interestedData}
								onRowClick={(ev, row) => {
									history.push(`/pages/parentprofile/${row.original.id}`);
								}}
							/>
						)}
					</div>
				</Card>
			</FuseAnimateGroup>
		</div>
	);
}

export default withReducer('interested', reducer)(InterestedGrid);
