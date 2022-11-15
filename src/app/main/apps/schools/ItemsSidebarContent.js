import FuseAnimate from '@fuse/core/FuseAnimate';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import {useDeepCompareEffect, useForm} from "../../../../@fuse/hooks";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {setSchoolFilter} from "./store/filterSlice";
import {  getInfo } from './store/itemSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from "@material-ui/core/Button";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(theme => ({
	formControl:{
		width:'95%',
		margin: 5,
		height:53
	}
}));

function ItemsSidebarContent(props) {

	const dispatch = useDispatch();
	const {form, setForm, handleChange} = useForm({school_active:true});
	const classes = useStyles(props);
	dispatch(setSchoolFilter(form));
	useDeepCompareEffect(() => {
		dispatch(getInfo());
	}, [dispatch,form]);

	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
					<div className="flex flex-1 items-center justify-between p-1 sm:p-1">
						<div className="flex flex-shrink items-center sm:w-224">
						<FormControl variant="outlined" className={classes.formControl}>
							<FormControlLabel
								control={
									<Switch checked={form.school_active}
											name="school_active"
											onChange={(event, newValue) => {
												event.target.name = 'school_active';
												event.target.value = newValue;
												handleChange(event);
											}}
									/>}
								label="Estatus Activo"
							/>
						</FormControl>
						</div>
					</div>
				</Paper>
			</FuseAnimate>
		</div>
	);
}

export default ItemsSidebarContent;
