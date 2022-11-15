import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { showMessage } from "../../../../store/fuse/messageSlice";

export const getMiTarea = createAsyncThunk('miTareaApp/miTarea/getMiTareasData', async (params) => {
	const response = await axios.get(process.env.REACT_APP_API+'/tarea/'+params.id);
    const data = await response.data;
	if(data.data.dataBadges.length > 0){
		var bad = JSON.parse(data.data.dataBadges[0].badges_data);
		data.data.dataBadges = bad;
	}
	return data;
});

export const submitUploadFile = ( params, data, file, fileType, urlPath ) => async dispatch => {
	
	const today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + ('0'+( today.getMinutes() + 1)).slice(-2);

    return jwtService
		.updateDelivery({
            id: params.id,
			filePath: fileType == 'file' || fileType == 'urlfile' ? data.file_path ? data.file_path : '' : '',
			urlPath: fileType == 'url' || fileType == 'urlfile' ? urlPath.length > 0 ? JSON.stringify(urlPath) : data.url_path : '',
			files: fileType == 'file' || fileType == 'urlfile' ? file : null,
			deliveryDate: date,
		})
		.then(delivery => {
			dispatch(getMiTarea(params));
			dispatch(showMessage({message: 'Tarea enviada',variant: 'success'	}));
		})
		.catch(error => {
			dispatch(showMessage({message: 'No se pudo entregar la tarea', variant: 'error'}));
		});

};

const miTareaAdapter = createEntityAdapter({});

export const { selectAll: selectMiTarea, selectById: selectMiTareaById } = miTareaAdapter.getSelectors(
	state => state.MiTareaApp.miTarea
);

const miTareaSlice = createSlice({
	name: 'MiTareaApp/miTarea',
	initialState: miTareaAdapter.getInitialState({
		miTareaDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		resourceDialog: {
			props: {
				open: false
			},
			data: null
		},
	}),
	reducers: {
		openMiTareaDialog: (state, action) => {
			state.miTareaDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMiTareaDialog: (state, action) => {
			state.miTareaDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openResourceDialog: (state, action) => {
			state.resourceDialog = {
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeResourceDialog: (state, action) => {
			state.resourceDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[getMiTarea.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			state.data = data;
		}
	}
});

export const {
	openMiTareaDialog,
	closeMiTareaDialog,
	openResourceDialog,
	closeResourceDialog,
} = miTareaSlice.actions;

export default miTareaSlice.reducer;