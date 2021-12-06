import Board from "./Board.js"

export default class Kalah {

    constructor(number, board = new Board(number)) {

        this.steps = 0
        this.board = board
        this.queue = new Map()
        this.maxIndex = 6
        this.swap = true

    }

    setFirst(gamer) {

        if(gamer == "right") {

            this.queue.set("right", 0)
            this.queue.set("left", 1)

        } else if (gamer == "left") {

            this.queue.set("right", 1)
            this.queue.set("left", 0)

        } else {

            throw new Error("None valid gamer")

        }
    }

    _checkStep(gamer) {
        if(this.queue.get(gamer) != this.steps % 2) {
            throw new Error("It is not your step")
        }
    }

    _checkIndex(index) {
        if(this.maxIndex <= index || index < 0) {
            throw new Error("Index out of bound")
        }
    }

    _pickBalls(row, index) {
        let number = 0
        if(row == "lower") {
            number = this.board.gamerHoles[index]
            this.board.gamerHoles[index] = 0
        } else {
            number =  this.board.opponentHoles[index]
            this.board.opponentHoles[index] = 0
        }
        if(number == 0) {
            throw new Error("Emty hole")
        }
        return number
    }
    
    _putBalls(index, number, row) {

        let direction = row == "lower" ? 1 : -1
        let currentRow = row == "lower" ? this.board.gamerHoles : this.board.opponentHoles

        for(let i = 0; i < number; i++) {
            if(index == currentRow.length && direction == 1) {
                currentRow = this.board.opponentHoles
                direction *= -1
                index = currentRow.length - 1
                if(row == "lower") {
                    this.board.rightKalah++
                    if(i < 7) {
                        this.steps++
                    }
                } else {
                    currentRow[index]++
                    index += direction
                }
                continue
            } else if (index == -1 && direction == -1) {
                currentRow = this.board.gamerHoles
                direction *= -1
                index = 0
                if(row == "upper") {
                    this.board.leftKalah++
                    this.steps++
                } else {
                    currentRow[index]++
                    index += direction
                }
                continue
            }

            currentRow[index]++

            let mainRow = row == "lower" ? this.board.gamerHoles : this.board.opponentHoles

            if (i == number - 1 && currentRow[index] == 1 && currentRow === mainRow) {
                if(row == "lower" && this.board.opponentHoles[index] != 0) {
                    this.board.rightKalah += this.board.opponentHoles[index] + 1
                    this.board.opponentHoles[index] = 0
                    currentRow[index] = 0
                } else if(row == "upper" && this.board.gamerHoles[index] != 0) {
                    this.board.leftKalah += this.board.gamerHoles[index] + 1
                    this.board.gamerHoles[index] = 0
                    currentRow[index] = 0
                }
            }

            index += direction

        }

    }

    _checkOver() {
        let count = 0
        count = this.board.gamerHoles.reduce((a,b) => a + b)
        if(count == 0) {
            this.over = true
            return true
        } 
        count = this.board.opponentHoles.reduce((a,b) => a + b)
        if(count == 0) {
            this.over = true
            return true
        } 
        return false
    }

    _trySwap(gamer) {

        if(this.queue.get(gamer) == 1 && this.swap) {
            let tempHoles = [...this.board.opponentHoles]
            
            for(let hole = 0; hole < this.board.gamerHoles.length; hole++) {
                this.board.opponentHoles[this.board.opponentHoles.length - hole - 1] = this.board.gamerHoles[hole]
            }
            for(let hole = 0; hole < tempHoles.length; hole++) {
                this.board.gamerHoles[this.board.gamerHoles.length - hole - 1] = tempHoles[hole]
            }
            let tempKalah = this.board.rightKalah
            this.board.rightKalah = this.board.leftKalah
            this.board.leftKalah = tempKalah
            this.swap = false
            return true
        }
        return false
    }

    gamerStep(index = 0, wrap = false) {
        this._checkStep("right")

        this._checkIndex(index)

        if(wrap && this._trySwap("right")) {
            this.steps++
            return
        } else if (wrap && !this._trySwap("right")) {
            throw new Error("Can't swap")
        }

        const number = this._pickBalls("lower", index)

        this._putBalls(index + 1, number, "lower")

        if(this._checkOver()) {
            this.board.leftKalah += this.board.opponentHoles.reduce((p, n) => p + n)
            for(let i = 0; i< this.board.opponentHoles.length;i++) {
                this.board.opponentHoles[i] = 0
            }
            this.board.rightKalah += this.board.gamerHoles.reduce((p, n) => p + n)
            for(let i = 0; i< this.board.gamerHoles.length;i++) {
                this.board.gamerHoles[i] = 0
            }
            if(this.board.rightKalah > this.board.leftKalah) {
                this.winer = "right"
            } else if (this.board.rightKalah < this.board.leftKalah){
                this.winer = "left"
            } else {
                this.winer = "draw"
            }
            return true
            
        }

        this.steps++
        return false
    }

    opponentStep(index = 0, wrap = false) {
        this._checkStep("left")

        this._checkIndex(index - 6)

        if(wrap && this._trySwap("left")) {
            this.steps++
            return
        } else if (wrap && !this._trySwap("left")) {
            throw new Error("Can't swap")
        }

        let number = this._pickBalls("upper", index - 6)

        this._putBalls(index - 7, number, "upper")

        if(this._checkOver()) {
            this.board.rightKalah += this.board.gamerHoles.reduce((p, n) => p + n)

            for(let i = 0; i< this.board.gamerHoles.length;i++) {
                this.board.gamerHoles[i] = 0
            }

            this.board.leftKalah += this.board.opponentHoles.reduce((p, n) => p + n)
            for(let i = 0; i< this.board.opponentHoles.length;i++) {
                this.board.opponentHoles[i] = 0
            }
            
            if(this.board.rightKalah > this.board.leftKalah) {
                this.winer = "right"
            } else if (this.board.rightKalah < this.board.leftKalah){
                this.winer = "left"
            } else {
                this.winer = "draw"
            }

            return true
        }

        this.steps++
        return false
    }

    get getQueue() {
        for(let key of this.queue.keys()) {
            if(this.queue.get(key) == this.steps % 2) {
                return key
            }
        }
    }

    static copy(kalah) {
        const newKalah = new Kalah(3, Board.copy(kalah.board))
        newKalah.steps = kalah.steps
        newKalah.queue.set("right", kalah.queue.get("right"))
        newKalah.queue.set("left", kalah.queue.get("left"))
        newKalah.swap = kalah.swap
        return newKalah
    }

    get showBoard() {
        return this.board
    }

    set setBoard(board) {
        this.board = board
    }

    get getOver() {
        return this.over
    }
}