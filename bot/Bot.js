import Kalah from "../gameKalah/Kalah.js"
import GameGraph from "../graph/GameGraph.js"

export default class Bot {

    constructor(kalah, difficult) {
        this.graph = new GameGraph(kalah.board, difficult * 2 + 1).getGraph
        this.index = 0
        this.swap = false
        this.alpha = -Infinity
        this.beta = Infinity
        this.kalah = kalah
        this.difficult = difficult
    }

    _makeStep(){
        let value = null
        if(!this._trySwap(this.kalah)) {
            value = this._pruning(this.alpha, this.beta, this.graph)
        } else {
            return
        }
        for(let i = 0; i < this.graph.child.length; i++) {
            if(this.graph.child[i].number == value) {
                this.index = this.graph.child[i].pick
                return
            }
        }
    }

    _trySwap(kalah) {
        try{
            if(this.kalah.board.rightKalah - this.kalah.board.leftKalah > 1) {
                this.kalah.opponentStep(7, true)
                this.index = 1
                this.swap = true
                return true
            }
        } catch(e) {
            this.swap = false
            return false
        }
    }



    _pruning(alpha, beta, node){
        let value = node.number
        for(let child of node.child) {
            let newValue = this._pruning(alpha, beta, child)
            if(node.type == "min" && newValue < value) {
                value = newValue
                beta = value
            } else if (node.type == "max" && newValue > value) {
                value = newValue
                alpha = value
            }
            if(alpha >= beta) {
                break
            }
        }
        node.number = value
        return value
    }

    get getResult() {
        this._makeStep()
        if(!this.swap){
            this.kalah.opponentStep(this.index + 6, this.swap)
        }
        return [this.index, this.swap]
    }
}