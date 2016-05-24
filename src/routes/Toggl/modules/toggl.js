/* @flow */

const base64 = require('base-64');

import type { TimeEntryObject, TogglStateObject } from '../interfaces/toggl.js'

// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_TIME_ENTRIES = 'REQUEST_TIME_ENTRIES'
export const RECEIVE_TIME_ENTRIES = 'RECEIVE_TIME_ENTRIES'  
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'  
export const SAVE_TIME_ENTRY = 'SAVE_TIME_ENTRY'
export const SET_API_KEY = 'SET_API_KEY'  

// ------------------------------------
// Actions
// ------------------------------------

export function requestTimeEntries (start_date: string, end_date: string): Action {  
  return {
    type: REQUEST_TIME_ENTRIES,
    payload: {
      start_date: start_date,
      end_date: end_date
    }
  }
}

export function requestUserInfo (): Action {  
  return {
    type: REQUEST_USER_INFO,
  }
}

export function receiveTimeEntries (time_entries: Array<TimeEntryObject>): Action {
  return {
    type: RECEIVE_TIME_ENTRIES,
    payload: time_entries
  }
}

export function receiveUserInfo (user_info: Array<ProjectObject>): Action {
  return {
    type: RECEIVE_USER_INFO,
    payload: user_info
  }
}

export function fetchTimeEntries(start: string, end: string): Function {  
  return (dispatch: Function, getState: Function): Promise => {
    dispatch(requestTimeEntries("start", "end"))
    
    return fetch('https://www.toggl.com/api/v8/time_entries?start_date=' + start + '&end_date=' + end, {
        headers: buildRequestHeader(getState())
    })
      .then(response => response.json())
      .then(time_entries => dispatch(receiveTimeEntries(time_entries)))
  }
}

export function fetchUserInfo(): Function {
  return (dispatch: Function, getState: Function): Promise => {
    dispatch(requestUserInfo())
    
    return fetch('https://www.toggl.com/api/v8/me?with_related_data=true', {
        headers: buildRequestHeader(getState())
    })
      .then(response => response.json())
      .then(user_data => console.log(user_data) /*dispatch(receiveUserInfo(user_data.projects))*/)
  }
}

function buildRequestHeader(state: TogglStateObject) {
    // Construct header
    var api_key = state.toggl.api_key;
    var headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(api_key + ":api_token"));
    return headers;
}

export function setApiKey(api_key: string): Action {  
  return {
    type: SET_API_KEY,
    payload: api_key
  }
}

export const actions = {  
  requestTimeEntries,
  receiveTimeEntries,
  fetchTimeEntries,
  setApiKey
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const TOGGL_ACTION_HANDLERS = {  
  [REQUEST_TIME_ENTRIES]: (state: TogglStateObject): TogglStateObject => {
    return ({ ...state, fetching: true })
  },
  [REQUEST_USER_INFO]: (state: TogglStateObject): TogglStateObject => {
    return ({ ...state, fetching: true })
  },
  [RECEIVE_TIME_ENTRIES]: (state: TogglStateObject, action: {payload: Array<TimeEntryObject>}): TogglStateObject => {
    return ({ ...state, time_entries: action.payload, fetching: false })
  },
  [RECEIVE_USER_INFO]: (state: TogglStateObject, action: {payload: Array<ProjectObject>}): TogglStateObject => {
    return ({ ...state, projects: action.payload, fetching: false, user_loaded: true })
  },
  [SET_API_KEY]: (state: TogglStateObject, action: {payload: string}): TogglStateObject => {
    return ({ ...state, api_key: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: TogglStateObject = { user_loaded: false, fetching: false, time_entries: [], api_key: '' }  
export default function togglReducer (state: TogglStateObject = initialState, action: Action): TogglStateObject {  
  const handler = TOGGL_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}