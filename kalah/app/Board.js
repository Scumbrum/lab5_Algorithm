import React from "react";
import "../styles/style.css"
import Hole from "./Hole.js";


export default class Board extends React.Component{
    constructor(props) {
        super(props) 
    }


    _createholes() {
        
        const array = []
        for(let i = 0; i < 6; i++) {

            array.push(<Hole balls = {this.props.board.opponentHoles[i]} key = {i} />)
        }
        for(let i = 0; i < 6; i++) {
            array.push(<Hole balls = {this.props.board.gamerHoles[i]} key = {i + 6}  onClick = {(e) => 
                this.props.changer(i)}/>)
        }
        array.push(<Hole balls = {this.props.board.leftKalah} className = "left-kalah" key = {13}/>)
        array.push(<Hole balls = {this.props.board.rightKalah} className = "right-kalah" key = {14}/>)
        return array
    }

    render() {
        return (
            <div className = "board">
                {this._createholes()}
            </div>
        )
    }
}