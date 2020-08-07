/**
 * Connection class
 */
class Connection {
    constructor(innovationNumber, weight, expressed) {
        if (!innovationNumber) throw Error('Value is required: innovationNumber.');

        // Innovation number of the connection
        this.in = innovationNumber;

        // Weight of the connection
        this.weight = weight || 0;

        // Flag to set if connection is expressed or not
        this.expressed = expressed || false;

        // Node in
        this.inNode = null;

        // Out node
        this.outNode = null;
    }

    activate() {
        if (!this.inNode) throw Error('In node is not defined.');
        if (!this.outNode) throw Error('Out node is not defined.');

        if (this.expressed) {
            this.outNode = this.inNode.value * this.weight;
        }
    }

}