import React from 'react';
import useStyles from './styles';
import { IGlobalStatus } from 'app/main/apps/users/models/UserModel';
import GlobalBadge from '../GlobalBadge';

const StatusHelper = () => {
	const classes = useStyles();

	const badges = [
		{ value: IGlobalStatus.POR_REVISAR.value, label: 'Cuando aun no se inicia la validacion de documentos' },
		{ value: IGlobalStatus.EN_PROCESO.value, label: 'Cuando se revisan los documentos y no todos estan corrector' },
		{
			value: IGlobalStatus.ACTUALIZADO.value,
			label: 'Cuando el tutor actualizo sus documentos incorrectors por unos nuevos'
		},
		{ value: IGlobalStatus.APROBADO.value, label: 'Cuando todos los documentos estan aprobados' }
	];

	return (
		<section className={classes.container}>
			<h2 className={classes.title}> Que significan los estatus?</h2>
			<div className={classes.content}>
				{badges.map(badge => (
					<>
						<GlobalBadge status={badge.value} />
						<p>{badge.label}</p>
					</>
				))}
			</div>
		</section>
	);
};

export default StatusHelper;
