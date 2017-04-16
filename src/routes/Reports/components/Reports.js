import React from 'react'
import PropTypes from 'prop-types'

import MonthPicker from './MonthPicker'
import ReportDownloadButton from './ReportDownloadButton'

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

    console.log(this.props.data);

    return(
      <div className="row justify-content-md-center" style={{ margin: '0 auto' }} >
        <div className="col col-lg-8">
          <h2>Reports</h2>
          <div>
            <MonthPicker className="float-left" onMonthChange={(value) => this.handleMonthChange(value)}/>
            <ReportDownloadButton userId={this.props.data.id} apiToken={this.props.data.api_token} workspaceId={this.props.data.default_wid} className="float-right" />
          </div>
        </div>
      </div>
    )
  }
}

Reports.propTypes = {
  
}

export default Reports