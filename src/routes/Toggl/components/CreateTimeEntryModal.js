/* @flow */
import React from 'react'

import moment from 'moment';
require("moment-duration-format");

import Modal from 'boron/WaveModal';

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

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

        console.log("State in showModal:");
        console.log(this.state);

        this.refs.modal.show();
    }  

    hideModal(){
        console.log(this);
        this.refs.modal.hide();
    }

    callback(event){
        console.log(event);
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
        //return moment.duration(startDate.diff(endDate)).humanize();
    }

    render() {
        console.log("State in render");
        console.log(this.state);
        return(
            <Modal ref="modal" keyboard={this.callback}>
                <h2>Add time entry</h2>
                <p>Start: <TimePicker style={{width: 50}} value={this.state.startDate} onChange={(e) => this.changeStartTime(e)} showSecond={false} /></p>
                <p>End: <TimePicker style={{width: 50}} value={this.state.endDate} onChange={(e) => this.changeEndTime(e)} showSecond={false} /></p>
                <p>Duration: {this.state.duration}</p>
                <button onClick={() => this.hideModal()}>Close</button>
            </Modal>
            );
    }
}

export default CreateTimeEntryModal

