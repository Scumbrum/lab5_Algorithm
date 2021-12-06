import React from "react";
import "../styles/style.css"
import Ball from "./Ball.js";

export default class Hole extends React.Component{
    constructor(props) {
        super(props)
    }

    _createholes(){
        let array = []
        for(let i = 0; i< this.props.balls; i++) {
            array.push(<Ball key = {i}/>)
        }
        return array
    }

    render() {
        return (
            <div className = {this.props.className ? this.props.className + " hole" : "hole"} key = {this.props.keyK} onClick = {this.props.onClick}>
                {this._createholes()}
            </div>
        )
    }
}