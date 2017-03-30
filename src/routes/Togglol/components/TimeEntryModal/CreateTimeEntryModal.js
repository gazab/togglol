/* @flow */
import React from 'react'

import moment from 'moment';
require("moment-duration-format");

import Modal from 'react-modal';

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

import ProjectSelector from './ProjectSelector'

import 'rc-switch/assets/index.css';
const Switch = require('rc-switch');

var LocalStorageMixin = require('react-localstorage'); 

var timeFormat = 'HH:ss';
const LAST_PROJECT_KEY = "togglol-last-project";

class CreateTimeEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         entryId: undefined,
         startDate: undefined,
         endDate: undefined,
         projectId: this.getLastProjectId(),
         billable: true,
         description: undefined,
         isModalOpen: false,
         projectName: undefined
    }
  }

    showModal(slotInfo) {
        const startDate = moment(slotInfo.start);
        const endDate = moment(slotInfo.end);

        const projectId = slotInfo.projectId || this.getLastProjectId();

        let billable = slotInfo.billable
        if(typeof billable == 'undefined')
        {
           billable = this.isProjectBillable(projectId);
        }
        
        this.setState({
            startDate: startDate,
            endDate: endDate,
            entryId: slotInfo.entryId,
            projectId: projectId,
            description: slotInfo.description,
            billable: billable,
            projectName: this.getProjectName(projectId)
        });

        if(this.props.shiftKeyPressed && this.state.projectId > 0) {
            this.createTimeEntry();
        } else {
            this.setState({isModalOpen: true});
        }
        
    }

    onKeyPress(event)  {
        if(event.key == 'Enter') {
            this.createTimeEntry();
        } 
    }

    isProjectBillable(projectId)
    {
        const project = this.getProject(projectId);
        return project ? project.billable : false;
    }

    getProjectName(projectId)
    {
        const project = this.getProject(projectId)
        if(project != null)
        {
            return project.name;
        }
        else {
            return undefined;
        }
    }

    getLastProjectId() {
        return Number(localStorage.getItem(LAST_PROJECT_KEY));
    }

    hideModal(){
        this.setState({isModalOpen: false});
    }

    changeStartTime(value) {
        var startDate = moment(value);
        this.setState({startDate: startDate});
    }


    changeEndTime(value) {
        var endDate = moment(value);
        this.setState({endDate: endDate});
    }

    changeDescription(value) {
        this.setState({description: value});
    }

    changeSelectedProject(projectId) {
        this.setState({projectId: projectId, billable: this.isProjectBillable(projectId), projectName: this.getProjectName(projectId)});
        this.submitButton.focus();
    }

    createTimeEntry() {
        var timeEntry = {
            id: this.state.entryId,
            description: this.state.description,
            pid: this.state.projectId,
            start: this.state.startDate.toISOString(),
            duration: this.state.endDate.diff(this.state.startDate, 'seconds'),
            billable: this.state.billable,
            created_with: "Togglol"
        };
        localStorage.setItem(LAST_PROJECT_KEY, this.state.projectId);
        this.hideModal();
        this.props.onCreateTimeEntry(timeEntry);
    }

    deleteTimeEntry() {
        var entryId = this.state.entryId;
        this.hideModal();
        this.props.onDeleteTimeEntry(entryId);
    }

    onBillableChange() {
        this.setState({
        billable: !this.state.billable,
        });
    }

    isEditMode() {
        return this.state.entryId != undefined;
    }

    getProject(id) {
        let retVal = null;
        this.props.projects.forEach(function(project) {
            if(project.id == id)
            {
                retVal = project;
                return;
            }
        });
        return retVal;
    }

    render() {
        var duration = (this.state.startDate != undefined && this.state.endDate != undefined) ? moment.duration(this.state.endDate.diff(this.state.startDate)).format("h [hrs], m [min]") : "";
        let footerExtras = (<p className="float-xs-left" style={{float:'left'}}><small>Tip: Hold <kbd>shift</kbd> when creating a time entry to automatically use the last added project</small></p>)
        if(this.isEditMode()) {
            footerExtras = (<button type="button" style={{float: 'left'}} className="float-xs-left btn btn-danger" onClick={(e) => this.deleteTimeEntry(e)}>Delete entry</button>);
        }

        let modalTitle = "Add time entry"
        if(this.state.projectName != undefined)
        {
            modalTitle = "Add entry for '" + this.state.projectName + '"';
        }
        
        return(
            <Modal 
                className="Modal__Bootstrap modal-dialog"
                isOpen={this.state.isModalOpen} 
                onRequestClose={(e) => this.hideModal(e)}
                >
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={() => this.hideModal()}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">{this.isEditMode() ? 'Edit time entry' : modalTitle}</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Time </label>
                                <div className="col-sm-6">
                                    <p className="form-control-static">
                                        <TimePicker style={timepickerStyle} value={this.state.startDate} onChange={(value) => this.changeStartTime(value)} showSecond={false} />&nbsp;-&nbsp;
                                        <TimePicker style={timepickerStyle} value={this.state.endDate} onChange={(value) => this.changeEndTime(value)} showSecond={false} />
                                        &nbsp;({duration})
                                    </p>
                                </div>
                                <label className="col-sm-2 col-form-label">Billable</label>
                                <div className="col-sm-2" style={switchStyle}>
                                    <Switch onChange={(e) => this.onBillableChange(e)} checked={this.state.billable} checkedChildren={'$'} unCheckedChildren={'-'} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Description </label>
                                <div className="col-sm-10">
                                    <p className="form-control-static">
                                        <input type="text" value={this.state.description} className="form-control" onChange={(event) => this.changeDescription(event.target.value)} onKeyPress={(e) => this.onKeyPress(e)} ref={input => input && input.focus()}/>    
                                    </p>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Project</label>
                                <div className="col-sm-10">
                                    <ProjectSelector selectedProject={this.state.projectId} onChange={(project) => this.changeSelectedProject(project)} onKeyPress={(e) => this.onKeyPress(e)} clients={this.props.clients} projects={this.props.projects} />
                                </div>
                            </div>
                        </form>
                        
                    </div>
                    <div className="modal-footer">
                        {footerExtras}
                        <button className="btn btn-secondary" onClick={() => this.hideModal()}>Cancel</button>&nbsp;
                        <button type="button" ref={(ref) => this.submitButton = ref} className="btn btn-primary" onClick={(e) => this.createTimeEntry(e)}>{this.isEditMode() ? 'Save entry' : 'Create entry'}</button>
                    </div>
                    </div>
            </Modal>
            );
    }
}

CreateTimeEntryModal.propTypes = {
  clients: React.PropTypes.array.isRequired,
  projects: React.PropTypes.array.isRequired,
  shiftKeyPressed: React.PropTypes.bool.isRequired
};

// Style
const contentStyle = {
    padding: '10px'
}

const timepickerStyle = {
    borderRadius: '.25rem',
    width: '50px'
}

const switchStyle = {
    marginTop: '7px',
    paddingLeft: '0'
}

export default CreateTimeEntryModal

