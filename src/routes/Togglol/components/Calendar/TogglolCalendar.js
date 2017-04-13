/* @flow */
import React from 'react'

import moment from 'moment';
require("moment-duration-format");

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

import CreateTimeEntryModal from '../TimeEntryModal/CreateTimeEntryModal';
import TimeEntryEvent from './TimeEntryEvent';
import { createTogglEntry } from '../../../../toggl/toggl.js'

import type { TimeEntriesObject } from '../interfaces/togglol';
import type { ProjectObject } from '../interfaces/togglol';

type Props = {
    time_entries: Array<TimeEntriesObject>,
    data: Object,
    fetchTimeEntries: Function,
    requestCreateOrUpdateTimeEntry: Function,
    requestDeleteTimeEntry: Function
}

class TogglolCalendar extends React.Component {
    constructor(props) {
        super(props);

        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
                
        this.state = {
            date: date,
            view: 'week',
            shift: false,
            control: false
        };
    }

    handleKeypress() {
        if ( keydown.event ) {
            // inspect the keydown event and decide what to do
            // if (keydown.event.shiftKey) {
            //     this.setState({shift: true});
            // }
            // else {
            //     this.setState({shift: false});
            // }

            // if (keydown.event.ctrlKey) {
            //     this.setState({control: true});
            // }
            // else {
            //     this.setState({control: false});
            // }
            console.log(keydown.event);
        }
        
    }

    componentDidMount() {
      this.changeView(this.state.view);  
    }
    changeView(view) {
        this.setState({view: view});
        this.fetchShownEntries(this.state.date, view);
    }
    fetchShownEntries(start, view) {
        // To make moment start weeks on monday
        if(view == 'week')
            view = 'isoweek';

        // Calculate correct start and end date for view
        this.setState({date: start});
        let startDate = moment(start).startOf(view).startOf('day');
        let endDate = moment(startDate).endOf(view).endOf('day');
        this.props.fetchTimeEntries(startDate.toISOString(), endDate.toISOString());  
    }
    eventStyleGetter(event, start, end, isSelected) {
        var backgroundColor = event.project['hex_color'];
        var style = {
            backgroundColor: backgroundColor,
            opacity: 0.8,
            border: '0px',
            display: 'block',
            zIndex: '0',
            maxWidth: '85%'
        };
        return {
            style: style
        };
    }
    getProject(id) {
        if(id == null) {
            return {name: '', hex_color: '#b7b7b7'}
        }

        let retVal = null;

        this.props.data.projects.forEach(function(project) {
            if(project.id == id)
            {
                retVal = project;
                return;
            }
            
        });
        return retVal;
    }
    showModal(slotInfo){
        this.createTimeEntryModal.showModal(slotInfo);
    }

    createTimeEntry(timeEntry) {
        this.props.onSaveTimeEntry(timeEntry);
    }

    moveTimeEntry({event, start, end}) {
        var timeEntry = createTogglEntry(event.entryId, event.description, event.projectId, start, end, event.billable);
        this.props.onSaveTimeEntry(timeEntry);
    }

    render() {
        var that = this;        
        var eventList = this.props.time_entries.map(function(entry) {
            var event = {};
            var project = that.getProject(entry.pid);
            event["entryId"] = entry.id;
            event["projectId"] = entry.pid;
            event["description"] = entry.description; 
            event["project"] = project;
            event["start"] = new Date(entry.start);
            event["end"] = new Date(entry.stop);
            event["allDay"] = false;
            event["title"] = project.name;
            event["billable"] = entry.billable;
            return event;
        });
        
        // Create shown time span
        var minTime = new Date(2000,1,1, 6, 0, 0, 0);
        var maxTime = new Date(2000,1,1, 22, 0, 0, 0); 

        // Time formats
        var formats = {
             timeGutterFormat: 'HH:mm',
             selectRangeFormat: ({ start, end }, culture, localizer) =>
                moment(start).format('HH:mm') + ' — ' + moment(end).format('HH:mm') + ' (' + moment.duration(moment(end).diff(moment(start))).format("h [hrs], m [min]") + ')',
            eventTimeRangeFormat:
                ({ start, end }, culture, localizer) =>
                moment(start).format('HH:mm') + '—' + moment(end).format('HH:mm'),
            dayRangeHeaderFormat: ({ start, end }, culture, local) => 'Week ' + local.format(start, 'w') + ': ' +
                local.format(start, 'MMM DD', culture) + ' - ' + local.format(end, moment(start).isSame(moment(end), 'month') ? 'DD' : 'MMM DD', culture)
        }

        // Components
        let components = {
            event: TimeEntryEvent, // used by each view (Month, Day, Week)
        }
        
        return (
            <div>
                <DragAndDropCalendar 
                    culture="en-GB"
                    events={eventList}
                    defaultView={this.state.view}
                    views={['week', 'month']}
                    min={minTime}
                    max={maxTime}
                    onNavigate={this.fetchShownEntries}
                    onView={this.changeView}
                    selectable={true}
                    onEventDrop={(e) => this.moveTimeEntry(e)}
                    onSelectSlot={(slotInfo) => this.showModal(slotInfo)}
                    onSelectEvent={(slotInfo) => this.showModal(slotInfo)}
                    eventPropGetter={(this.eventStyleGetter)}
                    formats={formats}
                    onClick={(e) => console.log(e)}
                    components={components}
                    style={{marginBottom: '80px'}}
                 />
                 <CreateTimeEntryModal 
                    shiftKeyPressed={this.state.shift}
                    onDeleteTimeEntry={(entry) => this.props.onDeleteTimeEntry(entry)}
                    onCreateTimeEntry={(e) => this.createTimeEntry(e)}
                    clients={this.props.data.clients}
                    projects={this.props.data.projects}
                    ref={(ref) => this.createTimeEntryModal = ref}
                 />
            </div>
             );
    }
}

TogglolCalendar.propTypes = {
        time_entries: React.PropTypes.array.isRequired,
        //projects: React.PropTypes.array.isRequired,
        fetchTimeEntries: React.PropTypes.func.isRequired
        //createTimeEntry: React.PropTypes.func.isRequired
}

export default TogglolCalendar  