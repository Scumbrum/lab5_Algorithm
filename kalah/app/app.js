import React from "react"
import ReactDOM from "react-dom"
import Board from "./Board.js"
import Status from "./Status.js"
import Kalah from "../../gameKalah/Kalah"
import Difficult from "./Difficult.js"
import Bot from "../../bot/Bot"
import First from "./First.js"
import Swap from "./Swap.js"
import Start from "./Start.js"

const d = React.createElement
class Div extends React.Component {
    constructor(props) {
        super(props)
        let kalah = new Kalah(3)
        this.state = {
            status: "Begin",
            kalah: kalah,
            difficult: 1,
            reload:false,
            bot: new Bot(kalah,1),
            first: "right"
        }
        this.state.kalah.setFirst(this.state.first)
    }
    _getStatus(kalah){
        console.log(kalah.winer)
        console.log(kalah.board)
        if(this.state.kalah.getQueue == "right" && !this.state.kalah.getOver) {
            this.setState({status: "Your Step"})
        } else if (this.state.kalah.getQueue == "left" && !this.state.kalah.getOver){
            this.setState({status: "Enemy Step"})
        } else if(this.state.kalah.winer == "left"){
            this.setState({status: "Left won"})
        } else if(this.state.kalah.winer == "right"){
            this.setState({status: "Right won"})
        } else {
            this.setState({status: "Draw"})
        }
    }

    _tryEnemyStep(kalah) {
        if(kalah.getQueue == "left") {
            this.state.bot = new Bot(this.state.kalah,this.state.difficult)
            this.state.bot.getResult
            this.setState({kalah: this.state.kalah})
            this._getStatus(this.state.kalah)
            if(this.state.kalah.over) {
                return
            }
            setTimeout(this._tryEnemyStep.bind(this,this.state.kalah),1000)
        } else {
            return
        }
    }

    _makeStep(index) {
        if(this.state.status=="Begin") {
            return
        }
        try {
            this.state.kalah.gamerStep(index)
            this.setState({board: this.state.kalah})
        } catch(e) {
            alert(e)
        }
        this._getStatus(this.state.kalah)
        setTimeout(this._tryEnemyStep.bind(this,this.state.kalah),1000)
    }

    _difSetter(number){
        this.setState({difficult:number})
        let newKalah = new Kalah(3)
        this._reload(newKalah)
    }
    _reload(newKalah, first = "right") {
        this.setState({kalah:newKalah})
        this.setState({bot:new Bot(this.state.kalah,this.state.difficult)})
        newKalah.setFirst(first)
    }

    _firstSetter(first) {
        let newKalah = new Kalah(3)
        this._reload(newKalah, first)
        this.setState({first:first})
        if(first == "left") {
            setTimeout(this._tryEnemyStep.bind(this,this.state.kalah),1000)
        }
    }

    _swap() {
        try{
        this.state.kalah.gamerStep(4,true)
        this.setState({kalah: this.state.kalah})
        this._tryEnemyStep(this.state.kalah)
        } catch(e) {
            alert(e)
        }
    }

    _start() {
        this._getStatus(this.state.kalah)
        if(this.state.first=="left") {
            setTimeout(this._tryEnemyStep.bind(this,this.state.kalah),1000)
        }
    }

    render() {
        let start = <Start onClick = {this._start.bind(this)}/>
        return (
            <>  <div className = "option">
                    <First firstSetter = {this._firstSetter.bind(this)}/>
                    <Difficult difSetter = {this._difSetter.bind(this)}/>
                </div>
                <Status>{this.state.status}</Status>
                <Board changer = {this._makeStep.bind(this)} board = {this.state.kalah.board}/>
                <div className = "controller">
                    {this.state.status =="Begin" ? start: null}
                    <Swap onClick = {this._swap.bind(this)}></Swap>
                </div>
            </>
        )
    }
}

ReactDOM.render(d(Div),document.querySelector(".game-kalah"))