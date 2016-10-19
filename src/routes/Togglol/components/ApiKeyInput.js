/* @flow */
import React from 'react' 
var LocalStorageMixin = require('react-localstorage'); 

const state_key = "togglol-api-state";

class ApiKeyInput extends React.Component {
    constructor(props) {
        super(props);
        
        if(localStorage.getItem(state_key) == null) {
            this.state = {
            value: ''
            };    
        }
        else {
            this.state = JSON.parse(localStorage.getItem(state_key));    
        }
    }
    render() {
        return(
            <div className="row">
                <div className="col-lg-12">
                    <div className="input-group input-group-lg">
                        <input value={this.state.value} maxlength="32" id="apikeyInput" placeholder="Toggl API key" className="form-control" type="text" onChange={this.handleChange.bind(this)}/>
                        <span className="input-group-btn">
                            <button className="btn btn-outline-primary" onClick={this.handlePress.bind(this)}>1. Set API key</button>
                            <button className="btn btn-outline-primary" onClick={this.handleLoadPress.bind(this)}>2. Load user info</button>
                        </span>
                    </div>
                </div>
            </div>
            );
    }
    
    handlePress(event) {
        event.preventDefault();
        //this.props.onSet(this.state.value);
        this.props.onSet(this.state.value);
        localStorage.setItem(state_key, JSON.stringify(this.state));
    }

    handleLoadPress(event) {
        event.preventDefault();
        this.props.onLoad();
    }
    
    handleChange(event) {
        this.setState({value: event.target.value})
    }
}

ApiKeyInput.propTypes = {  
  onSet: React.PropTypes.func.isRequired,
  onLoad: React.PropTypes.func.isRequired
}

var inputStyle = {
    width: '300px'
}

export default ApiKeyInput