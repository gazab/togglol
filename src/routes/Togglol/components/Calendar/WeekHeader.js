import React from 'react';

import { getEventsForDay, getTotalDurationForEvents } from '../../../../helpers/EventHelper';

export default class WeekHeader extends React.Component {

    getBackgroundColor (totalHours, isItWeekday) {
        console.log(totalHours);
        if (totalHours === 0) {
            return neutral;
        } else if (isItWeekday && totalHours === 8) {
            return good;
        } else if (isItWeekday && totalHours < 8) {
            return ok;
        }

        return bad;
    }

    render () {
        const date = this.props.date;
        const filteredEvents = getEventsForDay(this.props.events, date);
        const totalHours = getTotalDurationForEvents(filteredEvents);
        const isItWeekday = !(date.getDay() === 6 || date.getDay() === 0);

        let dynamicCellStyle = cellStyle(this.getBackgroundColor(totalHours, isItWeekday));

        return (
            <div style={dynamicCellStyle}>
                <b>{this.props.label}</b>
                <div style={hourStyle}>{totalHours}h</div>
            </div>
        )
    }
};

const hourStyle = {
    fontSize: '200%'
};

const neutral = '';
const good = '#e6ffe6';
const ok = '#ffffcc';
const bad = '#ffcccc';

function cellStyle (backgroundColor) {
    return {
        backgroundColor: backgroundColor
    };
};
