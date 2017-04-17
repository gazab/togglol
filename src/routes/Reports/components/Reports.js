import React from 'react'
import PropTypes from 'prop-types'

import { browserHistory } from 'react-router'

import MonthPicker from './MonthPicker'
import ReportDownloadButton from './ReportDownloadButton'

import moment from 'moment';

let monthLang = { months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] }

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        month: {year: new Date().getFullYear(), month: new Date().getMonth()+1} 
    };
  }

  handleMonthChange(value) {
    this.setState({month: value});
  }

  getMonthAsDate()
  {
    return moment(new Date(this.state.month.year, this.state.month.month, 0, 0, 0, 0));
  }

  getStartDate() {
    return this.getMonthAsDate().startOf('month').format("YYYY-MM-DD");
  }

  
  getEndDate() {
    return this.getMonthAsDate().endOf('month').format("YYYY-MM-DD");
  }

  render() {

    let startDate = this.getStartDate();
    let endDate = this.getEndDate();

    let makeHeader = m => {
          if (m && m.year && m.month) return "Report for " + (monthLang.months[m.month-1] + ' ' + m.year)
          return 'Report'
    }

    if(!this.props.togglol.user_loaded)
    {
      return(
          <div className="row justify-content-md-center" style={{ margin: '0 auto' }} >
                <div className="col col-lg-8">
                  <p>Please login first</p>
                  </div>
                </div>
          );
    }

    return(
      <div style={{marginTop: '20px'}}>
        <div className="row justify-content-md-center">
          <div className="col col-lg-8">
            <h2>{makeHeader(this.state.month)}</h2>
            <div style={{marginTop: '20px'}}>
              <MonthPicker className="float-left" value={this.state.month} onMonthChange={(value) => this.handleMonthChange(value)}/>
              <ReportDownloadButton 
                name={this.props.togglol.data.fullname} 
                startDate={startDate} 
                endDate={endDate} 
                userId={this.props.togglol.data.id} 
                apiToken={this.props.togglol.data.api_token} 
                workspaceId={this.props.togglol.data.default_wid} 
                className="float-right" />
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center" style={{marginTop: '20px'}}>
          <div className="col col-lg-8">
            <p>More report features coming soon!</p>
          </div>
        </div>
      </div>
    )
  }
}

Reports.propTypes = {
  
}

export default Reports