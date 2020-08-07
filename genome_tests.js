const printTitle = title => {
    if (!title) throw Error('Test requires a title');
    console.log(`%c${title}`, 'background: #222; color: #bada55');
}

const consoleSuccess = message => {
    console.log(`%c\t${message}`, 'background: #222; color: #bada55');
}

const assertEqual = (a, b, title) => {
    printTitle(title);
    if (a !== b) throw Error(`\tFailed: ${a} does not equal ${b}`);
    consoleSuccess(`Success. ${a} === ${b}`);
}

const assertThrows = (action, message, title) => {
    printTitle(title);
    try {
        action();
    } catch (e) {
        if (e.message !== message) {
            console.log(`\tThe action should throw: ${message}`);
        } else {
            consoleSuccess(`Success. Exception caught: ${e.message}`)
        }
    }
}

const test_node_1 = () => {
    assertThrows(() => { new Node() }, 'Value required: identificationNumber.', 'Test node without identificationNumber.');
}

const test_node_2 = () => {
    assertThrows(() => { new Connection() }, 'Value required: innovationNumber.', 'Test connection without innovationNumber.');
}

const test_node_3 = () => {
    const connection = new Connection(1);
    assertThrows(() => { connection.activate() }, 'Value not defined: this.inNode.', 'Test connection without defining inNode.');
}

const test_node_4 = () => {
    const node = new Node(1);
    const connection = new Connection(1);
    connection.inNode = node;
    assertThrows(() => { connection.activate() }, 'Value not defined: this.outNode.', 'Test connection without defining outNode.');
}

const test_node_5 = () => {
    // Tests connection with no weight and not expressed
    const inNode = new Node(1);
    const outNode = new Node(2);
    const connection = new Connection(3);
    connection.inNode = inNode;
    connection.outNode = outNode;
    connection.activate();
    assertEqual(outNode.value, 0, 'Test connection without weight and expression defined.');
}

const test_node_6 = () => {
    // Tests connection with weight but with no expression
    const inNode = new Node(1);
    inNode.value = 2;
    const outNode = new Node(2);
    const connection = new Connection(3, 2);
    connection.inNode = inNode;
    connection.outNode = outNode;
    connection.activate();
    assertEqual(outNode.value, 0, 'Test connection with only weight defined.');
}

const test_node_7 = () => {
    // Tests connection with weight and with expression
    const inNode = new Node(1);
    inNode.value = 2;
    const outNode = new Node(2);
    const connection = new Connection(3, 2, true);
    connection.inNode = inNode;
    connection.outNode = outNode;
    connection.activate();
    assertEqual(outNode.value, 4, 'Test connection with weight and expression defined.');
}

test_node_1();
test_node_2();
test_node_3();
test_node_4();
test_node_5();
test_node_6();
test_node_7();