export default class Board {

    constructor(number) {

        this.opponentHoles = []
        this.gamerHoles = []

        for(let i = 0; i < 6; i++) {
            this.opponentHoles.push(number)
            this.gamerHoles.push(number)
        }

        this.rightKalah = 0
        this.leftKalah = 0   
    }

    static copy(board) {
        const newBoard = new Board(3)
        newBoard.leftKalah = board.leftKalah
        newBoard.rightKalah = board.rightKalah
        newBoard.opponentHoles = [...board.opponentHoles]
        newBoard.gamerHoles = [...board.gamerHoles]
        return newBoard
    }

}