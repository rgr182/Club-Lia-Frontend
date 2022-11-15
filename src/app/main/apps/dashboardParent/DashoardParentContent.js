import React, { useEffect, useState, useRef, useCallback } from 'react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import {
    Card,
    makeStyles,
    Button,
    MenuItem,
    Icon,
    IconButton,
    Tooltip,
    CircularProgress,
    MuiThemeProvider,
    createMuiTheme,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Zoom,
    RadioGroup,
    Radio,
    FormControl,
    LinearProgress,
    Select,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import CoursesTable from './CoursesTable';
import { getCoursesList, getUrl } from './store/coursesSlice';
import { useForm } from '@fuse/hooks';
import Formsy from "formsy-react";
import { TextFieldFormsy, SelectFormsy } from "@fuse/core/formsy";
import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    card: {
        flexWrap: "wrap",
        display: "flex",
        width: "100%",
        padding: "20px 50px",
        margin: "5px 5px 25px 5px",
        borderRadius: '10px',
        fontFamily: "Poppins",
        fontStyle: "normal",
        color: '#353535',
        "-webkit-box-shadow": "0px 0px 15px 3px " + theme.palette.primary.light + "B3",
        boxShadow: "0px 0px 15px 3px " + theme.palette.primary.light + "B3",
        fontSize: '13px'
    },
    title: {
        color: theme.palette.primary.light,
        fontSize: "25px",
        fontFamily: `'grobold', 'rager'`,
    },
    subTitle: {
        color: theme.palette.primary.light,
        fontSize: "20px",
        fontFamily: 'Wendyone',
    },
    blueLabel: {
        background: '#DFF5FF',
        color: theme.palette.primary.light,
        fontWeight: '600'
    },
    select: {
        alignContent: "left",
        textAlign: "left",
        width: "100%",
        marginTop: "8px",
        marginRight: "7px",
        '& .MuiSelect-select': {
            borderRadius: "10px",
            background: "transparent",
            color: "#353535",
            height: "18px",
            border: "solid #BEBEBE 3px",
            fontFamily: 'Poppins',
            padding: '6px 3px',
            fontFamily: 'Poppins',
            '&:before, &:after, &:focus': {
                backgroundColor: 'transparent',
                border: "solid #BEBEBE 3px",
                content: 'none'
            },
            '&:hover': {
                border: "solid " + theme.palette.primary.light + " 3px",
            },
        },
        '& .Mui-focused': {
            borderColor: theme.palette.primary.main
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover': {
                borderColor: 'transparent'
            },
        },
        '&:before, &:after, &:focus': {
            border: 'transparent',
            content: 'none'
        },
        warnig: {
            fontSize: "13px",
            color: "#BEBEBE"
        },
    },
    pagination: {
        '& .MuiPaginationItem-root': {
            color: '#BEBEBE',
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            color: theme.palette.primary.light,
            backgroundColor: '#DFF5FF'
        }
    },
    headerImage: {
        backgroundSize: 'contain',
        backgroundImage: 'url("assets/images/backgrounds/banner-papas.png")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ['@media (max-width: 990px)']: {
            backgroundSize: 'cover',
            borderRadius: '14px',
            padding: '10px',
        },
    },
    whiteText: {
        color: '#fff',
        fontFamily: 'Wendyone',
        fontSize: '2.5rem',
    },
    buttonRed: {
        width: "128px",
        borderRadius: "26px",
        fontSize: '15px',
        background: 'linear-gradient(180deg, #EB32A5 0%, #F42771 100%)',
        '&:hover': {
            background: 'linear-gradient(to bottom, #dd2898, #cf2081, #bf1b6c, #ae1959, #9d1848)',
        },
    },
    progressBar: {
        borderRadius: "10px",
        '&.MuiLinearProgress-colorPrimary': {
            backgroundColor: '#C2C2C2',
        },
        '& .MuiLinearProgress-barColorPrimary': {
            borderRadius: "10px",
        },
    },
}));

export default function DashboardParentContent(props) {

    const classes = useStyles(props);
    const dispatch = useDispatch();

    const role = useSelector(({ auth }) => auth.user.role);
    const coursesList = useSelector(({ DashboardParentApp }) => DashboardParentApp.courses.courses);

    const [loading, setLoading] = useState(false);
    const [child, setChild] = useState('');
    const [page, setPage] = useState(1);

    const dataCard = [
        {
            src: 'assets/images/dashboard/course.png',
            name: 'nombre1'
        },
        {
            src: 'assets/images/dashboard/course.png',
            name: 'nombre2'
        },
        {
            src: 'assets/images/dashboard/course.png',
            name: 'nombre3'
        },
        {
            src: 'assets/images/dashboard/course.png',
            name: 'nombre4'
        },
        {
            src: 'assets/images/dashboard/course.png',
            name: 'nombre5'
        },
        {
            src: 'assets/images/dashboard/course.png',
            name: 'nombre6'
        },
        {
            src: 'assets/images/dashboard/course.png',
            name: 'nombre7'
        },
    ]

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Curso',
                accessor: 'course_name',
                sortable: true,
                Cell: ({ row }) => {
                    return (row.index + 1) + '. ' + row.original.course_name;
                },
            },
            {
                Header: 'Avance',
                accessor: 'percentage_completed',
                sortable: true,
                Cell: ({ row }) => {
                    return <div className='w-full flex items-center justify-center text-right pt-6 px-20'>
                        <LinearProgress
                            className={clsx(classes.progressBar, 'w-full h-10', (row.original.percentage_completed * 100 == 100 ? classes.greenProgressBar : ''))}
                            variant="determinate"
                            value={row.original.percentage_completed * 100}
                        />
                        <div className='w-128'>
                            {row.original.percentage_completed * 100 == 100 ? 'Completado' : parseFloat(row.original.percentage_completed * 100).toFixed(2) + '%'}
                        </div>
                    </div>;
                },
            },
        ],
        [dispatch]
    );

    useEffect(() => {
        setLoading(true);
        dispatch(getCoursesList()).then(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (coursesList && coursesList.length > 0) {
            setChild(0);
        }
    }, [coursesList]);


    const handleChildChange = (ev) => {
        setChild(ev.target.value);
    };

    return (
        <>
            <div>
                <FuseAnimateGroup className="flex flex-wrap justify-center" enter={{ animation: 'transition.slideUpBigIn' }}>
                    <Card elevation={1} className={classes.card}>
                        {loading ?
                            <div style={{ height: "600px" }} className="flex flex-1 flex-col items-center justify-center">
                                <div className="text-20 mb-16">
                                    Consultando información...
                                </div>
                                <CircularProgress color="primary" />
                            </div>
                            :
                            coursesList && coursesList.length > 0 ?
                                <>
                                    <div className="w-2/3 pt-10"></div>
                                    <div className="w-full md:w-1/3 pt-10">
                                        <Select id="child" name="child" className={classes.select} value={child} onChange={handleChildChange}>
                                            {coursesList.map((child, index) => (
                                                <MenuItem className='poppins' key={child.childName} value={index}>{child.childName}</MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="w-full pt-10">
                                        <h2 className={classes.subTitle}>Cursos de mi hijo</h2>
                                    </div>
                                    {coursesList[child] && coursesList[child].enrollments && coursesList[child].enrollments.length > 0 ?
                                        <div className='w-full pt-10'>
                                            <CoursesTable
                                                columns={columns}
                                                data={coursesList[child].enrollments}
                                                onRowClick={(ev, row) => {
                                                    if (row) {
                                                        ev.stopPropagation();
                                                    }
                                                }}
                                            />
                                        </div>
                                        :
                                        <>
                                            {role == 'Padre-I' ?
                                                <div className={clsx(classes.headerImage, 'flex flex-col w-full text-center items-center justify-center h-400 xl:h-512 my-24')}>
                                                    <Typography className={classes.whiteText}>
                                                        Unete a nuestra comunidad <br />
                                                        interactiva y segura  <br />
                                                        para el aprendizaje de tus hijos<br />
                                                    </Typography>
                                                    <Button to={`/apps/products/membresias`} component={Link} className={clsx(classes.whiteText, classes.buttonRed, "normal-case mt-10 poppins")}>
                                                        Ver planes
                                                    </Button>
                                                </div>
                                                :
                                                <div className="h-full">
                                                    <div className="mb-16" >
                                                        El alumno no está inscrito en algún curso.
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    }
                                    <div className="w-full pt-10">
                                        <h2 className={classes.subTitle}>Cursos recomendados</h2>
                                    </div>
                                    {(coursesList[child] && coursesList[child].courses && coursesList[child].courses.length > 0) &&
                                        <>
                                            {coursesList[child].courses.slice((page - 1) * 4, ((page - 1) * 4) + 4).map((item, index) => (
                                                <div className={'w-full md:w-1/2 pt-10 pb-20 ' + (index % 2 == 0 ? 'md:pr-20' : 'md:pl-20')} key={item.name}>
                                                    <Button
                                                        disableRipple
                                                        className='w-full normal-case p-0'
                                                        style={{ backgroundColor: 'transparent' }}
                                                        onClick={() => dispatch(getUrl(item.productable_id))}
                                                    >
                                                        <img
                                                            className='w-full h-288 xl:h-384 p-0'
                                                            src={item.src == "/assets/defaults/default-product-card.png" ? 'assets/images/dashboard/course.png' : item.card_image_url}
                                                        />
                                                    </Button>
                                                    <div className='pt-10'>{item.name}</div>
                                                </div>
                                            ))}
                                            <div className='flex justify-center w-full pt-10'>
                                                <Pagination
                                                    count={Math.floor(coursesList[child].courses.length / 4) + (coursesList[child].courses.length % 4 != 0 ? 1 : 0)}
                                                    page={page}
                                                    onChange={handlePageChange}
                                                    size="small"
                                                    className={classes.pagination}
                                                />
                                            </div>
                                        </>
                                    }
                                </>
                                :
                                <div style={{ height: "600px" }} className="flex flex-1 flex-col items-center justify-center">
                                    <div className="text-20 mb-16">
                                        No se encontró información.
                                    </div>
                                </div>
                        }
                        <div className="w-full pt-28"></div>
                    </Card>
                </FuseAnimateGroup>
            </div >
        </>
    )
}
