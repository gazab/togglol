/* @flow */

const base64 = require('base-64');

import type { TimeEntryObject, TogglolStateObject } from '../interfaces/togglol.js'

// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_TIME_ENTRIES = 'REQUEST_TIME_ENTRIES'
export const RECEIVE_TIME_ENTRIES = 'RECEIVE_TIME_ENTRIES'  
export const GET_USER_INFO = 'GET_USER_INFO'
export const GET_USER_INFO_FULFILLED = 'GET_USER_INFO_FULFILLED'
export const GET_TIME_ENTRIES = 'GET_TIME_ENTRIES'
export const GET_TIME_ENTRIES_FULFILLED = 'GET_TIME_ENTRIES_FULFILLED'
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
    type: REQUEST_USER_INFO
  }
}

export function receiveTimeEntries (time_entries: Array<TimeEntryObject>): Action {
  return {
    type: RECEIVE_TIME_ENTRIES,
    payload: time_entries
  }
}

export function getTimeEntries (time_entries: Array<TimeEntryObject>): Action {
  return {
    type: GET_TIME_ENTRIES,
    payload: time_entries
  }
}

export function getUserInfo (user_info: Array<ProjectObject>): Action {
  return {
    type: GET_USER_INFO,
    payload: user_info
  }
}

export function fetchTimeEntries2(start: string, end: string): Function {  
  return (dispatch: Function, getState: Function): Promise => {
    dispatch(requestTimeEntries(start, end))
    
    return fetch('https://www.toggl.com/api/v8/time_entries?start_date=' + start + '&end_date=' + end, {
        headers: buildRequestHeader(getState())
    })
      .then(response => dispatch(receiveTimeEntries(response.json())))
  }
}

export function fetchTimeEntries(start: string, end: string): Function {
  return (dispatch: Function, getState: Function): Promise => {
    return fetch('https://www.toggl.com/api/v8/time_entries?start_date=' + start + '&end_date=' + end, {
        headers: buildRequestHeader(getState())
    })
      .then(response => dispatch(getTimeEntries(response.json())))
  }
}

export function fetchUserInfo(): Function {
  return (dispatch: Function, getState: Function): Promise => {
    return fetch('https://www.toggl.com/api/v8/me?with_related_data=true', {
        headers: buildRequestHeader(getState())
    })
      .then(response => dispatch(getUserInfo(response.json())))
  }
}

export function fetchUserInfoTwo(): Function {
  console.log("fetchUserInfo");
  return (resolve: Function, getState: Function): Promise => {
    console.log("asd")
    fetch('https://www.toggl.com/api/v8/me?with_related_data=true', {
        headers: buildRequestHeader(getState())
      })
      .then(response => response.json())
      .then(user_info => resolve(user_info))
    }
}
  
function buildRequestHeader(state: TogglolStateObject) {
    // Construct header
    var api_key = state.togglol.api_key;
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

export function getUserInfoTest(): Action {
    return {
        type: 'USER_INFO_GET_PENDING',
        payload: {
            promise: fetchUserInfoOld()
        }
    };
}

export function setApiKeyAndFetchUserInfo(api_key: string): Action {
  return {
        types: [
            'COMBINED_ACTION_START',
            'COMBINED_ACTION_SUCCESS',
            'COMBINED_ACTION_ERROR'
        ],

        // Set true for sequential actions
        sequence: false,

        // Pass actions in array
        payload: [setApiKey.bind(null, api_key), fetchUserInfoOld]
    };
}

export const actions = {  
  requestTimeEntries,
  receiveTimeEntries,
  requestUserInfo,
  fetchTimeEntries,
  getUserInfo,
  setApiKey,
  setApiKeyAndFetchUserInfo,
  fetchUserInfo,
  getTimeEntries
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const TOGGLOL_ACTION_HANDLERS = {  
  [REQUEST_TIME_ENTRIES]: (state: TogglolStateObject): TogglolStateObject => {
    return ({ ...state, fetching: true })
  },
  [REQUEST_USER_INFO]: (state: TogglolStateObject): TogglolStateObject => {
    return ({ ...state, fetching: true })
  },
  [RECEIVE_TIME_ENTRIES]: (state: TogglolStateObject, action: {payload: Array<TimeEntryObject>}): TogglolStateObject => {
    return ({ ...state, time_entries: action.payload, fetching: false })
  },
  [GET_TIME_ENTRIES_FULFILLED]: (state: TogglolStateObject, action: {payload: Array<TimeEntryObject>}): TogglolStateObject => {
    return ({ ...state, time_entries: action.payload, fetching: false })
  },
  [GET_USER_INFO_FULFILLED]: (state: TogglolStateObject, action: {payload: Array<ProjectObject>}): TogglolStateObject => {
    return ({ ...state, projects: action.payload.data.projects, data: action.payload.data, fetching: false, user_loaded: true })
  },
  [SET_API_KEY]: (state: TogglolStateObject, action: {payload: string}): TogglolStateObject => {
    return ({ ...state, api_key: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: TogglolStateObject = { user_loaded: false, fetching: false, time_entries: [], api_key: '', projects: [], data: undefined }  
export default function togglolReducer (state: TogglolStateObject = initialState, action: Action): TogglolStateObject {  
  const handler = TOGGLOL_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}