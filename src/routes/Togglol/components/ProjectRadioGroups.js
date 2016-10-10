import React from 'react'

class ProjectRadioGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         selectedProject: undefined,
         projectList: []
    }
  }

  addToProjectList(project) {
      console.log("Add!");
      console.log(project);
  }

  render() {
      return(
          <div>
            <br/>
            <p><strong>Client</strong></p>
            <div className="btn-group" data-toggle="buttons">
                <label className="btn btn-secondary">
                    <input type="radio" name="options" id="option1" autocomplete="off" /> Radio 1
                </label>
                <label className="btn btn-secondary">
                    <input type="radio" name="options" id="option2" autocomplete="off" /> Radio 2
                </label>
                <label className="btn btn-secondary">
                    <input type="radio" name="options" id="option3" autocomplete="off" /> Radio 3
                </label>
            </div>
        </div>
      );
  }
}

ProjectRadioGroups.propTypes = {
  clients: React.PropTypes.array.isRequired,
  projects: React.PropTypes.array.isRequired
};

export default ProjectRadioGroups
