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

    /**
     * Initializes the connections of Neat
     */
    _initConnections() {
        this.connections = [];

        for (let i = 1; i <= this.inputNumber; i++) {
            for (let j = this.inputNumber; j < this.inputNumber + this.outputNumber; j++) {
                const outNode = this.nodes[j];
                const inNode = this.nodes[i-1];
                const newConnection = new Connection(uuid(), random(-2, 2), true);
                newConnection.inNode = inNode;
                newConnection.outNode = outNode;
                this.connections.push(newConnection);     
            }
        }
    }

    /**
     * Initializes the nodes of Neat
     */
    _initNodes() {
        this.nodes = [];
        const totalNodes = this.inputNumber + this.outputNumber;
        for (let i = 1; i <= totalNodes; i++) {
            this.nodes.push(new Node(uuid()));
        }
    }

    /**
     * Mutates the network
     *    - If no option is passed then it randomly selects a mutation method.
     * @param {bool} addNode Optional parameter to choose to mutate using addNode
     * @param {bool} addConnection Optional parameter to choose to mutate by adding a connection
     */
    mutate(addNode, addConnection) {
        if (addNode) {
            this._mutateAddNode();
        }
    }

    /**
     * Mutate the network by randomly adding a node in a connection
     */
    _mutateAddNode() {
        const randomNum = parseInt(random(0, this.connections.length));
        const connection = this.connections[randomNum];
        const inNode = connection.inNode;
        const outNode = connection.outNode;
        const newNode = new Node(uuid());
        const newConnection1 = new Connection(uuid());
        const newConnection2 = new Connection(uuid());
        newConnection1.inNode = inNode;
        newConnection1.outNode = newNode;
        newConnection2.inNode = newNode;
        newConnection2.outNode = outNode;
        this.nodes.push(newNode);
        this.connections.splice(randomNum, 1);
        this.connections.push(newConnection1);
        this.connections.push(newConnection2);
    }

    activate(inputs) {
        if (!Array.isArray(inputs)) throw Error('Invalid type: inputs must be an array.');
        if (inputs.length !== this.inputNumber) throw Error(`Invalid number of inputs: this network requires ${this.inputNumber} inputs.`);

        for (let i = 0; i < this.inputNumber; i++) {
            this.nodes[i].value = inputs[i];
        }
        for (let i = 0; i < this.connections.length; i++) {
            this.connections[i].activate();
        }
        const result = [];
        for (let i = this.inputNumber; i < this.inputNumber + this.outputNumber; i++) {
            result.push(this.nodes[i].value);
        }
        return result;
    }
}