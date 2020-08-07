class Neat {
    constructor(inputNumber, outputNumber) {
        if (!inputNumber) throw Error('Value required: inputNumber.');
        if (!outputNumber) throw Error('Value required: outputNumber.');
        this.inputNumber = inputNumber;
        this.outputNumber = outputNumber;

        this._initNodes();
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