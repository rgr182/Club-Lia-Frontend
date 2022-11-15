import React from 'react';
import { useHistory } from 'react-router';
import useStyles from './styles';

const CourseCard = ({ course }) => {
	const classes = useStyles();
	const { card_image_url, name, description, price, link } = course;

	const history = useHistory();

	const navigateToCourse = () => history.push(`/apps/products/cursos/${course.id}`);

	return (
		<div className={classes.card}>
			<img src={card_image_url} alt={name} />
			<div className={classes.content}>
				<h3 className={classes.price}>{price}</h3>
				<main>
					<h4 className={classes.title}>{name}</h4>
					<p className={classes.desc}>{description}</p>
				</main>
				<footer className={classes.buttons}>
					<button type="button" onClick={navigateToCourse} className={classes.button}>
						Adquirir Curso
					</button>
					<a href={link} className={classes.button}>
						Ver Más
					</a>
				</footer>
			</div>
		</div>
	);
};

export default CourseCard;
