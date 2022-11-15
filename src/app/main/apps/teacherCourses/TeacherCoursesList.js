import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUrl } from './store/teacherCoursesSlice';
import TeacherCoursesSidebarContent from "./TeacherCoursesSidebarContent";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import { getCoursesList } from './store/teacherCoursesSlice';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Pagination } from '@material-ui/lab';
import _ from '@lodash';

const useStyles = makeStyles(() => ({
	title: {
		color: '#00B1FF',
		fontSize: '18px'
	},
	text: {
		color: '#353535',
		fontSize: '13px',
		fontFamily: 'poppins'
	},
	semiBoldText: {
		color: '#353535',
		fontSize: '13px',
		fontWeight: '600',
		fontFamily: 'poppins'
	},
	progressBar: {
		borderRadius: "10px",
		'&.MuiLinearProgress-colorPrimary': {
			backgroundColor: '#F5F5F5',
		},
		'& .MuiLinearProgress-barColorPrimary': {
			borderRadius: "10px",
		},
	},
	greenProgressBar: {
		'& .MuiLinearProgress-barColorPrimary': {
			backgroundColor: '#1CD17A',
		},
	},
	pagination: {
		'& .MuiPaginationItem-root': {
			color: '#BEBEBE',
		},
		'& .MuiPaginationItem-page.Mui-selected': {
			color: '#00B1FF',
			backgroundColor: '#DFF5FF'
		}
	},
	title1: {
		color: '#00B1FF',
		fontSize: '25px',
		fontFamily: `'grobold', 'rager'`,
	},
}));

function TeacherCoursesList(props) {

	const dispatch = useDispatch();
	let searchText = useSelector(({ fuse }) => fuse.input.texto);
	searchText = searchText ? searchText : '';
	const [filteredData, setFilteredData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [page2, setPage2] = useState(1);
	const progress = useSelector(({ TeacherCoursesApp }) => TeacherCoursesApp.filter.progress);
	const coursesList = useSelector(({ TeacherCoursesApp }) => TeacherCoursesApp.teacherCourses);
	const classes = useStyles();

	const divRef = useRef(null);

	useEffect(() => {
		setLoading(true);
		dispatch(getCoursesList()).then(() => {
			setLoading(false);
		});
	}, []);
	
	useEffect(() => {
		console.log(filteredData);
	}, [filteredData]);


	useEffect(() => {
		setPage(1);
		function getFilteredArray(coursesList, progress) {
			if (progress === '') {
				return coursesList;
			}
			return _.filter(coursesList, item => {
                if (progress == 2) {
					return item.percentage_completed != 0 && item.percentage_completed != 1 ?  item : false; 
                } else {
					return item.percentage_completed == progress ?  item : false; 
				}
            });
		}
		if (coursesList && coursesList.enrollments) {
			setFilteredData(getFilteredArray(coursesList.enrollments, progress));
		}
	}, [coursesList, progress]);

	const handlePageChange = (event, value) => {
		setPage(value);
		if (value != page) {
			divRef.current.scrollIntoView();
		}
	};
	const handlePageChange2 = (event, value) => {
		setPage2(value);
	};

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300} >
			<Card elevation={1} class="card3 h-full" ref={divRef}>
				<div className="flex flex-col flex-1 w-full mx-auto px-24">
					<TeacherCoursesSidebarContent />
					{filteredData && filteredData.length > 0 ?
						<FuseAnimateGroup className="flex w-full items-center flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }} >
							<>
								{filteredData.slice((page - 1) * 5, ((page - 1) * 5) + 5).map(enrollment => (
									<div className='w-full py-28'>
										<Typography className={classes.title}>{enrollment.course_name}</Typography>
										<div className='sm:inline-flex w-full text-left' key={enrollment.id}>
											<Button
												disableRipple
												className='w-full md:w-1/3 normal-case inline pr-20 pb-20 sm:pb-0 pl-0'
												style={{ backgroundColor: 'transparent' }}
												onClick={() => dispatch(getUrl(enrollment.course_id))}
											>
												<img
													className='w-full'
													src={enrollment.card_image_url == "/assets/defaults/default-product-card.png" ? 'assets/images/dashboard/course.png' : enrollment.card_image_url}
												/>
											</Button>
											<div className='w-full md:w-2/3'>
												<Typography className={classes.semiBoldText}>Progreso</Typography>
												<div className='w-full flex items-center justify-center text-right pt-6'>
													<LinearProgress
														className={clsx(classes.progressBar, 'w-full h-10', (enrollment.percentage_completed * 100 == 100 ? classes.greenProgressBar : ''))}
														variant="determinate"
														value={enrollment.percentage_completed * 100}
													/>
													<div className={clsx(classes.text, 'w-128')}>
														{enrollment.percentage_completed * 100 == 100 ? 'Completado' :  parseFloat(enrollment.percentage_completed * 100).toFixed(2) + '%'}
													</div>
												</div>
												<Typography className={clsx(classes.semiBoldText, 'pt-10')}>Fecha de inicio</Typography>
												<Typography className={clsx(classes.text, 'pt-6')}>
													{enrollment.started_at ? enrollment.started_at.split('T')[0].replaceAll('-', '/') : '-'}
												</Typography>
												<Typography className={clsx(classes.semiBoldText, 'pt-10')}>Fecha de finalización</Typography>
												<Typography className={clsx(classes.text, 'pt-6')}>
													{enrollment.completed_at ? enrollment.completed_at.split('T')[0].replaceAll('-', '/') : '-'}
												</Typography>
											</div>
										</div>
									</div>
								))}
								<div className='flex justify-center w-full'>
									<Pagination
										count={Math.floor(filteredData.length / 5) + (filteredData.length % 5 != 0 ? 1 : 0)}
										page={page}
										onChange={handlePageChange}
										size="small"
										className={classes.pagination}
									/>
								</div>
							</>
						</FuseAnimateGroup>
						:
						loading ?
							<div style={{ height: "600px" }} className="flex flex-1 flex-col items-center justify-center">
								<div className="text-20 mb-16">
									Consultando información...
								</div>
								<CircularProgress color="primary" />
							</div>
							:
							<div style={{ height: "600px" }} className="flex flex-1 flex-col items-center justify-center">
								<div className="text-20 mb-16">
									No se encontraron cursos
								</div>
							</div>
					}

					{/*coursesList && coursesList.courses && coursesList.courses.length > 0 &&
						<>
							<div className='flex justify-center pt-24 w-full'>
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<h2 className={classes.title1}>Cursos para tí</h2>
								</FuseAnimate>
							</div>
							<FuseAnimateGroup className="flex w-full items-center flex-wrap text-left" enter={{ animation: 'transition.slideUpBigIn' }} >
								<>
									{coursesList.courses.slice((page2 - 1) * 6, ((page2 - 1) * 6) + 6).map(course => (
										<div className='w-full md:w-1/3 p-10' key={course.id}>
											<Typography className={classes.title}>{course.name}</Typography>
											<Button
												disableRipple
												className='w-full normal-case'
												style={{ backgroundColor: 'transparent' }}
												onClick={() => dispatch(getUrl(course.productable_id))}
											>
												<img
													src={course.card_image_url == "/assets/defaults/default-product-card.png" ? 'assets/images/dashboard/course.png' : course.card_image_url}
												/>
											</Button>
										</div>
									))}
									<div className='flex justify-center w-full'>
										<Pagination
											count={Math.floor(coursesList.courses.length / 6) + (coursesList.courses.length % 6 != 0 ? 1 : 0)}
											page={page2}
											onChange={handlePageChange2}
											size="small"
											className={classes.pagination}
										/>
									</div>
								</>
							</FuseAnimateGroup>
						</>
					*/}
				</div>
			</Card>
		</FuseAnimate>
	);
}

export default TeacherCoursesList;
