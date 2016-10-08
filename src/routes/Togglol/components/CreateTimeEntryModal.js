/* @flow */
import React from 'react'

import moment from 'moment';
require("moment-duration-format");

import Modal from 'boron/ScaleModal';

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

import ProjectSelector from './ProjectSelector'

var timeFormat = 'HH:ss';

class CreateTimeEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         startDate: undefined,
         endDate: undefined,
         projectId: undefined,
         duration: undefined
    }
  }

    showModal(slotInfo) {
        var startDate = moment(slotInfo.start);
        var endDate = moment(slotInfo.end);

        this.setState({
            startDate: startDate,
            endDate: endDate,
            duration: this.getEntryDuration(startDate, endDate)
            });

        this.refs.modal.show();
    }  

    hideModal(){
        this.refs.modal.hide();
    }

    changeStartTime(value) {
        var startDate = moment(value);
        this.setState({startDate: startDate, duration: this.getEntryDuration(startDate, this.state.endDate)});
    }


    changeEndTime(value) {
        var endDate = moment(value);
        this.setState({endDate: endDate, duration: this.getEntryDuration(this.state.startDate, value)});
    }

    getEntryDuration(startDate, endDate) {
        return moment.duration(endDate.diff(startDate)).format("h [hrs], m [min]");
    }

    render() {
        return(
            <Modal ref="modal" contentStyle={contentStyle}>
                <h2>Add time entry</h2>
                <p>
                    Time: <TimePicker style={{width: 50}} value={this.state.startDate} onChange={(e) => this.changeStartTime(e)} showSecond={false} /> to <TimePicker style={{width: 50}} value={this.state.endDate} onChange={(e) => this.changeEndTime(e)} showSecond={false} />
                </p>
                <p>Duration: {this.state.duration}</p>
                <ProjectSelector clients={this.props.clients} projects={this.props.projects} />
                <button className="btn btn-default" onClick={() => this.hideModal()}>Close</button>
            </Modal>
            );
    }
}

CreateTimeEntryModal.propTypes = {
  clients: React.PropTypes.array.isRequired,
  projects: React.PropTypes.array.isRequired
};

// Style

var contentStyle = {
    padding: '10px'
}

export default CreateTimeEntryModal

