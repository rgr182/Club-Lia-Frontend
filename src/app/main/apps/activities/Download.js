import React from "react";
import ReactExport from "react-export-excel";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component {
    constructor(props) {
        super(props);
        const {items} = props;
        this.state = {
            items
        };
    }
    componentWillReceiveProps(nextProps) {
        const { itmes } = this.state;
        this.setState({itmes:itmes });

    }
    render() {
        const dataset = Object.values(this.props.items);
        if(this.props.items) {
            return (
                <ExcelFile element={
                    <Button
                        variant="contained"
                        color="primary"
                    >Descargar</Button>
                }>
                    { dataset.map( (item, index) =>
                        <ExcelSheet 
                            data={item} 
                            name={ item[0] ? this.props.downloadType == 'group' ? item[0].activity_name : item[0].name : 'Hoja' + (index + 1).toString()}
                            key={index}
                        >
                            <ExcelColumn label="Nombre" value="name"/>
                            <ExcelColumn label="Nombre Tarea" value="activity_name"/>
                            <ExcelColumn label="Estado" value="status"/>
                            <ExcelColumn label="Calificación" value="score"/>
                            <ExcelColumn label="Fecha Limite" value="finish_date"/>
                            <ExcelColumn label="Fecha Entrega" value="delivery_date"/>
                            <ExcelColumn label="Fecha Calificado" value="scored_date"/>
                        </ExcelSheet>
                    )}
                </ExcelFile>
            );
        }
        return (<div></div>)
    }
}


const mapStateToProps = state => ({
    items: state.ActivitiesApp.activities.groupHomeworks.data
});

export default connect(mapStateToProps, null)(Download);