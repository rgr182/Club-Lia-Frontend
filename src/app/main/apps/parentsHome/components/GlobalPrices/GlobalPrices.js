import React from 'react';
import GlobalPriceCard from '../GlobalPriceCard/GlobalPriceCard';
import pricesPacks from './pricesPacks';
import useStyles from './styles';

const GlobalPrices = () => {
	const classes = useStyles();
	const PRICE = '2000';
	const LINK = '#';

	return (
		<>
			<header className={classes.message}>
				<p>
					Inscripción: <span>{PRICE.toLocaleString('en-US')}</span>
				</p>
			</header>
			<main className={classes.prices}>
				{pricesPacks.map((pack, index) => (
					<GlobalPriceCard key={index} content={pack} />
				))}
			</main>
			<a className={classes.button} href={LINK}>
				Agenda tu cita
			</a>
		</>
	);
};

export default GlobalPrices;
