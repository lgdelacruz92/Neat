/**
 * Connection class
 */
class Connection {
    constructor(innovationNumber, weight, expressed) {
        if (!innovationNumber) throw Error('Value required: innovationNumber.');

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
        if (!this.inNode) throw Error(`Value not defined: this.inNode.`);
        if (!this.outNode) throw Error('Value not defined: this.outNode.');

        if (this.expressed) {
            this.outNode.value = this.inNode.value * this.weight;
        }
    }

}