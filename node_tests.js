const assertEqual = (a, b, message) => {
    if (a !== b) throw Error(`Failed: ${a} does not equal ${b}`);
    console.log(message)
}

const assertThrows = (action, message) => {
    try {
        action();
    } catch (e) {
        if (e.message !== message) {
            console.log(`The action should throw: ${message}`);
        } else {
            console.log(`Success. Exception caught: ${e.message}`)
        }
    }
}

const test_node_1 = () => {
    assertThrows(() => { new Node() }, 'Value required: identificationNumber.')
}

const test_node_2 = () => {
    assertThrows(() => { new Connection() }, 'Value required: innovationNumber.');
}

const test_node_3 = () => {
    const connection = new Connection(1);
    assertThrows(() => { connection.activate() }, 'Value not defined: this.inNode.');
}

const test_node_4 = () => {
    const node = new Node(1);
    const connection = new Connection(1);
    connection.inNode = node;
    assertThrows(() => { connection.activate() }, 'Value not defined: this.outNode.');
}

test_node_1();
test_node_2();
test_node_3();
test_node_4();