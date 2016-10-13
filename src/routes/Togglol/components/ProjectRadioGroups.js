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
      this.setState({selectedProject: project.value, projectList: this.state.projectList.concat([project])});
  }

render() {
    console.log(this.state);

    // Group project after client id
    var groupedProjects = [];
    var that = this;
    this.state.projectList.forEach(function(project){
        if(groupedProjects[project.client] == null)
            groupedProjects[project.client] = [];

          groupedProjects[project.client].push(project);
    });

    //TODO: Fix sort
    groupedProjects.sort();

    var buttonGroups = Object.keys(groupedProjects).map(function(client) {        
        var projectButtons = groupedProjects[client].map(function(project) {
            var cls = "btn btn-secondary";
            if(project.value == that.state.selectedProject) { 
                cls += " active" 
            }
            return (<button type="button" className={cls}>{project.label}</button>)
        });

        return (
            <div>
                <br/>
                <p>{client}</p>
                <div className="btn-group" role="group">
                    {projectButtons}
                </div>
            </div>
        );
        });

      return(
            <div>
                {buttonGroups}
            </div>
      );
  }
}

var dotStyle = {
    width: '10px',
    height: '10px',
    backgroundColor: '#F0F'
}

export default ProjectRadioGroups
