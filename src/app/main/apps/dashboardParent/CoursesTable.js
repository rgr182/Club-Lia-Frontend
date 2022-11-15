import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: theme.palette.primary.light + '!important',
			color: theme.palette.common.white,
			fontSize: 11,
		},
		body: {
			fontSize: 10,
			height: 12,
			borderRadius: 6,
		},
	}),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
	createStyles({
		root: {
			'&:nth-of-type(odd)': {
				backgroundColor: theme.palette.action.hover,
				margin: 4
			}
		}
	})
)(TableRow);

const useStyles = makeStyles((theme) => ({
	table: {
		borderRadius: '1em 1em 1em 1em'
	},
	thead: {
		borderBottom: 'solid #fff 3px',
		'& th:first-child': {
			borderRadius: '1em 0 0 1em',
			borderRight: 'solid #fff 3px',
			width: '50%',
		},
		'& th:last-child': {
			borderRadius: '0 1em 1em 0',
			borderLeft: 'solid #fff 3px',
			width: '50%',
		},
	},
}));

const CoursesTable = ({ columns, data, onRowClick }) => {
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

	// Render the UI for your table
	return (
		<div className="flex flex-col overflow-hidden">
			<TableContainer className="flex flex-1">
				<Table {...getTableProps()} stickyHeader className="tables">
					<TableHead className="tablesHead" classes={{ root: classes.thead }}>
						{headerGroups.map(headerGroup => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<StyledTableCell
										align="left"
										// className="whitespace-no-wrap p-12"
										className="tablesTh colorAndPadding centerTableGroupHead"
										{...(!column.sortable
											? column.getHeaderProps()
											: column.getHeaderProps(column.getSortByToggleProps()))}
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
												// className={clsx('p-4', cell.column.className, classes.border)}
												className={i % 2 === 0 ? 'tablesTdB centerTableGroup tableGroup' : 'tablesTd centerTableGroup tableGroup'}
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
		</div>
	);
};

CoursesTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default CoursesTable;
