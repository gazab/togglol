/* @flow */
import React from 'react'

import moment from 'moment';
require("moment-duration-format");

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

import CreateTimeEntryModal from './CreateTimeEntryModal';

import type { TimeEntriesObject } from '../interfaces/togglol';
import type { ProjectObject } from '../interfaces/togglol';

type Props = {
    time_entries: Array<TimeEntriesObject>,
    data: Object,
    fetchTimeEntries: Function
}

// TODO: Refactor to use ES6 classes instead like Togglol.js
var TogglolCalendar = React.createClass({
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
        // To make moment start weeks on monday
        if(view == 'week')
            view = 'isoweek';

        // Calculate correct start and end date for view
        this.setState({date: start});
        let startDate = moment(start).startOf(view).startOf('day');
        let endDate = moment(startDate).endOf(view).endOf('day');
        this.props.fetchTimeEntries(startDate.toISOString(), endDate.toISOString());  
    },
    eventStyleGetter: function(event, start, end, isSelected) {
        var backgroundColor = event.project['hex_color'];
        var style = {
            backgroundColor: backgroundColor,
            opacity: 0.8,
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    },
    getProject: function(id) {
        let retVal = null;

        this.props.data.projects.forEach(function(project) {
            if(project.id == id)
            {
                retVal = project;
                return;
            }
            
        });
        return retVal;
    },
    showModal: function(slotInfo){
        this.refs.modal.showModal(slotInfo);
    },
    render: function() {
        var that = this;        
        var eventList = this.props.time_entries.map(function(entry) {
            var event = {};
            var project = that.getProject(entry.pid);
            event["project"] = project;
            event["start"] = new Date(entry.start);
            event["end"] = new Date(entry.stop);
            event["allDay"] = false;
            event["title"] = project.name;
            return event;
        });
        
        // Create shown time span
        var minTime = new Date(2000,1,1, 6, 0, 0, 0);
        var maxTime = new Date(2000,1,1, 22, 0, 0, 0); 

        // Time formats
        var formats = {
             timeGutterFormat: 'HH:mm',
             selectRangeFormat: ({ start, end }, culture, localizer) =>
                moment(start).format('HH:mm') + ' — ' + moment(end).format('HH:mm') + ' (' + moment.duration(moment(end).diff(moment(start))).format("h [hrs], m [min]") + ')'
        }
        
        return (
            <div>
                <BigCalendar 
                    culture="en-GB"
                    events={eventList}
                    defaultView={this.state.view}
                    min={minTime}
                    max={maxTime}
                    onNavigate={this.fetchShownEntries}
                    onView={this.changeView}
                    selectable={true}
                    onSelectSlot={(slotInfo) => this.showModal(slotInfo)}
                    eventPropGetter={(this.eventStyleGetter)}
                    formats={formats}
                 />
                 <CreateTimeEntryModal onCreateEntry={(e) => this.createTimeEntry(e)} clients={this.props.data.clients} projects={this.props.data.projects} ref="modal" />
            </div>
             );
    }
});

export default TogglolCalendar  