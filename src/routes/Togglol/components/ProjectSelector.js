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

          groupedProjects[project.cid].push({label: project.name, value: project.id, color: project.hex_color, client: that.getClient(project.cid).name});
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
  
  getSelectedProject() {
    return this.projectRadioGroups.getSelectedProject();
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
            onChange={(project) => this.projectRadioGroups.addToProjectList(project)}
          />
          <ProjectRadioGroups ref={(ref) => this.projectRadioGroups = ref} onChange={(project) => this.props.onChange(project)} />
      </div>
      )
  }
}

ProjectSelector.propTypes = {
  clients: React.PropTypes.array.isRequired,
  projects: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};


export default ProjectSelector