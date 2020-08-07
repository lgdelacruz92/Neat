const test_neat_1 = () => {
    assertThrows(() => { new Neat() }, 'Value required: inputNumber.', 'Neat requires inputNumber as contructor.');
}

const test_neat_2 = () => {
    assertThrows(() => { new Neat(2) }, 'Value required: outputNumber.', 'Neat requires outputNumber as contructor.');
}

const test_neat_3 = () => {
    const neat = new Neat(2, 1);
    const result = neat.activate([0, 0]);
    assertEqual(Array.isArray(result), true, 'Neat activate function returns an array.');
}

const test_neat_4 = () => {
    const neat = new Neat(2, 1);
    const result = neat.activate([0, 0]);
    assertEqual(result.length, 1, 'Neat activate function returns the correct number of outputs.');
}

const test_neat_5 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    assertEqual(neat.nodes.length, INPUTNUMBER + OUTPUTNUMBER, 'Neat must initialize the number of nodes.');
}

const test_neat_6 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    assertEqual(neat.connections.length, 2,'Neat must initialize connections.');
}

const test_neat_7 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    for (let i = 0; i < neat.connections.length; i++) {
        const connection = neat.connections[i];
        assertEqual(-2 <= connection.weight && connection.weight < 2, true, 'Make sure the weights of the connections in Neat are initialized.');
    }
}

const test_neat_8 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    for (let i = 0; i < neat.nodes.length; i++) {
        const node = neat.nodes[i];
        assertEqual(node.id !== '', true, 'Ensure the nodes in Neat are initialized.');
    }
}

const test_neat_9 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    const connection1 = neat.connections[0];
    assertEqual(connection1.inNode === neat.nodes[0], true, 'Make sure the nodes are connected by connection.');
    assertEqualNoTitle(connection1.outNode === neat.nodes[2], true);
    const connection2 = neat.connections[1];
    assertEqualNoTitle(connection2.inNode === neat.nodes[1], true);
    assertEqualNoTitle(connection2.outNode === neat.nodes[2], true);
}

const test_neat_10 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    neat.connections[0].weight = 1.5;
    neat.connections[1].weight = 1.5;
    const result = neat.activate([1, 0.5]);
    assertEqual(result[0], 2.25, 'Neat activate should return proper values.');
}

const test_neat_11 = () => {
    const INPUTNUMBER = 3;
    const OUTPUTNUMBER = 2;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    assertEqual(neat.connections.length, INPUTNUMBER * OUTPUTNUMBER, 'The number of connections should scale when inputNode number and outputNode number increase.');
}

const test_neat_12 = () => {
    const INPUTNUMBER = 3;
    const OUTPUTNUMBER = 2;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    for (let i = 0; i < neat.connections.length; i++) {
        neat.connections[i].weight = 0.5;
    }
    const result = neat.activate([1, 1, 1]);
    assertEqual(result.length, 2, 'The output on a Neat activate should be valid.');
    for (let i = 0; i < result.length; i++) {
        assertEqualNoTitle(result[i], 1.5);
    }
}

const test_neat_13 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    neat.mutate(true);
    assertEqual(neat.nodes.length, 4, 'Mutate addNode should add an extra node.');
    assertEqualNoTitle(neat.connections.length, 3);
}

test_neat_1();
test_neat_2();
test_neat_3();
test_neat_4();
test_neat_5();
test_neat_6();
test_neat_7();
test_neat_8();
test_neat_9();
test_neat_10();
test_neat_11();
test_neat_12();
test_neat_13();