import React from 'react'

class ProjectRadioGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         project: undefined
    }
  }

  render() {
      return(
          <div data-toggle="buttons">
            <label className="btn btn-primary">
                <input type="radio" name="options" id="option1" autocomplete="off" /> Radio 1
            </label>
            <label className="btn btn-primary">
                <input type="radio" name="options" id="option2" autocomplete="off" /> Radio 2
            </label>
            <label className="btn btn-primary">
                <input type="radio" name="options" id="option3" autocomplete="off" /> Radio 3
            </label>
        </div>
      );
  }
}

export default ProjectRadioGroups
