import React from 'react'
import PropTypes from 'prop-types'

class MonthBox extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || 'N/A'
        };
    }

    render() {
        return (
            <div className="box" onClick={(e) => this._handleClick(e)}>
                <label>{this.state.value}</label>
            </div>
        )
    }

    _handleClick(e) {
        this.props.onClick && this.props.onClick(e)
    }
}

MonthBox.propTypes = {
        value: React.PropTypes.string
        , onClick: React.PropTypes.func
}

export default MonthBox