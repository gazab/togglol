import React from 'react';

const divStyle = {
        height: '100%',
        width: '100%'
    }

    const titleStyle = {
        fontWeight: 'bold'
    }

    const buttonBarStyle = {
        position: 'absolute',
        bottom: 15,
        width: '100%'
    }

    const billableStyle = {
        position: 'absolute',
        top: 0,
        right: 0,
        borderBottomLeftRadius: '5px',
        height: '20px',
        width: '20px',
        fontSize: '12px',
        opacity: '0.3',
        backgroundColor: 'rgba(255,255,255,0.0)',
        fontWeight: 'bold',
        color: '#FFF',
        borderLeft: '1px solid #FFF',
        borderBottom: '1px solid #FFF',
        padding: '3px 5px 0px 6px',
    }

    class TimeEntryEvent extends React.Component {
        render() {

            let billable = null;
            if(this.props.event.billable)
            {
                billable = <span style={billableStyle}>$</span>
            }

            
            return (
                <div style={divStyle}>
                    {billable}
                    <div style={titleStyle}>
                        {this.props.event.title}
                    </div>
                    <div>{this.props.event.description}</div>
                    <div style={buttonBarStyle}>
                    </div>
                </div>
                )}
}

export default TimeEntryEvent;