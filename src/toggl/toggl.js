import moment from 'moment';
require('moment-duration-format');

export function createTogglEntry (id, description, projectId, startDate, endDate, billable) {
    startDate = moment(startDate);
    endDate = moment(endDate);

    var entry = {
        id: id,
        description: description,
        pid: projectId,
        start: startDate.toISOString(),
        duration: endDate.diff(startDate, 'seconds'),
        billable: billable,
        created_with: 'Togglol'
    };

    return entry;
}
