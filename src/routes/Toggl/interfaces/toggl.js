/* @flow */

/* Example time entry
    "id":436691234,
    "wid":777,
    "pid":123,
    "billable":true,
    "start":"2013-03-11T11:36:00+00:00",
    "stop":"2013-03-11T15:36:00+00:00",
    "duration":14400,
    "description":"Meeting with the client",
    "tags":[""],
    "at":"2013-03-11T15:36:58+00:00"
  */
  


export type TimeEntryObject = {  
  id: number,
  wid: number,
  pid: number,
  billable: boolean,
  start: string,
  stop: string,
  duration: number,
  description: string,
  tags: Array<string>,
  at: string
}

export type ProjectObject = {
  id: number,
  wid:number,
  cid:number,
  name:string,
  billable:boolean,
  is_private:boolean,
  active:boolean,
  at:string,
  template:boolean,
  color: string
}

export type TogglStateObject = {  
  api_key: ?string,
  fetching: boolean,
  user_loaded: boolean,
  time_entries: Array<TimeEntryObject>,
  projects: Array<ProjectObject>
}
