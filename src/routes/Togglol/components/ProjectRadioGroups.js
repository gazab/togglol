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
      var projectList = this.state.projectList;
      if(projectList.indexOf(project) == -1)
        projectList = this.state.projectList.concat([project])

      this.setState({selectedProject: project.value, projectList: projectList});
  }

  selectProject(project) {
      console.log("Select!");
      this.setState({selectedProject: project.value});
  }

  createDotStyle(project) {

    var dotStyle = {
        width: '13px',
        height: '13px',
        display: 'inline-block',
        marginRight: '5px',
        backgroundColor: project.color
    }
    return dotStyle;
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
            return (<button key={project.value} onClick={() => that.selectProject(project)} type="button" className={cls}><span style={that.createDotStyle(project)}/>{project.label}</button>)
        });

        return (
            <div>
                <p style={{marginBottom: '2px', marginTop: '10px'}}><strong>{client}</strong></p>
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

export default ProjectRadioGroups
