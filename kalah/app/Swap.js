import React from "react";
import "../styles/style.css"

export default class Swap extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <button className = "swap" onClick={this.props.onClick}>Swap</button>
        )
    }
}