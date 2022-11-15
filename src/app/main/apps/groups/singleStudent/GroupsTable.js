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
			width: 20,
			borderRight: 'none',
		},
		'& th:nth-child(2)': {
			borderLeft: 'none',
		},
		'& th:nth-child(3)': {
			width: 200,
			borderLeft: 'solid #fff 3px',
			borderRight: 'none',
		},
		'& th:last-child': {
			borderRadius: '0 1em 1em 0',
			width: 70,
			borderLeft: 'none',
		},
	},
	tbody: {
		'& td:first-child': {
			borderRight: 'none',
		},
		'& td:nth-child(2)': { 
			borderLeft: 'none',
		},
		'& td:nth-child(3)': { 
			borderRight: 'none',
		},
		'& td:last-child': {
			borderLeft: 'none',
		},
	},
}));

const GroupsTable = ({ columns, data, onRowClick }) => {
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
						<div>

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

GroupsTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default GroupsTable;
