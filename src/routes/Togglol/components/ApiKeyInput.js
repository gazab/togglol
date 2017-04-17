/* @flow */
import React from 'react'
import PropTypes from 'prop-types';
 
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
            var savedState = JSON.parse(localStorage.getItem(state_key));
            this.state = savedState;   
        }
    }

    componentDidMount() {
        this.enterApiKey(this.state.value);
    }

    render() {
        return(
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <div className="input-group input-group-lg">
                        <input value={this.state.value} maxLength="32" id="apikeyInput" placeholder="Your Toggl API token" className="form-control" type="password" onChange={(e) => this.onChange(e)}/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary" onClick={this.handleLoadPress.bind(this)}>Login</button>
                        </span>
                    </div>
                    <div className="text-center">
                        <a target="_blank" href="https://toggl.com/app/profile">Find your API token here</a>
                        <p><small>Disclaimer: We are NOT affiliated with Toggl in ANY way</small></p>
                    </div>
                </div>
            </div>
            );
    }

    onChange(event) {
        var apiKey = event.target.value;
        this.enterApiKey(apiKey);
    }
    
    enterApiKey(apiKey) {
        // Store state
        var newState = {value: apiKey};
        this.setState(newState);
        localStorage.setItem(state_key, JSON.stringify(newState));

        // Send action
        this.props.onSet(apiKey);
        
    }

    handleLoadPress(event) {
        event.preventDefault();
        this.props.onLoad();
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