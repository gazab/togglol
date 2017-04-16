import React from 'react'
import PropTypes from 'prop-types'

class ReportDownloadButton extends React.Component {
    constructor(props) {
        super(props);
    }

    getReportUrl(extension)
    {
        const userId = this.props.userId;
        const workspaceId = this.props.workspaceId;
        const startDate = "2017-03-01"
        const endDate = "2017-03-31"
        const apiToken = this.props.apiToken;
        const userAgent = "https://www.togglol.com <gustav.toner@gmail.com>"
        
        return "https://"+ apiToken + ":api_token@toggl.com/reports/api/v2/details." + extension + "?rounding=Off&status=active&user_ids="+ userId + "&billable=both&calculate=time&sortDirection=asc&sortBy=date&page=1&subgrouping=time_entries&order_field=date&order_desc=off&distinct_rates=Off&description=&since="+ startDate + "&until=" + endDate + "&period=prevMonth&with_total_currencies=1&user_agent="+ userAgent + "&workspace_id=" + workspaceId + "&bars_count=31&subgrouping_ids=true&bookmark_token=&date_format=DD%2FMM%2FYYYY";
    }

    render() {
        return(
            <div className={this.props.className}>
                <div className="btn-group">
                    <a role="button" href={this.getReportUrl("xls")} className="btn btn-secondary">Get report as XLS</a>
                    <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href={this.getReportUrl("pdf")}>Get report as PDF</a>
                        <a className="dropdown-item" href={this.getReportUrl("csv")}>Get report as CSV</a>
                    </div>
                </div> 
            </div>
        )
    }
}

export default ReportDownloadButton