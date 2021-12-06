import React from "react";
import "../styles/style.css"

export default class First extends React.Component{
    constructor(props){
        super(props)
    }

    _executor(event) {
        let number = event.target.value
        this.props.firstSetter(number)
    }

    render() {
        return (
            <>
            <select className = "first" onChange = {this._executor.bind(this)}>
                <option value = "right">Right</option>
                <option value = "left">Left</option>
            </select>
            </>
        )
    }
}