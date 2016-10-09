import React from 'react'

import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';

var options = [{
	label: 'Black',
	value: 'black',
}, {
	label: 'Primary Colors',
	options: [{
		label: 'Yellow',
		value: 'yellow'
	}, {
		label: 'Red',
		value: 'red'
	}, {
		label: 'Blue',
		value: 'blue'
	}]
}, {
	label: 'Secondary Colors',
	options: [{
		label: 'Orange',
		value: 'orange'
	}, {
		label: 'Purple',
		options: [{
			label: 'Light Purple',
			value: 'light_purple'
		}, {
			label: 'Medium Purple',
			value: 'medium_purple'
		}, {
			label: 'Dark Purple',
			value: 'dark_purple'
		}]
	}, {
		label: 'Green',
		value: 'green'
	}]
}, {
	label: 'White',
	value: 'white',
}];

class ProjectSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         project: undefined,
         options: this.createOptionsList()
    }
  }

  createOptionsList() {

    var groupedProjects = [];

    this.props.projects.forEach(function(project){
        if(project.cid != undefined)
        {
          if(groupedProjects[project.cid] == null)
            groupedProjects[project.cid] = [];

          groupedProjects[project.cid].push({label: project.name, value: project.id});
        }
    });

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

  logChange(val) {
    console.log("Selected: " + val);
  }


  render() {
    return (
      <div>
          <Select
            name="form-field-name"
            value="one"
            options={this.state.options}
            onChange={this.logChange}
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