import React from "react";
import ReactExport from "react-export-excel";
import Icon from "@material-ui/core/Icon";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;



function Download(props) {

        const dataset = Object.values(props.data);
        if(props.data) {
            return (
                <ExcelFile element={<Button
					variant="outlined" color="primary" style={{borderRadius: '40px', color: 'primary', borderColor: 'primary', textTransform: 'none'}}
					>
						Descargar reporte
					</Button>}>
                    <ExcelSheet data={dataset} name="Usuarios">
                        <ExcelColumn label="Nombre" value="user_name"/>
                        <ExcelColumn label="Estado" value="status"/>
                        <ExcelColumn label="Calificación" value="score"/>
                        <ExcelColumn label="Fecha de entrega" value="delivery_date"/>
                        <ExcelColumn label="Fecha de calificación" value="scored_date"/>
                    </ExcelSheet>
                </ExcelFile>
            );
        }
        return (<div></div>)
}

const mapStateToProps = state => ({
    items: state.HomeworksApp.homework
});

export default connect(mapStateToProps, null)(Download);