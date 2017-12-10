import moment from 'moment';
require('moment-duration-format');

export function getEventsForDay (events, day) {
    console.log(events);
    console.log(day);
    return events.filter(event => event.start.toDateString() === day.toDateString());
}

export function getTotalDurationForEvents (events) {
    if (events === undefined) return 0;

    let durationSeconds = 0;
    events.forEach(event => {
        const startDate = moment(event.start);
        const endDate = moment(event.end);

        durationSeconds += endDate.diff(startDate, 'milliseconds');
    });
    return moment.duration(durationSeconds).asHours();
}
