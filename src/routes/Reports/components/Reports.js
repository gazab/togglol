import React from 'react'
import PropTypes from 'prop-types'

import MonthPicker from './MonthPicker'

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        month: undefined 
    };
  }

  handleMonthChange(value) {
    this.setState({month: value});
  }

  render() {

    console.log(this.state.month);

    return(
      <div className="row justify-content-md-center" style={{ margin: '0 auto' }} >
        <div className="col col-lg-6">
          <h2>Reports</h2>
          <div>
            <label><b>Pick a month</b></label>
            <MonthPicker onMonthChange={(value) => this.handleMonthChange(value)}/>
          </div>
        </div>
      </div>
    )
  }
}

Reports.propTypes = {
  
}

export default Reports