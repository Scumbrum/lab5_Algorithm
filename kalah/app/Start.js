import React from "react";
import "../styles/style.css"

export default class Start extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <button className = "start" onClick={this.props.onClick}>Start</button>
        )
    }
}