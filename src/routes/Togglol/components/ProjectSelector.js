import React from 'react'

import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';

class ProjectSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         project: undefined,
         options: this.createOptionsList()
    }
  }

  createOptionsList() {
    // Group project after client id
    var groupedProjects = [];
    this.props.projects.forEach(function(project){
        if(project.cid != undefined)
        {
          if(groupedProjects[project.cid] == null)
            groupedProjects[project.cid] = [];

          groupedProjects[project.cid].push({label: project.name, value: project.id});
        }
    });

    // Create array with client names and its projects
    var options = [];
    let that = this;
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

  onChange(project) {
    this.setState({project: project.value});
  }


  render() {
    return (
      <div>
          <Select
            name="form-field-name"
            value={this.state.project}
            options={this.state.options}
            clearable={false}
            onChange={(val) => this.onChange(val)}
          />
      </div>
      )
  }
}

ProjectSelector.propTypes = {
  clients: React.PropTypes.array.isRequired,
  projects: React.PropTypes.array.isRequired
};


export default ProjectSelector