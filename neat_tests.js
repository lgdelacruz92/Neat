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

const test_neat_14 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    neat.connections[0].weight = 0.5;
    neat.connections[1].weight = 0.5;
    let result = neat.activate([1, 1]);
    assertEqual(result[0], 1, 'Activate should be valid even when mutated');
    neat.mutate(true);
    neat.connections[0].weight = 0.5;
    neat.connections[1].weight = 0.5;
    neat.connections[2].weight = 0.5;
    result = neat.activate([1, 1]);
    assertEqualNoTitle(result[0], 0.75);
}

const test_neat_15 = () => {
    const INPUTNUMBER = 3;
    const OUTPUTNUMBER = 2;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    neat.mutate(true);
    for (let i = 0; i < neat.connections.length; i++) {
        neat.connections[i].weight = 0.5;
    }
    let result = neat.activate([1, 1, 1]);
    assertEqual(result.length, 2, 'Complex network should be accurate 1.');
    assertEqualNoTitle(result[0] === 1.5 || result[0] === 1.25, true);
    assertEqualNoTitle(result[1] === 1.5 || result[1] === 1.25, true);
}

const test_neat_16 = () => {
    const INPUTNUMBER = 3;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    neat.mutate(false, true);
    assertEqual(neat.nodes.length, 4, 'Complex network should be accurate 2.');
    assertEqualNoTitle(neat.connections.length, 4);
}

const test_neat_17 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    for (let i = 0; i < 10; i++){
        neat.mutate(true)
    }
    assertEqual(neat.nodes.length, INPUTNUMBER + OUTPUTNUMBER + 10, 'Extreme add node mutation.');
}

const test_neat_18 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    for (let i = 0; i < 10; i++) {
        neat.mutate(false, true);
    }
    assertEqual(neat.connections.length, INPUTNUMBER + OUTPUTNUMBER + 10 - 1, 'Extream add connection mutation.');
}

const test_neat_19 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat1 = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    const neat2 = neat1.copy();

    assertEqual(neat1.connections.length, neat2.connections.length, 'Neat copy must by a deep copy.');
    assertEqualNoTitle(neat1.nodes.length, neat2.nodes.length);
    for (let i = 0; i < neat1.connections.length; i++) {
        assertEqualNoTitle(neat1.connections[i].weight === neat2.connections[i].weight, true);
    }
    for (let i = 0; i < neat2.nodes.length; i++) {
        assertEqualNoTitle(neat1.nodes[i].value === neat2.nodes[i].value, true);
    }
}

const test_neat_20 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat1 = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    const neat2 = neat1.copy();

    const childNeat = neat1.crossOver(neat2);
    assertEqual(neat1.connections.length, childNeat.connections.length, 'Neat must have the ability to crossover.');
    assertEqualNoTitle(neat1.nodes.length, childNeat.nodes.length);
    for (let i = 0; i < neat1.connections.length; i++) {
        assertEqualNoTitle(neat1.connections[i].weight === childNeat.connections[i].weight, true);
    }
    for (let i = 0; i < childNeat.nodes.length; i++) {
        assertEqualNoTitle(neat1.nodes[i].value === childNeat.nodes[i].value, true);
    }
}

const test_neat_21 = () => {
    const INPUTNUMBER = 2;
    const OUTPUTNUMBER = 1;
    const neat1 = new Neat(INPUTNUMBER, OUTPUTNUMBER);
    const neat2 = neat1.copy();
    neat2.mutate(true);

    const childNeat = neat1.crossOver(neat2);
    assertEqual(childNeat.connections.length, neat1.connections.length + 2, 'Neat must have the ability to crossover.');
    assertEqualNoTitle(childNeat.nodes.length, neat1.nodes.length + 1);
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
test_neat_14();
test_neat_15();
test_neat_16();
test_neat_17();
test_neat_18();
test_neat_19();
test_neat_20(); 
test_neat_21(); 