    import React from 'react';
    
const buttonStyle = {
    backgroundColor: '#F0F'
}


const buttonHoverStyle = {
    backgroundColor: '#FF0'
}

const baseButtonStyle = {
    padding: '10px',
    margin: '10px',
    border: '1px solid #000'
}


    class Button extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                hover: false
            }
        }

        mouseEnter() {
            this.setState({hover: true});
        }

        mouseLeave() {
            this.setState({hover: false});
        }

        render() {

            let style = buttonStyle
            if(this.state.hover)
            {
                style = buttonHoverStyle
            }
            
            return (
                <div style={{...baseButtonStyle,...style}} onClick={(e) => this.props.onClick(e)} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)}>
                    {this.props.label}
                </div>
            )}
    }

    export default Button