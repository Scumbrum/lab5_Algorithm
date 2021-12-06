import React from "react";
import "../styles/style.css"

export default class Status extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <h1 className = "status">{this.props.children}</h1>
        )
    }
}