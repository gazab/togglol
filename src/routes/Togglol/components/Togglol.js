/* @flow */
import React from 'react'  
import TogglolCalendar from './TogglolCalendar'
import ApiKeyInput from './ApiKeyInput'

import type { TimeEntryObject } from '../interfaces/togglol'
import type { ProjectObject } from '../interfaces/togglol'


type Props = {  
  time_entries: Array<TimeEntryObject>,
  user_loaded: boolean,
  fetchTimeEntries: Function,
  fetchUserInfo: Function,
  setApiKey: Function,
  setApiKeyAndFetchUserInfo: Function,

  requestCreateTimeEntry: Function,

  data: Object
}

class Togglol extends React.Component {
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
          return(
              <TogglolCalendar 
                data={this.props.data} 
                time_entries={this.props.time_entries} 
                fetchTimeEntries={this.props.fetchTimeEntries}
                onCreateTimeEntry={this.props.requestCreateTimeEntry}
              />
            );
        }
        else {
          return (<ApiKeyInput onSet={this.props.setApiKey} onLoad={this.props.fetchUserInfo}/>)
        }
    }
}

Togglol.propTypes = {  
  time_entries: React.PropTypes.array.isRequired,
  fetchTimeEntries: React.PropTypes.func.isRequired,
  setApiKey: React.PropTypes.func.isRequired,
  data: React.PropTypes.object
}

export default Togglol  