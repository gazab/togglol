import React from 'react'
import PropTypes from 'prop-types'

import Picker from 'react-month-picker'
import 'react-month-picker/css/month-picker.css'

import MonthBox from './MonthBox'

let pickerLang = { months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        month: {year: new Date().getFullYear(), month: new Date().getMonth()} 
    };
  }

  handleClickMonthBox(e) {
    this.refs.pickMonth.show();
  }

  handleMonthChange(value) {
    this.setState({month: value});
    this.refs.pickMonth.dismiss();         
  }

  render() {

    let monthValue = this.state.month;

    let makeText = m => {
                if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
                return '?'
    }

    return(
      <div className="row justify-content-md-center" style={{ margin: '0 auto' }} >
        <div className="col col-lg-6">
          <h2>Reports</h2>
          <div>
            <label><b>Pick a month</b></label>
            <div className="edit">
                <Picker
                    ref="pickMonth"
                    value={monthValue}
                    lang={pickerLang.months}
                    onChange={(value) => this.handleMonthChange(value)}
                    >
                    <MonthBox value={makeText(monthValue)} onClick={(e) => this.handleClickMonthBox(e)} />
                </Picker>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

Reports.propTypes = {
  
}

export default Reports