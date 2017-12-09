import React from 'react';

import * as EventHelper from '../../../../helpers/EventHelper';

export default class WeekHeader extends React.Component {

    constructor (props) {
        super(props);
        console.log(props);
    }

    getBackgroundColor (totalHours, isItWeekday) {
        console.log(totalHours);
        let backgroundColor = isItWeekday ? red : green;
        if (this.totalHours === 8) {
            backgroundColor = isItWeekday ? green : red;
        } else if (this.totaltHours < 8 && this.totalHours > 4) {
            backgroundColor = isItWeekday ? yellow : red;
        }
        return backgroundColor;
    }

    render () {
        const filteredEvents = EventHelper.getEventsForDay(this.props.events, this.props.date);
        const totalHours = EventHelper.getTotalDurationForEvents(filteredEvents);
        const isItWeekday = true;

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

const green = '#e6ffe6';
const yellow = '#ffffcc';
const red = '#ffcccc';

function cellStyle (backgroundColor) {
    return {
        backgroundColor: backgroundColor
    };
};
