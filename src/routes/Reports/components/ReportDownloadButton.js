import React from 'react'
import PropTypes from 'prop-types'

const base64 = require('base-64');

class ReportDownloadButton extends React.Component {
    constructor(props) {
        super(props);
    }

    getReportUrl(extension)
    {
        const userId = this.props.userId;
        const workspaceId = this.props.workspaceId;
        const startDate = this.props.startDate; 
        const endDate = this.props.endDate; 
        const apiToken = this.props.apiToken;
        const userAgent = "https://www.togglol.com (gustav.toner@gmail.com)"
        
        return "https://toggl.com/reports/api/v2/details." + extension + "?rounding=Off&status=active&user_ids="+ userId + "&billable=both&calculate=time&sortDirection=asc&sortBy=date&page=1&subgrouping=time_entries&order_field=date&order_desc=off&distinct_rates=Off&description=&since="+ startDate + "&until=" + endDate + "&period=prevMonth&with_total_currencies=1&user_agent="+ userAgent + "&workspace_id=" + workspaceId + "&bars_count=31&subgrouping_ids=true&bookmark_token=&date_format=DD%2FMM%2FYYYY";
    }

    buildRequestHeader() {
        // Construct header
        var api_key = this.props.apiToken;
        var headers = new Headers();
        headers.append("Authorization", "Basic " + base64.encode(api_key + ":api_token"));
        return headers;
    }

    getReport(extension)
    {
        const url = this.getReportUrl(extension);
        console.log(url);
        const that = this;
        fetch(url, { headers: that.buildRequestHeader(),})
            .then(function(response) { 
                return response.blob() 
            })
            .then(function(reportBlob) {
                that.updateAndClickLink(reportBlob, extension);
            });
    }

    updateAndClickLink(reportBlob, extension)
    {
        const windowUrl = window.URL || window.webkitURL;
        const dataUrl = windowUrl.createObjectURL(reportBlob);
        this.reportLink.href = dataUrl;
        this.reportLink.download = this.props.name.replace(" ", "_") + "_Toggl_time_entries_" + this.props.startDate + "_to_" + this.props.endDate + "." + extension
        this.reportLink.click();
    }

    render() {
        return(
            <div className={this.props.className}>
                <div className="btn-group">
                    <button type="button" onClick={() => this.getReport("xls")} className="btn btn-secondary">Get report as XLS</button>
                    <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className="dropdown-menu">
                        <button disabled type="button" className="dropdown-item" onClick={() => this.getReport("pdf")}>Get report as PDF</button>
                        <button type="button" className="dropdown-item" onClick={() => this.getReport("csv")}>Get report as CSV</button>
                    </div>
                </div>
                <a className="hidden-xs-up" href="#" ref={(link) => this.reportLink = link} /> 
            </div>
        )
    }
}

export default ReportDownloadButton