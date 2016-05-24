/* @flow */
import { connect } from 'react-redux'  
import { fetchTimeEntries, setApiKey } from '../modules/toggl'

import Toggl from '../components/Toggl'

import type { TimeEntriesObject } from '../interfaces/toggl'

const mapActionCreators: {fetchTimeEntries: Function, setApiKey: Function} = {  
  fetchTimeEntries,
  setApiKey
}

const mapStateToProps = (state): { time_entries: Array<TimeEntriesObject> } => ({  
  time_entries: state.toggl.time_entries,
  user_loaded: state.toggl.user_loaded
})

export default connect(mapStateToProps, mapActionCreators)(Toggl) 