import React from 'react';
import useOptions from '../../hooks/useOptions';
import useStyles from './styles';

const Banner = () => {
	const classes = useStyles();
	const { currentOption } = useOptions();
	const { image, value, video } = currentOption;
	const imageURL = `assets/images/logos/${image}`;
	// 	const videoURL = `assets/videos/parent/${video}`;
	const videoURL = `assets/videos/tutorial primaria.mp4`;

	return (
		<section className={classes.container}>
			<img src={imageURL} alt={value} className={classes.img} />
			<video muted controls className={classes.video}>
				<source src={videoURL} type="video/mp4" />
			</video>
		</section>
	);
};

export default Banner;
