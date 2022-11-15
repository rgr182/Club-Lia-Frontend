import request from 'superagent';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import moment from 'moment';
import 'moment/locale/es';
export function getEvents(callback, apiKey, idCalendar, color, custom_name) {
    let GOOGLE_CALENDAR_URL = 'https://www.googleapis.com/calendar/v3/calendars/' + idCalendar +'/events?key=' + apiKey;
    request.get(GOOGLE_CALENDAR_URL)
        .then(res => {
            const events = [];
            var helperResponse = JSON.parse(res.text);
            if(helperResponse.items.length > 0) {
                for (var x = 0; x < helperResponse.items.length; x++) {
                    if(helperResponse.items[x].hasOwnProperty('recurrence') == true) {
                        var helperDate =  moment(helperResponse.items[x].start.dateTime.toString()).format('YYYYMMDD[T]HHmmss');
                        var rule = RRule.fromString(helperResponse.items[x].recurrence.toString() + ';DTSTART=' + helperDate);
                        var datesEvent = rule.all().toString().split(',');
                        for (var i = 0; i < datesEvent.length; i++) {
                            var timeStringStart = moment(helperResponse.items[x].start.dateTime.toString()).format('hh:mm:ss a');
                            var timeStringEnd = moment(helperResponse.items[x].end.dateTime.toString()).format('hh:mm:ss a');
                            var dateString = moment(datesEvent[i].toString()).format('YYYY-MM-DD');
                            var initDate = dateString + ' ' + timeStringStart;
                            var endDate = dateString + ' ' + timeStringEnd;
                            events.push({
                                title: custom_name ? custom_name.toString() : helperResponse.items[x].summary.toString(),
                                start: new Date(initDate.toString()),
                                end: new Date(endDate.toString()),
                                customColor: color.toString(),
                                description: helperResponse.items[x].hasOwnProperty('description') == true ? helperResponse.items[x].description : ''
                            });
                        }
                    } else {
                        events.push({
                            title: custom_name ? custom_name.toString() : helperResponse.items[x].summary.toString(),
                            start: new Date(helperResponse.items[x].start.dateTime.toString()),
                            end: new Date(helperResponse.items[x].end.dateTime.toString()),
                            customColor: color.toString(),
                            description: helperResponse.items[x].hasOwnProperty('description') == true ? helperResponse.items[x].description : ''
                        });
                    }
                }
                callback(events);
            }
        })
        .catch(err => {
            alert('ERROR GETTING DATA FROM GOOGLE');
        });
}

export function getEventWithoutColor(callback, apiKey, idCalendar) {
    let GOOGLE_CALENDAR_URL = 'https://www.googleapis.com/calendar/v3/calendars/' + idCalendar.toString() +'/events?key=' + apiKey.toString();
    request.get(GOOGLE_CALENDAR_URL)
        .then(res => {
            const events = [];
            var helperResponse = JSON.parse(res.text);
            if(helperResponse.items.length > 0) {
                for (var x = 0; x < helperResponse.items.length; x++) {
                    if(helperResponse.items[x].hasOwnProperty('recurrence') == true) {
                        var helperDate =  moment(helperResponse.items[x].start.dateTime.toString()).format('YYYYMMDD[T]HHmmss');
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
                                description: helperResponse.items[x].hasOwnProperty('description') == true ? helperResponse.items[x].description : ''
                            });
                        }
                    } else {
                        events.push({
                            title: helperResponse.items[x].summary.toString(),
                            id: helperResponse.items[x].id,
                            start: new Date(helperResponse.items[x].start.dateTime.toString()),
                            end: new Date(helperResponse.items[x].end.dateTime.toString()),
                            description: helperResponse.items[x].hasOwnProperty('description') == true ? helperResponse.items[x].description : ''
                        });
                    }
                }
                callback(events);
            }
        })
        .catch(err => {
            alert('ERROR GETTING DATA FROM GOOGLE');
        });
}