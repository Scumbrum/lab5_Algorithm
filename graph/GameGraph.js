import Node from "./Node.js"
import Kalah from "../gameKalah/Kalah.js"
import Board from "../gameKalah/Board.js"

export default class GameGraph{

    constructor(board, depth) {
        this.board = board
        this.depth = depth
        this.graph = new Node(Board.copy(board), null, "min")
        this._createGraph(depth, this.graph)
    }

    _createGraph(depth, node){
        if(depth == 0) {
            node.number = node.value.rightKalah - node.value.leftKalah
            return
        }
    
        for(let i = 0 ; i < 6; i++) {
            const currBoard = Board.copy(node.value)

            const kalah = new Kalah(3, currBoard)

            if(node.type == "min") {
                kalah.setFirst("left")
            } else {
                kalah.setFirst("right")
            }

            try {
                let over = false
                if(node.type == "min") {
                    over = kalah.opponentStep(i + 6)
                } else {
                    over = kalah.gamerStep(i)
                }
                if(over) {
                    node.setNumber(node.board.rightKalah - node.board.leftKalah)
                    continue
                }
                let childNode = null
                if(kalah.getQueue == "right") {
                    childNode = new Node(Board.copy(kalah.board), node, "max")
                } else {
                    childNode = new Node(Board.copy(kalah.board), node, "min")
                }
                childNode.pick = i
                node.addChild(childNode)
                this._createGraph(depth-1, childNode)
            }  catch(e) {
                continue
            }
        }
    }

    get getGraph(){
        return this.graph
 
    }
}