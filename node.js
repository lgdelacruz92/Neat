/**
 * Node class
 */
class Node {
    constructor(identificationNumber) {
        if (!identificationNumber) throw Error('Value required: identificationNumber.');
        // The identification number of of the node
        this.id = identificationNumber;

        // Value
        this.value = null;
    }
}