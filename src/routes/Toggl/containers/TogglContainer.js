/* @flow */
import { connect } from 'react-redux'  
import { fetchTimeEntries, setApiKey, fetchUserInfo, setApiKeyAndFetchUserInfo } from '../modules/toggl'

import Toggl from '../components/Toggl'

import type { TimeEntryObject } from '../interfaces/toggl'
import type { ProjectObject } from '../interfaces/toggl'

const mapActionCreators: {fetchTimeEntries: Function, fetchUserInfo: Function, setApiKey: Function, setApiKeyAndFetchUserInfo: Function} = {  
  fetchTimeEntries,
  fetchUserInfo,
  setApiKey,
  setApiKeyAndFetchUserInfo
}

const mapStateToProps = (state): { time_entries: Array<TimeEntryObject>, projects: Array<ProjectObject> } => ({  
  time_entries: state.toggl.time_entries,
  user_loaded: state.toggl.user_loaded,
  projects: state.toggl.projects
})

export default connect(mapStateToProps, mapActionCreators)(Toggl) 