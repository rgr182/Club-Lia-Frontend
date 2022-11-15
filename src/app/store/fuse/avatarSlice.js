import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import {getActivities} from "../../main/apps/activities/store/activitiesSlice";
import {getGroups} from "../../main/apps/activities/store/groupSlice";
import jwtService from "../../services/jwtService";
import {registerError, registerReset, registerSuccess} from "../../main/apps/groups/store/groupSlice";
import {setUser, updateUserData, setUserAvatar} from "../../auth/store/userSlice";
import {getHomeworks} from "../../main/apps/homeworks/store/homeworkSlice";
import _ from "../../../@lodash";
import { showMessage } from 'app/store/fuse/messageSlice';


export const getAvatars = createAsyncThunk('avatarApp/avatar/getAvatars', async (type) =>{
    const response = await axios.get(process.env.REACT_APP_API + '/avatar', {
    });
    const data = await response.data;
    return data;
});

export const getDelivered = createAsyncThunk('avatarApp/avatar/getDelivered', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/tareas/entregadas',{
		// params:filterContacts
	});
	const data = await response.data;
	return data.data;
});

export const submitUpdateAvatar = (userId,avatarData) => async (dispatch, getState) => {
    return jwtService
        .setProfileImage({
            id: userId.id,
            avatarId: avatarData,
        })
        .then(response => {
            console.log(response);
            dispatch(setUserAvatar(response.data.avatar_path));
            dispatch(registerSuccess());
            dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));
        })
        .catch(error => {
            return dispatch(registerError(error));
            dispatch(showMessage({ message: 'Error al actualizar el Avatar', variant: 'error' }));
        });
};

const avatarAdapter = createEntityAdapter({});

export const { selectAll: selectAvatar } = avatarAdapter.getSelectors(
	state => state.fuse.avatar
);

const avatarSlice = createSlice({
    name: 'avatar',
    initialState: avatarAdapter.getInitialState({
        avatarLayout : {
            type: 'new',
            props: {
                open: false
            },
            data: null
        },
        avatar: {
            success: false,
            response: false,
            error: null
        },
        routeParams: {},
		delivered: 0
    }),
    reducers: {
        openAvatarLayout: (state, action) => {
            state.avatarLayout = {
                type: 'new',
                props: {
                    open: true
                },
                data: null
            };
        },
        closeAvatarLayout: (state, action) => {
            state.avatarLayout = {
                type: 'change',
                props: {
                    open: false
                },
                data: null
            };
        },
        registerSuccess: (state, action) => {
            state.avatarLayout = {
                success: true,
                props: {
                    open: false
                },
                response: action.payload,
            };
        },
        registerError: (state, action) => {
            state.homework = {
                success: false,
                error: action.payload,
                // error: true
            };
        },
    },
    extraReducers: {
        [getAvatars.fulfilled]: (state, action) => {
            const {data} = action.payload;
            avatarAdapter.setAll(state, data);
        },
        [getDelivered.fulfilled]: (state, action) => {state.delivered = action.payload},
    }
});

export const {
    openAvatarLayout,
    closeAvatarLayout,
} = avatarSlice.actions;

export default avatarSlice.reducer;