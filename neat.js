const random = (lowerBound, upperBound) => {
    return Math.random() * upperBound + lowerBound;
}

class Neat {
    constructor(inputNumber, outputNumber) {
        if (!inputNumber) throw Error('Value required: inputNumber.');
        if (!outputNumber) throw Error('Value required: outputNumber.');
        this.inputNumber = inputNumber;
        this.outputNumber = outputNumber;
        
        this.inputNodeIds = {};
        this.outputNodeIds = {};
        this._initNodes();
        this._initConnections();
    }

    /**
     * Returns a copy of itself
     * @return {Neat} new Neat copy
     */ 
    copy() {
        const newNeat = new Neat(this.inputNumber, this.outputNumber);
        newNeat.inputNodeIds = JSON.parse(JSON.stringify(this.inputNodeIds));
        newNeat.outputNodeIds = JSON.parse(JSON.stringify(this.outputNodeIds));
        newNeat.connections = this.connections.map(cnn => cnn.copy());
        this._fillNodesFromConnections(newNeat);
        return newNeat;
    }

    /**
     * Fills it's nodes with the proper nodes
     * @param {Neat} newNeat The new Neat copy
     */
    _fillNodesFromConnections(newNeat) {
        newNeat.nodes = [];
        const alreadyExists = {};
        newNeat.connections.forEach(cnn => {
            if (!alreadyExists[cnn.inNode.id]) {
                newNeat.nodes.push(cnn.inNode);
                alreadyExists[cnn.inNode.id] = true;
            }
            if (!alreadyExists[cnn.outNode.id]) {
                newNeat.nodes.push(cnn.outNode);
                alreadyExists[cnn.outNode.id] = true;
            }
        });
    }

    /**
     * Initializes the connections of Neat
     */
    _initConnections() {
        this.connections = [];

        for (let i = 0; i < this.inputNumber; i++) {
            for (let j = this.inputNumber; j < this.inputNumber + this.outputNumber; j++) {
                const outNode = this.nodes[j];
                const inNode = this.nodes[i];
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
        for (let i = 0; i < this.inputNumber; i++) {
            const newId = uuid();
            this.inputNodeIds[newId] = true;
            this.nodes.push(new Node(newId));
        }

        const totalNodes = this.inputNumber + this.outputNumber;
        for (let i = this.inputNumber; i < totalNodes; i++) {
            const newId = uuid();
            this.outputNodeIds[newId] = true;
            this.nodes.push(new Node(newId));
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
        } else if (addConnection) {
            this._mutateAddConnection();
        }
    }

    /**
     * Mutate the network by adding a random connection.
     */
    _mutateAddConnection() {
        let index1 = parseInt(random(0, this.nodes.length));
        let index2 = parseInt(random(0, this.nodes.length));
        let node1 = this.nodes[Math.min(index1, index2)];
        let node2 = this.nodes[Math.max(index1, index2)];

        while ((this.inputNodeIds[node1.id] && this.inputNodeIds[node2.id]) 
            || node1.id === node2.id
            || (this.outputNodeIds[node1.id] && this.outputNodeIds[node2.id])
            ) {
            index1 = parseInt(random(0, this.nodes.length));
            index2 = parseInt(random(0, this.nodes.length));
            node1 = this.nodes[Math.min(index1, index2)];
            node2 = this.nodes[Math.max(index1, index2)];
        }

        const newConnection = new Connection(uuid(), random(-2, 2), true);
        if (this._isHiddenLayerNode(node2) && this.outputNodeIds[node1.id]) {
            newConnection.inNode = node2;
            newConnection.outNode = node1;
        } else {
            newConnection.inNode = node1;
            newConnection.outNode = node2;
        }
        this.connections.push(newConnection);
    }

    /**
     * Node is hidden layer node
     * @param {Node} node The node to check
     */
    _isHiddenLayerNode(node) {
        return !this.inputNodeIds[node.id] && !this.outputNodeIds[node.id];
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
        const newConnection1 = new Connection(uuid(), Math.random(), true);
        const newConnection2 = new Connection(uuid(), Math.random(), true);
        newConnection1.inNode = inNode;
        newConnection1.outNode = newNode;
        newConnection2.inNode = newNode;
        newConnection2.outNode = outNode;
        this.nodes.push(newNode);
        this.connections.splice(randomNum, 1);
        this.connections.push(newConnection1);
        this.connections.push(newConnection2);
    }

    /**
     * This activates the network according to the inputs
     * @param {Array} inputs The inputs of the network in array format and normalized
     */
    activate(inputs) {
        this.nodes.map(n => { n.value = 0; });
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

    /**
     * Function that crossovers this neat with another neat
     * @param {Neat} otherNeat The neat network to crossover with
     * @param {boolean} deleteExcess Option to delete excess or not
     * @return {Neat} New child neat from the crossover
     */
    crossOver(otherNeat) {

        const connectionPairs = this._getConnectionPairs(otherNeat);
        const parentNodes = this._getParentNodes(otherNeat);
        const innovationNumbers = Object.keys(connectionPairs);
        
        // Make new child
        const newNeatChild = new Neat(this.inputNumber, this.outputNumber);
        newNeatChild.connections = []; //
        this._produceChildConnections(newNeatChild, innovationNumbers, connectionPairs);
        
        return newNeatChild;
    }

    /**
     * Builds a new child nodes for the child
     * @param {Neat} newNeatChild The Neat child
     */
    _buildChildNodes(newNeatChild, nodes) {
        const connections = newNeatChild.connections;
    }

    /**
     * Gets the nodes of this and otherNeat
     * @param {Neat} otherNeat The Neat crossing over with
     */
    _getParentNodes(otherNeat) {
        const alreadyExists = {};
        const nodes = [];
        this.nodes.forEach(n => {
            if (!alreadyExists[n.id]) nodes.push(n.copy());
        });
        otherNeat.nodes.forEach(n => {
            if (!alreadyExists[n.id]) nodes.push(n.copy());
        });
        return nodes;
    }

    /**
     * Gets the connection pairs between this and other neat
     * @param {Neat} otherNeat The neat crossing over with
     */
    _getConnectionPairs(otherNeat) {
        const connectionPairs = {};
        this.connections.forEach(cnn => { this._fillNodePairs(cnn, connectionPairs) });
        otherNeat.connections.forEach(cnn => { this._fillNodePairs(cnn, connectionPairs)});
        return connectionPairs;
    }

    /**
     * Produces the connections of the child.
     * The connections are deep copy connections
     * @param {Neat} newNeatChild The Neat child
     * @param {Array} innovationNumbers Array of innovation numbers representing all the connections found
     * @param {Object} nodePairs Pairs of connections based on innovation numbers.
     * @return void
     */
    _produceChildConnections(newNeatChild, innovationNumbers, nodePairs) {
        innovationNumbers.forEach(innoNumber => {
            const connectionPair = nodePairs[innoNumber];
            if (connectionPair.length === 1) {
                newNeatChild.connections.push(connectionPair[0].copy());
            } else if (connectionPair.length === 2) {
                const randNum = Math.random();
                newNeatChild.connections.push(connectionPair[randNum > 0.5 ? 1 : 0].copy());
            } else {
                throw Error(`This should never happen. Something went wrong. function: crossOver ${connectionPair}`);
            }
        });
    }

    /**
     * Fills the node pairs map
     * @param {Connection} cnn The Connection to append
     * @param {Object} nodePairs Mapping of the node pairs
     */
    _fillNodePairs(cnn, nodePairs) {
        if (nodePairs[cnn.in]) {
            nodePairs[cnn.in].push(cnn);
        } else {
            nodePairs[cnn.in] = [cnn];
        }
    }
}