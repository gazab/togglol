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
            <form className="form-inline">
                <div className="form-group">
                    <label for="apikeyInput" className="sr-only">Password</label>
                    <input value={this.state.value} style={inputStyle} maxlength="32" id="apikeyInput" placeholder="Toggl API key" className="form-control" type="text" onChange={this.handleChange.bind(this)}/> 
                </div>
                <button className="btn btn-default" onClick={this.handlePress.bind(this)}>Set API key</button>
                <button className="btn btn-default" onClick={this.handleLoadPress.bind(this)}>Load user info</button>
            </form>
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
    marginRight: '5px',
    width: '280px'
}

export default ApiKeyInput