/* @flow */
import React from 'react'

import moment from 'moment';
require("moment-duration-format");

import Modal from 'react-modal';

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
         duration: undefined,
         isModalOpen: false
    }
  }

    showModal(slotInfo) {
        var startDate = moment(slotInfo.start);
        var endDate = moment(slotInfo.end);

        this.setState({
            startDate: startDate,
            endDate: endDate,
            duration: this.getEntryDuration(startDate, endDate),
            isModalOpen: true
            });
    }  

    hideModal(){
        this.setState({isModalOpen: false});
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
            <Modal 
                className="Modal__Bootstrap modal-dialog"
                isOpen={this.state.isModalOpen} 
                onRequestClose={(e) => this.hideModal(e)}
                >
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">Close</span>
                    </button>
                    <h4 className="modal-title">Add time entry</h4>
                    </div>
                    <div className="modal-body">
                        <form className="container">
                        <div className="form-group row">
                            <label for="start-time-input" className="col-xs-2 col-form-label">Start time</label>
                            <div className="col-xs-10">
                                <TimePicker style={{width: 50}} value={this.state.startDate} onChange={(e) => this.changeStartTime(e)} showSecond={false} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="start-time-input" className="col-xs-2 col-form-label">End time</label>
                            <div className="col-xs-10">
                                <TimePicker style={{width: 50}} value={this.state.endDate} onChange={(e) => this.changeEndTime(e)} showSecond={false} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Duration</label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{this.state.duration}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 col-form-label">Project</label>
                            <div className="col-sm-10">
                                <ProjectSelector clients={this.props.clients} projects={this.props.projects} />
                            </div>
                            <button className="btn btn-default" onClick={() => this.hideModal()}>Close</button>
                        </div>
                        </form>
                        </div>
                        </div>
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

