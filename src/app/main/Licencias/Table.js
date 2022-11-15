import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});



export default function SimpleTable(data) {
	const classes = useStyles();
	let i = 0;
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center">Num</TableCell>
						<TableCell align="center">Validación</TableCell>
						<TableCell align="center">tipo_usuario</TableCell>
						<TableCell align="center">nombre</TableCell>
						<TableCell align="center">segundo_nombre</TableCell>
						<TableCell align="center">apellido_paterno</TableCell>
						<TableCell align="center">apellido_materno</TableCell>
						<TableCell align="center">email</TableCell>
						<TableCell align="center">Username</TableCell>
						<TableCell align="center">seccion</TableCell>
						<TableCell align="center">grado</TableCell>
						<TableCell align="center">nombre_padre_madre_o_tutor</TableCell>
						<TableCell align="center">mail_padre</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.data.map((row) => (
						<TableRow key={row.username}>
							<TableCell align="left">{++i}</TableCell>
							<TableCell align="left">{row.result}</TableCell>
							<TableCell align="left">{row.tipo_usuario}</TableCell>
							<TableCell align="left">{row.nombre}</TableCell>
							<TableCell align="left">{row.segundo_nombre}</TableCell>
							<TableCell align="left">{row.apellido_paterno}</TableCell>
							<TableCell align="left">{row.apellido_materno}</TableCell>
							<TableCell align="left">{row.email}</TableCell>
							<TableCell align="left">{row.username}</TableCell>
							<TableCell align="left">{row.seccion}</TableCell>
							<TableCell align="left">{row.grado}</TableCell>
							<TableCell align="left">{row.nombre_padre_madre_o_tutor}</TableCell>
							<TableCell align="left">{row.mail_padre}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}