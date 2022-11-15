import JwtService from 'app/services/jwtService';
import { showMessage } from 'app/store/fuse/messageSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import useStyles from './styles';

const CourseCard = ({ course }) => {
	const classes = useStyles();
	const {type: courseId} = useParams();
	const dispatch = useDispatch();
	const { name, card_image_url, price, description } = course;
	const [redirectUrl, setRedirectUrl] = useState('');
	const getUrl = useCallback(async () => {
		try {
			const url = await JwtService.getThinkificCourseRedirectUrl(courseId);
			setRedirectUrl(url)
		} catch (error) {
			dispatch(showMessage({message:"Ha ocurrido un error la url de informacion del curso",variant: 'error'}));
			console.log('>>: error > ', error)
			if(redirectUrl){
				setRedirectUrl('')
			}
		}
	}, [courseId]);
	useEffect(() =>{
		getUrl();
	}, [courseId]);

	return (
		<section className={classes.container}>
			<img src={card_image_url} alt={name} />
			<div className={classes.content}>
				<header className={classes.header}>
					<h3 className={classes.price}>{price.toLocaleString('en-US')}</h3>
					<span className={classes.notification}>( por hijo )</span>
				</header>
				<main>
					<h4 className={classes.title}>{name}</h4>
					<p className={classes.desc}>{description}</p>
				</main>
				{
					!!redirectUrl && (
						<a href={redirectUrl} className={classes.button}>
							Ver más
						</a>
					)
				}
			</div>
		</section>
	);
};

export default CourseCard;
