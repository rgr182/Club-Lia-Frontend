import React from "react";
import ReactExport from "react-export-excel";
import Icon from "@material-ui/core/Icon";
import {connect} from "react-redux";

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
            // dataset.forEach(
            //     item => console.log(item));
            return (
                <ExcelFile element={<Icon>cloud_download</Icon>}>
                    <ExcelSheet data={dataset} name="Usuarios">
                        <ExcelColumn label="Nombre(s)" value="name"/>
                        <ExcelColumn label="Apellido(s)" value="last_name"/>
                        <ExcelColumn label="Escuela" value="school_name"/>
                        <ExcelColumn label="Grado" value="grade"/>
                        <ExcelColumn label="Username" value="username"/>
                        <ExcelColumn label="Rol" value="role_name"/>
                        <ExcelColumn label="Email" value="email"/>
                        <ExcelColumn label="Último login" value="last_login"/>
                        <ExcelColumn label="Miembro desde" value="member_since"/>
                        <ExcelColumn label="Tipo de Licencia" value="license_type"/>
                        <ExcelColumn label="Fecha de expiración" value="expiration_date"/>
                    </ExcelSheet>
                </ExcelFile>
            );
        }
        return (<div></div>)
    }
}


const mapStateToProps = state => ({
    items: state.contactsApp.contacts.entities
});

export default connect(mapStateToProps, null)(Download);