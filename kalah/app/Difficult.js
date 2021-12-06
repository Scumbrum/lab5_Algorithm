import React from "react";
import "../styles/style.css"

export default class Difficult extends React.Component{
    constructor(props) {
        super(props)
    }

    _executor(event) {
        let number = event.target.value
        console.log(number)
        this.props.difSetter(number)
    }

    render() {
        return (
            <>
            <select className = "difficulty" onChange = {this._executor.bind(this)}>
                <option value = "1">Easy</option>
                <option value = "2">Medium</option>
                <option value = "3">Hard</option>
            </select>
            </>
        )
    }
}