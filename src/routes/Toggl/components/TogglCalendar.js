/* @flow */
import React from 'react'
import classes from './Toggl.scss'

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import globalize from 'globalize';
BigCalendar.setLocalizer(
  BigCalendar.globalizeLocalizer(globalize)
);

import type { TimeEntriesObject } from '../interfaces/toggl'
import type { ProjectObject } from '../interfaces/toggl'

type Props = {
    time_entries: Array<TimeEntriesObject>,
    projects: Array<ProjectObject>,
    fetchTimeEntries: Function,
    // createTimeEntry: Function
}

// TODO: Refactor to use ES6 classes instead like Toggl.js
var TogglCalendar = React.createClass({
    getInitialState: function() {
        
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
                
        return {
            date: date,
            view: 'week'
        };
    },
    propTypes: {
        time_entries: React.PropTypes.array.isRequired,
        //projects: React.PropTypes.array.isRequired,
        fetchTimeEntries: React.PropTypes.func.isRequired
        //createTimeEntry: React.PropTypes.func.isRequired
    },
    componentDidMount: function() {
      this.changeView(this.state.view);  
    },
    changeView: function(view) {
        this.setState({view: view});
        this.fetchShownEntries(this.state.date, view);
    },
    fetchShownEntries: function(start, view) {
    // Calculate correct start and end date for view
    // TODO: Clean this mess up
    let startDate = new Date(start);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    this.setState({date: startDate});
    
    let endDate = new Date(startDate);
    switch(view) {
        case 'week':
            endDate.setDate(endDate.getDate()+7);
            break;
        case 'month':
            console.log("Month");
            startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1);
            break;    
        default:
    }
    this.props.fetchTimeEntries(startDate.toISOString(), endDate.toISOString());  
    },
    eventStyleGetter: function(event, start, end, isSelected) {
        var backgroundColor = '#' + 'F00';
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    },
    render: function() {
        var eventList = this.props.time_entries.map(function(entry) {
            var event = {};
            event["start"] = new Date(entry.start);
            event["end"] = new Date(entry.stop);
            event["allDay"] = false;
            event["title"] = entry.description || "No description";
            event["pid"] = entry.pid;
            
            return event;
        });
        console.log(eventList);
        
        // Create shown time span
        var minTime = new Date(2016,4,2, 6, 0, 0, 0);
        var maxTime = new Date(2016,4,2, 22, 0, 0, 0); 
        
        return (
            <BigCalendar 
                    culture="en-GB"
                    events={eventList}
                    defaultView={this.state.view}
                    min={minTime}
                    max={maxTime}
                    onNavigate={this.fetchShownEntries}
                    onView={this.changeView}
                    selectable={true}
                    eventPropGetter={(this.eventStyleGetter)}
                 />
             );
    }
});

export default TogglCalendar  