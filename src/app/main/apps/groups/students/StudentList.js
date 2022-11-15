import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import _ from '@lodash';
import axios from 'axios';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import '../../../../../styles/newdesign.css';

import {
	Typography,
	MenuItem,
	LinearProgress,
	Card,
	Button,
	Dialog,
	DialogContent,
	Icon,
	IconButton,
	Radio,
	Paper,
	RadioGroup,
	Tooltip,
	Checkbox,
	FormControlLabel,
	CircularProgress
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import clsx from 'clsx';
import TablePagination from '@material-ui/core/TablePagination';
import FuseAnimate from '../../../../../@fuse/core/FuseAnimate/FuseAnimate';
import StudentsSidebarContent from './StudentsSidebarContent';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<Checkbox ref={resolvedRef} {...rest} />
		</>
	);
});

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: '#60CEFF',
			color: theme.palette.common.white,
			fontSize: 11,
			padding: '2px'
		},
		body: {
			fontSize: 10,
			height: 12,
			borderRadius: 6,
			margin: 2,
			padding: '2px'
		}
	})
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
	createStyles({
		root: {
			'&:nth-of-type(odd)': {
				backgroundColor: theme.palette.action.hover,
				margin: 4
			}
		},
	})
)(TableRow);

const useStyles = makeStyles(theme => ({
	table: {
		borderRadius: '1em 1em 1em 1em'
	},
	title: {
		color: '#00B1FF',
		fontFamily: `'grobold', 'rager'`,
		fontSize: '20px'
	},
	thead: {
		'& th:first-child': {
			textAlign: 'left',
			width: 25,
			borderRight: 'none'
		},
		'& th:nth-child(2)': {
			borderLeft: 'none',
			width: 10,
			borderRight: 'none'
		},
		'& th:nth-child(3)': {
			borderLeft: 'none',
		},
		'& th:nth-child(5)': {
			borderRight: 'none'
		},
		'& th:last-child': {
			borderRadius: '0 1em 1em 0',
			width: 70,
			borderLeft: 'none',
		},
	},
	tbody: {
		'& td:first-child': {
			borderRight: 'none'
		},
		'& td:nth-child(2)': {
			borderLeft: 'none',
			borderRight: 'none'
		},
		'& td:nth-child(3)': {
			borderLeft: 'none'
		},
		'& td:nth-child(5)': {
			borderRight: 'none'
		},
		'& td:last-child': {
			borderLeft: 'none',
		},
	},
	title: {
		color: '#00B1FF',
		fontFamily: `'grobold', 'rager'`,
		fontSize: '20px'
	},
}));

const StudentList = ({ columns, data, onRowClick }) => {
	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			autoResetPage: true
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		hooks => {
			hooks.allColumns.push(_columns => [
				// Let's make a column for selection
				{
					id: 'selection',
					sortable: false,
					width: 20,
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox.  Pagination is a problem since this will select all
					// rows even though not all rows are on the current page.  The solution should
					// be server side pagination.  For one, the clients should not download all
					// rows in most cases.  The client should only download data for the current page.
					// In that case, getToggleAllRowsSelectedProps works fine.
					// Header: ({ getToggleAllRowsSelectedProps }) => (
					// 	<div>
					// 		<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
					// 	</div>
					// ),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => (
						row.original.groups_id && row.original.groups_id != 0 ?
							<div>

								<IndeterminateCheckbox
									{...row.getToggleRowSelectedProps()}
									onClick={ev => ev.stopPropagation()}

								/>
							</div>
							:
							<div />

					)
				},
				..._columns
			]);
		}
	);

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setPageSize(Number(event.target.value));
	};

	const classes = useStyles();

	return (

		<Card elevation={1} className="contenedor">
			<div className="section2 w-full items-center justify-center ">
				<div className="flex flex-col overflow-hidden " style={{ width: '95%' }}>
					<StudentsSidebarContent />

					{data ?
						data.length > 0 ?
							<>
								<TableContainer className="flex flex-1 students">
									<Table {...getTableProps()} stickyHeader className='tables'>
										<TableHead className='tablesHead' classes={{ root: classes.thead }}>
											{headerGroups.map(headerGroup => (
												<TableRow {...headerGroup.getHeaderGroupProps()}>
													{headerGroup.headers.map(column => (
														<StyledTableCell
															align="left"
															className="whitespace-no-wrap"
															{...(!column.sortable
																? column.getHeaderProps()
																: column.getHeaderProps(column.getSortByToggleProps()))}
															className="tablesTh"
														>
															{column.render('Header')}
															{column.sortable ? (
																<TableSortLabel
																	active={column.isSorted}
																	// react-table has a unsorted state which is not treated here
																	direction={column.isSortedDesc ? 'desc' : 'asc'}
																/>
															) : null}
														</StyledTableCell>
													))}
												</TableRow>
											))}
										</TableHead>
										<TableBody classes={{ root: classes.tbody }}>
											{page.map((row, i) => {
												prepareRow(row);
												return (
													<StyledTableRow
														{...row.getRowProps()}
														onClick={ev => onRowClick(ev, row)}
														className="truncate cursor-pointer"
													>
														{row.cells.map(cell => {
															return (
																<StyledTableCell
																	{...cell.getCellProps()}
																	className={i % 2 === 0 ? 'tablesTdB centerTableStudent' : 'tablesTd centerTableStudent'}
																>
																	{cell.render('Cell')}
																</StyledTableCell>
															);
														})}
													</StyledTableRow>
												);
											})}
										</TableBody>
									</Table>
								</TableContainer>
								<TablePagination
									component="div"
									classes={{
										root: 'overflow-hidden flex-shrink-0 border-0 text-13 poppins',
										spacer: 'w-0 max-w-0',
										caption: 'paginationfont',
										select: 'paginationfont',
										menuItem: 'paginationfont',
										actions: 'paginationfont',
									}}
									rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length + 1 }]}
									colSpan={5}
									count={data.length}
									rowsPerPage={pageSize}
									labelRowsPerPage={'Filas por página'}
									page={pageIndex}
									SelectProps={{
										inputProps: { 'aria-label': 'rows per page' },
										native: false,
									}}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							</>
							:
							<>
								<div className="flex flex-1 items-center justify-center py-160">
									<Typography color="textSecondary" className="text-24 my-24 poppins">
										No se encontraron alumnos
									</Typography>
								</div>
							</>

						:
						<>
							<div className="flex flex-1 flex-col items-center justify-center py-160">
								<Typography className="text-20 mb-16 poppins">
									Consultando información...
								</Typography>
								<CircularProgress color="secondary" />
							</div>
						</>
					}

				</div>
			</div>
		</Card>

	);
};

StudentList.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default StudentList;
