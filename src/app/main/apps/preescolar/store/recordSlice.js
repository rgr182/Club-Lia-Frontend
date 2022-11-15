import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
//Firebase
import db from '../../firebaseConfig';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
var liaStorage = 'Documents/classes/';
const st = getStorage();

export const getRecords = (path) => async dispatch => {
	const listRef = ref(st, liaStorage + path);
	const tam = path.split('/').length;

	listAll(listRef).then((res) => {
		var paths = [];
		if (tam < 5) {
			if (res.prefixes.length > 0) {
				res.prefixes.forEach((folderRef) => {
					paths.push(folderRef._location.path.substring(folderRef._location.path.lastIndexOf("/") + 1, folderRef._location.path.length));
				});
				dispatch(getNames({ paths: paths, type: tam }, liaStorage + path));
			} else {
				dispatch(setEmpty(tam));
			}
		} else {
			res.items.forEach((itemRef) => {
				paths.push({
					path: itemRef._location.path_,
					name: getNameRecord(itemRef._location.path_)
				});
			});
			dispatch(setRecords(paths));
		}
	}).catch((error) => {
		console.log(error);
		dispatch(setEmpty(tam));
	});
};

const getNameRecord = (path)=> {
	return path.substring(path.lastIndexOf("/") + 1, path.length)
		.replace(' Mon ', ' Lun ').replace(' Tue ', ' Mar ').replace(' Wed ', ' Mie ').replace(' Thu ', ' Jue ')
		.replace(' Fri ', ' Vie ').replace(' Sat ', ' Sab ').replace(' Sun ', ' Dom ').replace(' Dec ', ' Dic ')
		.replace(' Aug ', ' Ago ').replace(' Apr ', ' Abr ').replace(' Jan ', ' Ene ').replaceAll('-', ':');
};

export const getRecord = (record) => async dispatch => {
	const itemRef = ref(st, record.path);
	getDownloadURL(itemRef).then((downloadURL) => {
		dispatch(openRecordDialog({
			downloadURL: downloadURL,
			recordName: record.name
		}));
	}).catch((error) => {
		console.log(error);
	});
}

export const getNames = (params, relativePath) => async dispatch => {
	await axios.get(process.env.REACT_APP_API + '/aulaVirtual/getNames', {
		params: params
	}).then(response => {
		const data = response.data.data;
		const paths = {
			dir: data,
			relativePath: relativePath
		}
		switch (params.type) {
			case 4:
				return dispatch(setPathSubjects(paths));
		}
	}).catch(error => {
		console.log(error);
		dispatch(setEmpty(params.type));
	});
}

export const setEmpty = (tam) => (dispatch) => {
	switch (tam) {
		case 4:
			return dispatch(setPathSubjects([]));
	}
};

const recordsAdapter = createEntityAdapter({});

export const { selectAll: selectRecords, selectById: selectRecordsById } = recordsAdapter.getSelectors(
	state => state.RecordsApp.record
);

const recordSlice = createSlice({
	name: 'recordsApp/records',
	initialState: recordsAdapter.getInitialState({
		recordDialog: {
			props: {
				open: false
			},
			data: null
		},
		pathSubjects: null,
		records: null
	}),
	reducers: {
		openRecordDialog: (state, action) => {
			state.recordDialog = {
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeRecordDialog: (state, action) => {
			state.recordDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		setPathSubjects: (state, action) => {
			state.pathSubjects = action.payload;
			state.records = null;
		},
		setRecords: (state, action) => {
			state.records = action.payload;
		},
	},
});

export const {
	openRecordDialog,
	closeRecordDialog,
	setPathSubjects,
	setRecords,
} = recordSlice.actions;

export default recordSlice.reducer;
