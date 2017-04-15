import React from 'react'
import PropTypes from 'prop-types'

import Picker from 'react-month-picker'
import 'react-month-picker/css/month-picker.css'

import moment from 'moment';

let pickerLang = { months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }


class MonthPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: {year: new Date().getFullYear(), month: new Date().getMonth()+1},
            disabled: false,
            intervalId: undefined
        };
    }

    handleClickMonthBox(e) {
        this.refs.pickMonth.show();
    }

    handleMonthChange(year, month) {
        let monthVal = {year: year, month: month}
        var intervalId = setInterval(() => this.enableButtons(), 1000);
        this.setState({value: monthVal, disabled: true, intervalId: intervalId});
        this.refs.pickMonth.dismiss();         
        this.props.onMonthChange(monthVal);
    }

    changeMonth(value) {
        let date = moment(new Date(this.state.value.year, this.state.value.month, 0, 0, 0, 0)).add(value, 'months');
        this.handleMonthChange(date.format('YYYY'), date.format('M'));
    }

    enableButtons() {
        this.setState({disabled: false});
        clearInterval(this.state.intervalId);
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    

    render() {

        let makeText = m => {
                if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
                return '?'
        }

        let opts = {};
        if (this.state.disabled) {
            opts['disabled'] = 'disabled';
        }
        
        return(
            

            <div>
                <Picker
                    ref="pickMonth"
                    value={this.state.value}
                    lang={pickerLang.months}
                    onChange={(year, month) => this.handleMonthChange(year, month)}
                    />
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => this.changeMonth(-1)} className="btn btn-secondary" {...opts}>-</button>
                    <button type="button" onClick={(e) => this.handleClickMonthBox(e)} className="btn btn-secondary" {...opts}>{makeText(this.state.value)}</button>
                    <button type="button" onClick={() => this.changeMonth(1)} className="btn btn-secondary" {...opts}>+</button>
                </div>
            </div>
        )
    }
}

export default MonthPicker