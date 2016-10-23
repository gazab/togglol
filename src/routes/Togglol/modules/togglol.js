/* @flow */

const base64 = require('base-64');

import type { TimeEntryObject, TogglolStateObject } from '../interfaces/togglol.js'

// ------------------------------------
// Constants
// ------------------------------------

export const GET_USER_INFO = 'GET_USER_INFO'
export const GET_USER_INFO_PENDING = 'GET_USER_INFO_PENDING'
export const GET_USER_INFO_FULFILLED = 'GET_USER_INFO_FULFILLED'

export const GET_TIME_ENTRIES = 'GET_TIME_ENTRIES'
export const GET_TIME_ENTRIES_PENDING = 'GET_TIME_ENTRIES_PENDING'
export const GET_TIME_ENTRIES_FULFILLED = 'GET_TIME_ENTRIES_FULFILLED'

export const SAVE_TIME_ENTRY = 'SAVE_TIME_ENTRY'
export const SET_API_KEY = 'SET_API_KEY'

export const CREATE_TIME_ENTRY = 'CREATE_TIME_ENTRY'  
export const CREATE_TIME_ENTRY_PENDING = 'CREATE_TIME_ENTRY_PENDING'
export const CREATE_TIME_ENTRY_FULFILLED = 'CREATE_TIME_ENTRY_FULFILLED'

export const DELETE_TIME_ENTRY = 'DELETE_TIME_ENTRY'  
export const DELETE_TIME_ENTRY_PENDING = 'DELETE_TIME_ENTRY_PENDING'
export const DELETE_TIME_ENTRY_FULFILLED = 'DELETE_TIME_ENTRY_FULFILLED'

// ------------------------------------
// Actions
// ------------------------------------

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

export function createTimeEntry (time_entry: TimeEntryObject) {
  return {
    type: CREATE_TIME_ENTRY,
    payload: time_entry
  }
}

export function deleteTimeEntry (entryId: TimeEntryObject) {
  return {
    type: DELETE_TIME_ENTRY,
    payload: entryId
  }
}

export function fetchTimeEntries(start: string, end: string): Function {
  return (dispatch: Function, getState: Function): Promise => {
    return fetch('https://www.toggl.com/api/v8/time_entries?start_date=' + start + '&end_date=' + end, {
        headers: buildRequestHeader(getState()),
        mode: 'cors',
    })
      .then(response => dispatch(getTimeEntries(response.json())))
  }
}

export function fetchUserInfo(): Function {
  return (dispatch: Function, getState: Function): Promise => {
    return fetch('https://www.toggl.com/api/v8/me?with_related_data=true', {
        headers: buildRequestHeader(getState()),
    })
      .then(response => dispatch(getUserInfo(response.json())))
  }
}

export function requestCreateTimeEntry(time_entry): Function {
  return (dispatch: Function, getState: Function): Promise => {
    return fetch('https://www.toggl.com/api/v8/time_entries', {
        headers: buildRequestHeader(getState()),
        method: 'POST',
        body: JSON.stringify({time_entry:time_entry})
    })
      .then(response => dispatch(createTimeEntry(response.json())))
  }
}

export function requestDeleteTimeEntry(entryId): Function {
  return (dispatch: Function, getState: Function): Promise => {
    return fetch('https://www.toggl.com/api/v8/time_entries/' + entryId, {
        headers: buildRequestHeader(getState()),
        method: 'DELETE'
    })
      .then(response => dispatch(deleteTimeEntry(entryId)))
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
  fetchTimeEntries,
  getTimeEntries,
  
  fetchUserInfo,
  getUserInfo,
  
  setApiKey,
  setApiKeyAndFetchUserInfo,
  
  requestCreateTimeEntry,
  createTimeEntry,

  requestDeleteTimeEntry
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const TOGGLOL_ACTION_HANDLERS = {
  [GET_TIME_ENTRIES_PENDING]: (state: TogglolStateObject): TogglolStateObject => {
    return ({ ...state, fetching: true })
  }, 
  [GET_TIME_ENTRIES_FULFILLED]: (state: TogglolStateObject, action: {payload: Array<TimeEntryObject>}): TogglolStateObject => {
    return ({ ...state, time_entries: action.payload, fetching: false })
  },
  [GET_USER_INFO_PENDING]: (state: TogglolStateObject): TogglolStateObject => {
    return ({ ...state, fetching: true })
  }, 
  [GET_USER_INFO_FULFILLED]: (state: TogglolStateObject, action: {payload: Array<ProjectObject>}): TogglolStateObject => {
    return ({ ...state, data: action.payload.data, fetching: false, user_loaded: true })
  },
  [CREATE_TIME_ENTRY_PENDING]: (state: TogglolStateObject): TogglolStateObject => {
    return ({ ...state, fetching: true })
  },
  [CREATE_TIME_ENTRY_FULFILLED]: (state: TogglolStateObject, action: {payload: TimeEntryObject}): TogglolStateObject => {
    return ({ ...state, time_entries: state.time_entries.concat([action.payload.data]), fetching: false })
  },
  [DELETE_TIME_ENTRY_PENDING]: (state: TogglolStateObject): TogglolStateObject => {
    return ({ ...state, fetching: true })
  },
  [DELETE_TIME_ENTRY]: (state: TogglolStateObject, action): TogglolStateObject => {
    var entryId = action.payload;
    var time_entries = state.time_entries.filter(function(entry){
        return entry.id !== entryId;
    });
    return ({ ...state, fetching: false, time_entries: time_entries })
  },
  [SET_API_KEY]: (state: TogglolStateObject, action: {payload: string}): TogglolStateObject => {
    return ({ ...state, api_key: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: TogglolStateObject = { user_loaded: false, fetching: false, time_entries: [], api_key: '', data: undefined }  
export default function togglolReducer (state: TogglolStateObject = initialState, action: Action): TogglolStateObject {  
  const handler = TOGGLOL_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}