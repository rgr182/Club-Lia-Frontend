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
import { useSelector } from 'react-redux';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: '#AE16A9',
			background: '#AE16A9',
			// borderColor: '#FFF',
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

const useStyles = makeStyles((theme) => ({
	table: {
		borderRadius: '1em 1em 1em 1em'
	},
	thead: {
		'& th:first-child': {
			width: 20,
		},
		'& th:nth-child(2n)': {
			width: 20,
		},
		'& th:last-child': {
			width: 20,
		},
		'& th:nth-child(n)': {
			borderRight: 'none',
			borderLeft: 'none',
		},
	},
	tbody: {
		'& td:nth-child(n)': {
			borderRight: 'none',
			borderLeft: 'none',
		},
	},
}));

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<Checkbox ref={resolvedRef} {...rest}/>
		</>
	);
});

const EnhancedTable = ({ columns, data, onRowClick }) => {
	const role = useSelector(({ auth }) => auth.user.role);
	var limited = false;
	if (role === 'Maestro-M' || role === 'Maestro-I' || role === 'Maestro-A') {
		limited = true;
	}

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
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox.  Pagination is a problem since this will select all
					// rows even though not all rows are on the current page.  The solution should
					// be server side pagination.  For one, the clients should not download all
					// rows in most cases.  The client should only download data for the current page.
					// In that case, getToggleAllRowsSelectedProps works fine.
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => (
						<div className="justify-center items-center align-center">
							<IndeterminateCheckbox
								{...row.getToggleRowSelectedProps()}
								onClick={ev => ev.stopPropagation()}
							/>
						</div>
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

	// Render the UI for your table
	return (
		<div className="flex flex-col overflow-hidden">
			<TableContainer className="flex flex-1">
				<Table {...getTableProps()} stickyHeader>
					<TableHead className='tablesThPurple'>
						{headerGroups.map(headerGroup => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<StyledTableCell
										className="tablesThPurple"
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
					<TableBody>
						{page.map((row, i) => {

							prepareRow(row);
							return (
								<TableRow
									{...row.getRowProps()}
									onClick={!limited? ev => onRowClick(ev, row):null}
									className="truncate cursor-pointer"
								>
									{row.cells.map(cell => {
										return (
											<StyledTableCell
												{...cell.getCellProps()}
												className={i % 2 === 0 ? 'tablesTdB centerDataTable' : 'tablesTd centerDataTable'}
											>
												{cell.render('Cell')}
											</StyledTableCell>
										);
									})}
								</TableRow>
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

EnhancedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default EnhancedTable;
