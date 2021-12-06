export default class Node {
    constructor(value, parent, type) {
        this.value = value
        this.child = []
        this.parent = parent
        this.type = type
        this._setNumber()
        this.pick = 0
    }

    _setNumber() {
        if(this.type == "min") {
            this.number = Infinity
        } else {
            this.number = -Infinity
        }
    }

    addChild(node) {
        this.child.push(node)
    }

    removeChild(node) {
        for(let i = 0; i < this.child.length; i++) {
            if(this.child[i] === node) {
                this.child.splice(i,1)
            }
        }
    }

    set setNumber(number) {
        this.number = number
    }

    get getNumber() {
        return this.number
    }
}