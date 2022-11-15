import React from 'react';
import _ from '@lodash';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import '../../../../../styles/newdesign.css';
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

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: '#60CEFF',
			color: theme.palette.common.white,
			fontSize: '13px',
		},
		body: {
			fontSize: '13px',
			height: 12,
			borderRadius: 6,
			margin: 2,

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
		}
	})
)(TableRow);

const useStyles = makeStyles(theme => ({
	table: {
		borderRadius: '1em 1em 1em 1em'
	},
	thead: {
	},
	tbody: {
	},
}));

const List = ({ columns, data, onRowClick }) => {
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
		useRowSelect
	);

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setPageSize(Number(event.target.value));
	};

	const classes = useStyles();

	return (

		<div className="flex flex-col min-h-full overflow-hidden">
			<TableContainer className="flex flex-1 students">
				<Table {...getTableProps()} stickyHeader className="tables">
					<TableHead className="tablesHead" classes={{ root: classes.thead }}e>
						{headerGroups.map(headerGroup => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<StyledTableCell
										align="left"
										// className="whitespace-no-wrap p-12"
										className="tablesTh colorAndPadding"
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
											<TableCell
												{...cell.getCellProps()}
												// className={clsx('p-12', cell.column.className)}
												className={i % 2 === 0 ? 'tablesTdB centerTableStudent centerTableStudent' : 'tablesTd centerTableStudent centerTableStudent'}
											>
												{cell.render('Cell')}
											</TableCell>
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

List.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default List;
