import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { getEventWithoutColor } from '../../preescolar/sections/Fetch';
import moment from 'moment';
import request from 'superagent';
import { RRule, RRuleSet, rrulestr } from 'rrule';


export const getClasesInfo = createAsyncThunk('DashboardMaestrosApp/clases/getClasesInfo', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/clases',{
	});
	const data = await response.data;

	return data;
});

export const getEvents = (callback, apiKey, data ) => async dispatch => {
	
	var events = [];
	for (let i = 0; i < data.length; i++) {
		let GOOGLE_CALENDAR_URL = 'https://www.googleapis.com/calendar/v3/calendars/' + data[i].calendar_id.toString() + '/events?key=' + apiKey.toString();
        let group_name = data[i].group_name;		
		request.get(GOOGLE_CALENDAR_URL)
			.then(res => {
				
				var helperResponse = JSON.parse(res.text);
				if (helperResponse.items.length > 0) {
					for (var x = 0; x < helperResponse.items.length; x++) {
						if (helperResponse.items[x].hasOwnProperty('recurrence') == true) {
							var helperDate = moment(helperResponse.items[x].start.dateTime.toString()).format('YYYYMMDD[T]HHmmss');
							var rule = RRule.fromString(helperResponse.items[x].recurrence.toString() + ';DTSTART=' + helperDate);
							var datesEvent = rule.all().toString().split(',');
							for (var i = 0; i < datesEvent.length; i++) {
								var timeStringStart = moment(helperResponse.items[x].start.dateTime.toString()).format('hh:mm:ss a');
								var timeStringEnd = moment(helperResponse.items[x].end.dateTime.toString()).format('hh:mm:ss a');
								var dateString = moment(datesEvent[i].toString()).format('YYYY-MM-DD');
								var initDate = dateString + ' ' + timeStringStart;
								var endDate = dateString + ' ' + timeStringEnd;
								events.push({
									title: helperResponse.items[x].summary.toString(),
									id: helperResponse.items[x].id,
									start: new Date(initDate.toString()),
									end: new Date(endDate.toString()),
									description: helperResponse.items[x].hasOwnProperty('description') == true ? helperResponse.items[x].description : '',
									group: group_name
								});
							}
						} else {
							events.push({
								title: helperResponse.items[x].summary.toString(),
								id: helperResponse.items[x].id,
								start: new Date(helperResponse.items[x].start.dateTime.toString()),
								end: new Date(helperResponse.items[x].end.dateTime.toString()),
								description: helperResponse.items[x].hasOwnProperty('description') == true ? helperResponse.items[x].description : '',
								group: group_name
							});
						}
					}
				}
				callback(events);
			})
			.catch(err => {
				alert('ERROR GETTING DATA FROM GOOGLE');
			});	
		}
};

const clasesSlice = createSlice({
	name: 'DashboardMaestrosApp/clases',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getClasesInfo.fulfilled]: (state, action) => action.payload,		
	}
});

export default clasesSlice.reducer; 