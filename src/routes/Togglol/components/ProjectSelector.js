import React from 'react'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

class ProjectSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         project: undefined
    }
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
            options={options}
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