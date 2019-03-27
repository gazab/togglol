import React from 'react';

import { getTotalDurationForEvents, groupByProject } from '../../../../helpers/EventHelper';

class SummaryBar extends React.Component {
    render () {
        const events = this.props.events;

        let totalHours = getTotalDurationForEvents(events);
        let projectGroups = groupByProject(events);
        
        let totalCount;
        if (totalHours !== 0) {
            totalCount = <div className="progress-bar" role="progressbar" style={barStyle('gray', 10)}>Total {totalHours}h</div>
        }

        return (
            <div>
                <div className="progress mb-2">
                    {projectGroups.map(function (group) {
                        let color = group[0].project.hex_color;
                        let name = group[0].project.name;
                        let id = group[0].projectId;
                        let hours = getTotalDurationForEvents(group);
                        let percentage = (hours / totalHours) * 100;
                        return (
                            <div key={id} className="progress-bar" role="progressbar" style={barStyle(color, percentage)} title={name}>{hours}h</div>
                        );
                    })
                    }
                    {totalCount}
                </div>
            </div>
        );
    }
};

function barStyle (color, percentage) {
    return {
        backgroundColor: color,
        width: percentage + '%',
        minWidth: '30px'
    };
}

export default SummaryBar;
