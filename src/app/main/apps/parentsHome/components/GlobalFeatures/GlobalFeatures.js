import React from 'react';
import useStyles from './styles';

const GlobalFeatures = () => {
	const classes = useStyles();
	const items = [
		'Programa y metodología Global Schooling',
		'Acceso a clases, calendario, aula virtual, tareas, galaxia LIA y grupos de trabajo',
		'Acceso a plataforma LIA',
		'Experiencias de aprendizaje incluidas',
		'Acceso a todos los cursos de Membresía LIA U para Alumnos',
		'Participación en comunidad LIA',
		'Acceso a los cursos de membresía LIA U para Padres'
	];

	return (
		<>
			<h1>Qué incluye?</h1>
			<ul className={classes.list}>
				{items.map((content, key) => (
					<li key={key} className={classes.item}>
						<img src="assets/images/logos/check.svg" alt="✅" />
						{content}
					</li>
				))}
			</ul>
		</>
	);
};

export default GlobalFeatures;
