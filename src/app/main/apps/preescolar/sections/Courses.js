import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import UserInfoHeader from '../components/UserInfoHeader';
import { isMobile } from 'react-device-detect';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Carousel from 'react-elastic-carousel';
import { getCoursesList, getUrl, setWish, deleteWish, makeWish } from '../store/coursesSlice';
import withReducer from 'app/store/withReducer';
import reducer from '../store';

const useStyles = makeStyles(theme => ({
    buttonCourse: {
        "&:hover": {
            transform: "scale(1.2)",
        },
        textTransform: 'none'
    },
    TextTitle: {
        fontFamily: ({ nivel, theme }) => nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`,
        fontSize: ({ nivel }) => (nivel == 2 ? '42px' : '32px'),
        color: 'white',
        textShadow: '2px 2px 2px black',
        textTransform: 'capitalize'
    },
    button: {
        '&:hover': {
            transform: 'scale(1.2) translateX(50px)'
        },
        justifyContent: 'left'
    },
    img: {
        maxHeight: '20%',
        maxWidth: '20%'
    },
    imgIcons: {
        width: '100%'
    },
    TextIcons: {
        fontFamily: ({ nivel, theme }) => nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`,
        fontSize: ({ nivel }) => (nivel == 2 ? '24px' : '18px'),
        color: 'white',
        textShadow: '2px 2px 2px black',
        text: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    Text: {
        fontFamily: ({ nivel }) => nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`,
        fontSize: ({ nivel }) => nivel == 2 ? "30px" : "20px",
        fontWeight: '500',
        color: 'white',
        textShadow: '2px 2px 2px black',
    },
    TextSubTitle: {
        fontSize: ({ nivel }) => nivel == 2 ? "34px" : "24px",
    },
    carousel: ({ color, isMoreThan3Carousel1 }) => ({
        "& .rec.rec-arrow": {
            [theme.breakpoints.up("lg")]: {
                visibility: !isMoreThan3Carousel1 ? 'hidden' : 'visible'
            },
            [theme.breakpoints.up("xl")]: {
                visibility: !isMoreThan3Carousel1 ? 'hidden' : 'visible'
            },
            backgroundColor: `rgb( ${color}, 0.4)`,
            "&:hover": {
                backgroundColor: `rgb( ${color}, 0.8)`,
            },
            "&:focus": {
                backgroundColor: `rgb( ${color}, 1)`,
            }
        },
        "& .rec.rec-dot": {
            [theme.breakpoints.up("lg")]: {
                visibility: !isMoreThan3Carousel1 ? 'hidden' : 'visible'
            },
            [theme.breakpoints.up("xl")]: {
                visibility: !isMoreThan3Carousel1 ? 'hidden' : 'visible'
            },
            backgroundColor: 'transparent',
            "&:hover": {
                boxShadow: `0 0 1px 3px rgb( ${color}, 0.5)`,
            },
            "&:focus": {
                boxShadow: `0 0 1px 3px rgb( ${color}, 1)`,
            }
        },
        "& .rec-dot_active": {
            boxShadow: `0 0 1px 3px rgb( ${color}, 1)`,
        }
    }),
    carousel2: ({ isMoreThan3Carousel2 }) => ({
        "& .rec.rec-arrow": {
            [theme.breakpoints.up("lg")]: {
                visibility: !isMoreThan3Carousel2 ? 'hidden' : 'visible'
            },
            [theme.breakpoints.up("xl")]: {
                visibility: !isMoreThan3Carousel2 ? 'hidden' : 'visible'
            },
        },
        "& .rec.rec-dot": {
            [theme.breakpoints.up("lg")]: {
                visibility: !isMoreThan3Carousel2 ? 'hidden' : 'visible'
            },
            [theme.breakpoints.up("xl")]: {
                visibility: !isMoreThan3Carousel2 ? 'hidden' : 'visible'
            },
        },
    }),
    favotiteButton: {
        position: 'absolute',
        right: '5px',
        top: '5px',
        fontWeight: 'bold',
        zIndex: 999
    },
}));


function Courses(props) {
    const dispatch = useDispatch();
    var role = useSelector(({ auth }) => auth.user.role);
    const grade = useSelector(({ auth }) => auth.user.grade);
    const isMuted = useSelector(({ fuse }) => fuse.sound.value);
    const level_id = useSelector(({ auth }) => auth.user.data.level_id);
    const coursesList = useSelector(({ CoursesApp }) => CoursesApp.courses.data);
    const [loading, setLoading] = useState(false);
    const [isMoreThan3Carousel1, setIsMoreThan3Carousel1] = useState(true);
    const [isMoreThan3Carousel2, setIsMoreThan3Carousel2] = useState(true);
    if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
        level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
    }
    const nivel = (role == 'alumno' && grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar' ? 0 : 1;

    const theme = {
        background: [
            'assets/images/preescolar/BackgroundPreescolar.png',
            'assets/images/preescolar/pantalla12.png',
            'assets/images/preescolar/BackgroundPrimariaAlta.png'
        ],
        island1: [
            'assets/images/preescolar/explorer2.png',
            'assets/images/preescolar/explorer.png',
            'assets/images/preescolar/MisTareasPLANETA.png'
        ],
        island2: [
            'assets/images/preescolar/islaMundoLIA.png',
            'assets/images/preescolar/comunicacion.png',
            'assets/images/preescolar/MiMundoLIA.png'
        ],
        island3: [
            'assets/images/preescolar/artes2.png',
            'assets/images/preescolar/artes.png',
            'assets/images/preescolar/MisClases.png'
        ],
        fonts: [
            'grobold',
            'haettenschweilerRegular',
        ],
    }

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 500, itemsToShow: 2 },
        { width: 850, itemsToShow: 3 },
    ]

    const colors = ['144, 119, 195', '80, 51, 90', '65, 37, 175'];
    const classes = useStyles({ nivel, theme, color: colors[nivel], isMoreThan3Carousel1, isMoreThan3Carousel2 });

    const carouselRef = React.useRef(null);
    const carousel2Ref = React.useRef(null);
    const onNextStart = (currentItem, nextItem) => {
        if (currentItem.index === nextItem.index) {
            carouselRef.current.goTo(0);
        }
    };
    const onPrevStart = (currentItem, nextItem) => {
        if (currentItem.index === nextItem.index) {
            carouselRef.current.goTo(coursesList.enrollments.length);
        }
    };
    const onNextStart2 = (currentItem, nextItem) => {
        if (currentItem.index === nextItem.index) {
            carousel2Ref.current.goTo(0);
        }
    };
    const onPrevStart2 = (currentItem, nextItem) => {
        if (currentItem.index === nextItem.index) {
            carousel2Ref.current.goTo(coursesList.courses.length);
        }
    };
    
    const setFavorite = (ev, index, course) => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
        dispatch(setWish(index));
        course.wish ? dispatch(deleteWish(course.id)) : dispatch(makeWish(course.id));
    };

	const history = useHistory();
	function redirectMiMundoLia() {
		if (nivel == 0) {
			window.location.href = process.env.REACT_APP_API.split('api')[0] + "lia-kinder";
		} else {
			history.push('/loginp');
		}
	}

    useEffect(() => {
        setLoading(true);
        dispatch(getCoursesList()).then(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        coursesList.enrollments && coursesList.enrollments.length > 3 ? setIsMoreThan3Carousel1(true) : setIsMoreThan3Carousel1(false);
        coursesList.courses && coursesList.courses.length > 3 ? setIsMoreThan3Carousel2(true) : setIsMoreThan3Carousel2(false);
    }, [coursesList]);

    return (
        <div
            className="flex-1"
            style={{
                backgroundImage: `url(${theme.background[nivel]})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }} >
                {!isMobile && <LogoutButton />}
                <div className="float flex w-full flex-wrap ">
                    <div className="flex w-full md:w-1/2">
                        <Button
                            className={clsx(classes.button)}
                            style={{ backgroundColor: 'transparent' }}
                            to="/apps/landing"
                            component={Link}
                            type="button"
                        >
                            <img className={clsx(classes.img, 'p-24')} src={'assets/images/preescolar/cursos-isla.png'} />
                            <Typography className={clsx(classes.TextTitle)}>Mis Cursos</Typography>
                        </Button>
                    </div>
                    {/* ------------------------- Avatar and User Info --------------------- */}
                    <div className="flex w-full md:w-1/2 items-center justify-center flex-wrap flex-row">
                        <UserInfoHeader />
                    </div>
                </div>
                <Grid container className="flex flex-row m-20" spacing={0}>
                    <Grid item xs={12} sm={1} className="flex">
                        <Grid container className="flex w-full flex-col" spacing={1}>
                            {nivel != 0 && (
                                <Grid item xs={3} className="flex flex-col items-center justify-center max-w-400">
                                    <Button to="/apps/galaxies/MisGalaxias" component={Link} type="button">
                                        <div className="flex flex-col">
                                            <img className={clsx(classes.imgIcons, 'flex w-full')} src="assets/images/preescolar/MisgalaxiasFinal.png" />
                                            <Typography className={clsx(classes.TextIcons)}>
                                                Mi Galaxia LIA
                                            </Typography>
                                        </div>
                                    </Button>
                                </Grid>
                            )}
                            <Grid item xs={3} className="flex flex-col items-center justify-center max-w-400">
                                <Button onClick={redirectMiMundoLia} component={Link} type="button">
                                    <div className="flex flex-col">
                                        <img className={clsx(classes.imgIcons, 'flex w-full')} src={theme.island2[nivel]} />
                                        <Typography className={clsx(classes.TextIcons)}>Mi Mundo Lia</Typography>
                                    </div>
                                </Button>
                            </Grid>
                            <Grid item xs={3} className="flex flex-col items-center justify-center max-w-400">
                                <Button to="/apps/sections/calendario" component={Link} type="button">
                                    <div className="flex flex-col">
                                        <img className={clsx(classes.imgIcons, 'flex w-full')} src={theme.island3[nivel]} />
                                        <Typography className={clsx(classes.TextIcons)}>Mis Clases</Typography>
                                    </div>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={11} className="flex w-full items-center flex-wrap">
                        {coursesList && coursesList.enrollments && coursesList.enrollments.length > 0 ?
                            <FuseAnimateGroup className="flex w-full items-center flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }} >
                                <Carousel
                                    itemsToShow={3}
                                    className={clsx(classes.carousel, "text-center px-40")}
                                    ref={carouselRef}
                                    onPrevStart={onPrevStart}
                                    onNextStart={onNextStart}
                                    disableArrowsOnEnd={false}
                                    breakPoints={breakPoints}
                                >
                                    {coursesList.enrollments.map(enrollment => (
                                        <div key={enrollment.id}>
                                            <Button
                                                disableRipple
                                                className={clsx(classes.buttonCourse, 'inline m-10')}
                                                style={{ backgroundColor: 'transparent' }}
                                                onClick={() => dispatch(getUrl(enrollment.course_id))}
                                                type="button"
                                            >
                                                <img
                                                    className='w-320 h-192'
                                                    src={enrollment.card_image_url == "/assets/defaults/default-product-card.png" ? 'assets/images/dashboard/course.png' : enrollment.card_image_url}
                                                />
                                                <Typography className={clsx(classes.Text)}>{enrollment.course_name}</Typography>
                                            </Button>
                                        </div>
                                    ))}
                                </Carousel>
                            </FuseAnimateGroup>
                            :
                            loading ?
                                <div className='w-full text-center h-256 p-80 px-256'>
                                    <Typography className={clsx(classes.Text, 'pb-20')}>Cargando...</Typography>
                                    <LinearProgress color="secondary" />
                                </div>
                                :
                                <div className='w-full text-center h-256 p-80'>
                                    <Typography className={clsx(classes.Text)}>No se encontraron cursos</Typography>
                                </div>
                        }

                        <div className='w-full text-center'>
                            <Typography className={clsx(classes.Text, classes.TextSubTitle)}>Cursos que te pueden gustar</Typography>
                        </div>

                        {coursesList && coursesList.courses && coursesList.courses.length > 0 ?
                            <FuseAnimateGroup className="flex w-full items-center flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }} >
                                <Carousel
                                    itemsToShow={3}
                                    className={clsx(classes.carousel, classes.carousel2, "text-center px-40")}
                                    ref={carousel2Ref}
                                    onPrevStart={onPrevStart2}
                                    onNextStart={onNextStart2}
                                    disableArrowsOnEnd={false}
                                    breakPoints={breakPoints}
                                >
                                    {coursesList.courses.map((course, index) => (
                                        <div key={course.id}>
                                            <Button
                                                disableRipple
                                                className={clsx(classes.buttonCourse, 'inline m-10')}
                                                style={{ backgroundColor: 'transparent', zIndex: 1 }}
                                                onClick={() => dispatch(getUrl(course.productable_id))}
                                                type="button"
                                            >
                                                <img
                                                    className='w-320 h-192'
                                                    src={course.card_image_url == "/assets/defaults/default-product-card.png" ? 'assets/images/dashboard/course.png' : course.card_image_url}
                                                />
                                                <Typography className={clsx(classes.Text)}>{course.name}</Typography>
                                                <IconButton className={classes.favotiteButton} onClick={ev => setFavorite(ev, index, course)}>
                                                    {course.wish ?
                                                        <Icon style={{ color: '#ff1744 ' }}>favorite</Icon>
                                                        :
                                                        <Icon style={{ color: '#bebebe ' }}>favorite_border</Icon>
                                                    }
                                                </IconButton>
                                            </Button>
                                        </div>
                                    ))}
                                </Carousel>
                            </FuseAnimateGroup>
                            :
                            loading ?
                                <div className='w-full text-center h-256 p-80 px-256'>
                                    <Typography className={clsx(classes.Text, 'pb-20')}>Cargando...</Typography>
                                    <LinearProgress color="secondary" />
                                </div>
                                :
                                <div className='w-full text-center h-256 p-80'>
                                    <Typography className={clsx(classes.Text)}>No se encontraron cursos</Typography>
                                </div>
                        }
                    </Grid>
                </Grid>

            </FuseAnimateGroup>

        </div>
    );
}

export default withReducer('CoursesApp', reducer)(Courses);
