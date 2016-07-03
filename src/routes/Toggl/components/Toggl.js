/* @flow */
import React from 'react'  
import classes from './Toggl.scss'
import TogglCalendar from './TogglCalendar'
import ApiKeyInput from './ApiKeyInput'

import type { TimeEntriesObject } from '../interfaces/toggl'

type Props = {  
  time_entries: Array<TimeEntriesObject>,
  user_loaded: boolean,
  fetchTimeEntries: Function,
  fetchUserInfo: Function,
  setApiKey: Function,
  setApiKeyAndFetchUserInfo: Function,
  getUserInfo: Function
}

class Toggl extends React.Component {
  constructor(props) {
    super(props);
  }

  setApiKeyAndFetchUserInfo(api_key) {
    console.log("Set: " + api_key);
    console.log(this);
    //this.setApiKey({api_key: api_key});
  }
  
  render() {
        if(this.props.user_loaded) {
          return(<TogglCalendar time_entries={this.props.time_entries} fetchTimeEntries={this.props.fetchTimeEntries}/>);
        }
        else {
          return (<ApiKeyInput onSet={this.props.setApiKey} onLoad={this.props.fetchUserInfo}/>)
        }
    }
}

Toggl.propTypes = {  
  time_entries: React.PropTypes.array.isRequired,
  fetchTimeEntries: React.PropTypes.func.isRequired,
  setApiKey: React.PropTypes.func.isRequired
}

export default Toggl  