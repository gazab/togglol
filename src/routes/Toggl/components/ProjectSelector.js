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

export default ProjectSelector