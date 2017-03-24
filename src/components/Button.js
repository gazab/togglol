    import React from 'react';
    
const buttonStyle = {
    backgroundColor: '#F0F'
}


const buttonHoverStyle = {
    backgroundColor: '#990099'
}

const baseButtonStyle = {
    padding: '10px',
    margin: '10px',
    border: '1px solid #000',
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

        click(e) {
            console.log("Click!")
            e.preventDefault();
        }

        render() {

            let style = buttonStyle
            if(this.state.hover)
            {
                style = buttonHoverStyle
            }
            
// onClick={(e) => this.props.onButtonClick(e)}

            return (
                <div style={{...baseButtonStyle,...style}} onClick={(e) => this.click(e)} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)}>
                    {this.props.label}
                </div>
            )}
    }

    export default Button