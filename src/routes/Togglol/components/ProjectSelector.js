import React from 'react'

class ProjectSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         project: undefined
    }
  }

  render() {
    return (<div><p>SELECT PROJECT!</p></div>)
  }
}

ProjectSelector.propTypes = {
  clients: React.PropTypes.array.isRequired,
  projects: React.PropTypes.array.isRequired
};


export default ProjectSelector