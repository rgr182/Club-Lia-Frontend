import React from "react";
import ReactExport from "react-export-excel";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = () => ({
    button: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        borderRadius: "45px",
        background: "transparent",
        color: "#00B1FF",
        height: "35px",
        marginTop: "8px",
        marginRight: "7px",
        border: "solid #00B1FF 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        textTransform: 'none',
        fontSize: '13px',
        '&:hover': {
            background: "#60CEFF",
            color: "#fff",
            borderColor: "#60CEFF",

        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5',
        }
    }
});

class Download extends React.Component {

    constructor(props) {
        super(props);
        const { average } = props;
        this.state = {
            average
        };
    }
    componentWillReceiveProps(nextProps) {
        const { average } = this.state;
        this.setState({ average: average });

    }
    render() {
        const { classes } = this.props;
        if (this.props.average) {
            const average = Object.values(this.props.average);
            return (

                <ExcelFile element={
                    <Button className={classes.button}>
                        Descargar reporte
                    </Button>
                }>
                    <ExcelSheet data={average} name={'Promedio general por materia'} >
                        <ExcelColumn label="Nombre" value="name" />
                        <ExcelColumn label="Grupo" value="group" />
                        <ExcelColumn label="Materia" value="subject" />
                        <ExcelColumn label="Promedio" value="average" />
                    </ExcelSheet>
                </ExcelFile>
            );
        }
        return (<></>)
    }
}


const mapStateToProps = state => ({
    average: state.GroupsApp.student.student,
});

export default connect(mapStateToProps, null)(withStyles(useStyles)(Download));