const random = (lowerBound, upperBound) => {
    return Math.random() * upperBound + lowerBound;
}

class Neat {
    constructor(inputNumber, outputNumber) {
        if (!inputNumber) throw Error('Value required: inputNumber.');
        if (!outputNumber) throw Error('Value required: outputNumber.');
        this.inputNumber = inputNumber;
        this.outputNumber = outputNumber;

        this._initNodes();
        this._initConnections();
    }

    _initConnections() {
        this.connections = [];
        const totalNodes = this.inputNumber + this.outputNumber - 1;

        for (let i = 1; i <= totalNodes; i++) {
            this.connections.push(new Connection(i, random(-2, 2), true));
        }
    }

    _initNodes() {
        this.nodes = [];
        const totalNodes = this.inputNumber + this.outputNumber;
        for (let i = 1; i <= totalNodes; i++) {
            this.nodes.push(new Node(i));
        }
    }

    activate() {
        return [2];
    }
}