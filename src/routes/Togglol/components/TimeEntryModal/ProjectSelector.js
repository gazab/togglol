import React from 'react'

import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';

import ProjectRadioGroups from './ProjectRadioGroups'

class ProjectSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         options: this.createOptionsList()
    }
  }

  createOptionsList() {
    // Group project after client id
    var groupedProjects = [];
    var that = this;
    this.props.projects.forEach(function(project){
        if(project.cid != undefined)
        {
          if(groupedProjects[project.cid] == null)
            groupedProjects[project.cid] = [];

          // And add it to the options list so Select can render it
          groupedProjects[project.cid].push(that.createProjectOptionsValue(project));
        }
    });

    // Create array with client names and its projects
    var options = [];
    Object.keys(groupedProjects).forEach(function(key) {
      var values = groupedProjects[key];
      options.push({label: that.getClient(key).name, options: values})
    });

    return options;
  }

  createSelectedProjectsOptionsValue() {
    var that = this;
    let retVal = null;
    this.props.projects.forEach(function(project){
      if(project.id == that.props.selectedProject)
        retVal = that.createProjectOptionsValue(project);
        return;
    });
    return retVal;
  }

  createProjectOptionsValue(project) {
    return {label: project.name, value: project.id, color: project.hex_color, client: this.getClient(project.cid).name};
  }

  getClient(id) {
        let retVal = null;
        this.props.clients.forEach(function(client) {
            if(client.id == id)
            {
                retVal = client;
                return;
            }
        });
        return retVal;
  }

  render() {
    return (
      <div>
          <Select
            style={{zIndex: 999}}
            autofocus={true}
            name="form-field-name"
            value={this.state.value}
            options={this.state.options}
            clearable={false}
            placeholder="Find project ..."
            onChange={(project) => this.projectRadioGroups.addToProjectList({label: project.label, value: project.value, color: project.color, client: project.client})}
          />
          <ProjectRadioGroups
            ref={(ref) => this.projectRadioGroups = ref} 
            selectedProjectOptionsValue={this.createSelectedProjectsOptionsValue()}
            onChange={(project) => this.props.onChange(project)}
          />
      </div>
      )
  }
}

ProjectSelector.propTypes = {
  clients: React.PropTypes.array.isRequired,
  projects: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  selectedProject: React.PropTypes.number
};


export default ProjectSelector