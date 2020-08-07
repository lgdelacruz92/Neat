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

        for (let i = 1; i <= this.inputNumber; i++) {
            for (let j = this.inputNumber; j < this.inputNumber + this.outputNumber; j++) {
                const outNode = this.nodes[j];
                const inNode = this.nodes[i-1];
                const newConnection = new Connection(i, random(-2, 2), true);
                newConnection.inNode = inNode;
                newConnection.outNode = outNode;
                this.connections.push(newConnection);     
            }
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