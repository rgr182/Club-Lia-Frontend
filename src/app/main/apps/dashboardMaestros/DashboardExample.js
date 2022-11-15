import React, { useEffect, useState } from 'react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Jumbotron, Button } from 'reactstrap';

const useStyles = makeStyles(theme => ({
    divTop: {        
        width: "100%",
        paddingStart: "5px",
        display: "flex"   
    },    
    grupo: {
        marginStart: "15px",
        width: "100px",
        borderRadius: "4px",
        background: "white",
        height: "25px"
    },
    tableDashboard: {
        textAlign: "center",        
        width: "100%"
    },    
    cardDashboard: {
        height: "250px",
        padding: "12px",
        borderRadius: "15px",
        border: "solid #5557BD 4px"
    },    
    divDashboard: {
        width: "100%",
        display: "flex",
        justifyContent: "end"
    },
    btnDashboard: {
        height: "25px !important",
        marginTop: "10px",
        backgroundColor: "#5557BD", 
        color: "white"       
    },
    iconPlus: {
        marginStart: "5px"
    },
    select: {
        marginStart: "15px",
        width: "150px",
        borderRadius: "4px",
        background: "lightblue",
        height: "25px",
        marginTop: "8px"
    },
    divSelect: {
        width: "30px"
    },
    tableComunidad: {
        marginTop: "10px"
    },
    h1: {
        marginStart: "15px"        
    }
}));

export default function DashboardContent(props) {
    const classes = useStyles(props);
    const [last, setLast] = useState([]);
    const [down, setDown] = useState([]);
    const [top, setTop] = useState([]);    
    // useEffect(() => {
        
    //     getInfo();         
    // }, []); 
    const getInfo = (id) => {
        axios.post(process.env.REACT_APP_API + '/dashboard/homework', {
            idGroup: ""
        }).then(data => {
            setLast(data.data.data.lastHomeworks);
            setDown(data.data.data.downHomeworks);
            setTop(data.data.data.topHomeworks); 
            console.log(data);
        }).catch(error => {
            console.log(error.message);                
        });
    }

    return (
        <FuseAnimateGroup
            className="flex flex-wrap justify-center"
            enter={{
                animation: 'transition.slideUpBigIn'
            }}
        >

            <div className={classes.divTop}>
                <Typography>GRUPO</Typography>
                <select className={classes.grupo}>
                    <option>3RO A</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <button onClick={(e) => getInfo(453)}>Grupo</button>
                <button onClick={(e) => getInfo(0)}>Sin grupo</button>
            </div>
            <div className="widget flex w-full sm:w-1 md:w-1/3 p-6">
                <div className="w-full">                    
                    <Typography>
                        TAREAS
                    </Typography>
                    <Card elevation={1} className={classes.cardDashboard}>
                        
                        <Table class={classes.tableDashboard}>
                            <thead>
                                <tr>                                    
                                    <th scope="col">TAREA</th>
                                    <th scope="col">ENTREGADAS</th>
                                    <th scope="col">PENDIENTES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>        
                                    <td>{last ? last.map((data) => (<p>{data.name}</p>)): null}</td>
                                    <td>{last ? last.map((data) => (<p>{data.Entregado}</p>)): null}</td>
                                    <td>{last ? last.map((data) => (<p>{data.NoEntregado}</p>)): null}</td>
                                </tr>                                
                            </tbody>
                        </Table>
                    </Card>
                    {/* <div className={classes.divDashboard}>
                        <Button variant="contained" className={classes.btnDashboard}>VER MÁS<FontAwesomeIcon className={classes.iconPlus} icon={faPlus} /></Button>
                    </div> */}
                </div>
			</div>
            <div className="widget flex w-full sm:w-1 md:w-1/3 p-6">
                <div className="w-full">
                    <Typography className="mt-5">
                        CLASES
                    </Typography>
                    <Card elevation={1} className={classes.cardDashboard}>
                        <Table class={classes.tableDashboard}>
                            <thead>
                                <tr>
                                    <th scope="col">CLASE</th>
                                    <th scope="col">GRUPO</th>
                                    <th scope="col">FECHA</th>
                                    <th scope="col">HORA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>                                    
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                    {/* <div className={classes.divDashboard}>
                        <Button variant="contained" className={classes.btnDashboard}>VER MÁS<FontAwesomeIcon className={classes.iconPlus} icon={faPlus} /></Button>
                    </div> */}
                </div>
			</div>
            <div className="widget flex w-full sm:w-1 md:w-1/3 p-6">
                <div className="w-full">
                    <Typography>
                        ALUMNOS
                    </Typography>
                    <Card elevation={1} className={classes.cardDashboard}>
                        <Table class={classes.tableDashboard}>
                            <thead>
                                <tr>
                                    <th scope="col">ALUMNO</th>
                                    <th scope="col">T.ENTREGADAS</th>
                                    <th scope="col">T.PENDIENTES</th>
                                    <th scope="col">PROMEDIO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>                                    
                                </tr>
                            </tbody>
                        </Table>                    
                    </Card>
                    {/* <div className={classes.divDashboard}>
                        <Button variant="contained" className={classes.btnDashboard}>VER MÁS<FontAwesomeIcon className={classes.iconPlus} icon={faPlus} /></Button>
                    </div> */}
                </div>
			</div>
            <div className="widget flex w-full sm:w-1 md:w-1/3 p-6">
                <div className="w-full">
                    <Typography>
                        CURSOS
                    </Typography>
                    <Card elevation={1} className={classes.cardDashboard}>
                        <div className={classes.divSelect}>
                            <select className={classes.select}>
                                <option>MIS CURSOS</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <select className={classes.select}>
                                <option>EVENTOS LIA</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <h1 class={classes.h1}>
                            MI COMUNIDAD
                        </h1>
                        <Table class={classes.tableDashboard}>
                            <thead>
                                <tr>                                    
                                    <th scope="col">Likes</th>
                                    <th scope="col">Share</th>
                                    <th scope="col">Publicaciones</th>
                                    <th scope="col">Colicitudes</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                <tr>                                    
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>                                
                            </tbody> */}
                        </Table>
                    </Card>
                    {/* <div className={classes.divDashboard}>
                        <Button variant="contained" className={classes.btnDashboard}>VER MÁS<FontAwesomeIcon className={classes.iconPlus} icon={faPlus} /></Button>
                    </div> */}
                </div>
			</div>
            <div className="widget flex w-full sm:w-1 md:w-1/3 p-6">
                <div className="w-full">
                    <Typography>
                        EVENTOS LIA
                    </Typography>
                    <Card elevation={1} className={classes.cardDashboard}>
                        <div className={classes.divSelect}>
                            <select className={classes.select}>
                                <option>MIS CURSOS</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <select className={classes.select}>
                                <option>EVENTOS LIA</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <h1 class={classes.h1}>
                            MI COMUNIDAD
                        </h1>
                        <Table class={classes.tableDashboard}>
                            <thead>
                                <tr>                                    
                                    <th scope="col">Likes</th>
                                    <th scope="col">Share</th>
                                    <th scope="col">Publicaciones</th>
                                    <th scope="col">Colicitudes</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                <tr>                                    
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>                                
                            </tbody> */}
                        </Table>
                    </Card>
                    {/* <div className={classes.divDashboard}>
                        <Button variant="contained" className={classes.btnDashboard}>VER MÁS<FontAwesomeIcon className={classes.iconPlus} icon={faPlus} /></Button>
                    </div> */}
                </div>
			</div>
            <div className="widget flex w-full sm:w-1 md:w-1/3 p-6">
                <div className="w-full">
                    <Typography>
                        COMUNIDAD
                    </Typography>
                    <Card elevation={1} className={classes.cardDashboard}>
                        <div className={classes.divSelect}>
                            <select className={classes.select}>
                                <option>MIS CURSOS</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <select className={classes.select}>
                                <option>EVENTOS LIA</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <h1 class={classes.h1}>
                            MI COMUNIDAD
                        </h1>
                        <Table class={classes.tableDashboard}>
                            <thead>
                                <tr>                                    
                                    <th scope="col">Likes</th>
                                    <th scope="col">Share</th>
                                    <th scope="col">Publicaciones</th>
                                    <th scope="col">Colicitudes</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                <tr>                                    
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>                                
                            </tbody> */}
                        </Table>
                    </Card>
                    {/* <div className={classes.divDashboard}>
                        <Button variant="contained" className={classes.btnDashboard}>VER MÁS<FontAwesomeIcon className={classes.iconPlus} icon={faPlus} /></Button>
                    </div> */}
                </div>
			</div>

        </FuseAnimateGroup>
    )
}