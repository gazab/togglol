import React from 'react'

var LocalStorageMixin = require('react-localstorage');
const state_key = "togglol-prg-state";

class ProjectRadioGroups extends React.Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem(state_key) == null) {
        this.state = {
            projectList: []
        }
    }
    else {
            this.state = JSON.parse(localStorage.getItem(state_key));    
    }
    this.state.projectList = this.addAndGetProjectList(this.props.selectedProjectOptionsValue);
  }

  addToProjectList(project) {
      var projectList = this.addAndGetProjectList(project);
      this.setState({projectList: projectList});
      this.props.onChange(project.value);
  }

  addAndGetProjectList(project) {
      var projectList = this.state.projectList;
      if(JSON.stringify(projectList).indexOf(JSON.stringify(project)) == -1) {
          projectList = this.state.projectList.concat([project]);
      }

      return projectList;
  }

  selectProject(project) {
      this.props.onChange(project.value);
  }

  removeProject(event, project) {
      var projectList = this.state.projectList.splice(0);
      var index = projectList.indexOf(project);
      if (index > -1) {
        projectList.splice(index, 1);
      }

      this.setState({projectList: projectList});
      event.preventDefault();
  }

  createDotStyle(project) {
    var dotStyle = {
        width: '13px',
        height: '13px',
        display: 'inline-block',
        borderRadius: '100%',
        marginRight: '5px',
        backgroundColor: project.color
    }
    return dotStyle;
  }

render() {
    // Store state in localStorage
    localStorage.setItem(state_key, JSON.stringify(this.state));

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
            if(project.value == that.props.selectedProjectOptionsValue.value) { 
                cls += " active" 
            }
            
            return (<button style={{paddingRight: '30px'}} key={project.value} onClick={() => that.selectProject(project)} type="button" className={cls}><span style={that.createDotStyle(project)}/>
                        {project.label}
                        <a aria-hidden="true" style={{marginLeft: '5px', fontWeight: '700', opacity: '0.7', fontSize: '1.5em', position: 'absolute', bottom: '5px'}} onClick={(e) => that.removeProject(e, project)} >&times;</a>                            
                    </button>)
        });

        return (
            <div>
                <p style={{marginBottom: '3px', marginTop: '10px'}}><strong>{client}</strong></p>
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

ProjectRadioGroups.propTypes = {
  onChange: React.PropTypes.func,
  selectedProjectOptionsValue: React.PropTypes.object
};

export default ProjectRadioGroups
