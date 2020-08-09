
/**
 * Helpers
 */

/**
 * This function makes a very specific Neat instance 
 */
const _makeParent2_1 = () => {
    const INPUTNUMBER2 = 3;
    const OUTPUTNUMBER2 = 2;
    const neat2 = new Neat(INPUTNUMBER2, OUTPUTNUMBER2);
    const node5 = new Node(5);
    const connectionG = new Connection(6, 0, true);
    const connectionH = new Connection(7, 0, true);
    neat2.connections.splice(1, 1);
    connectionG.inNode = neat2.nodes[1];
    connectionG.outNode = node5;
    connectionH.inNode = node5;
    connectionH.outNode = neat2.nodes[3];
    neat2.nodes.push(node5);
    neat2.connections.push(connectionG);
    neat2.connections.push(connectionH);
    return neat2;
}

/**
 * This function makes a very specific Neat instance
 */
const _makeParent2_2 = () => {
    const startingParent = _makeParent2_1();
    const newConnection = new Connection(8, 0, true);
    newConnection.inNode = startingParent.nodes[2];
    newConnection.outNode = startingParent.nodes[5];
    startingParent.connections.push(newConnection);
    return startingParent;
}

/**
 * Helper function for creating connections
 */
const _makeConnection = (num, expressed, inNode, outNode) => {
    const newConnection = new Connection(num, 0, expressed);
    newConnection.inNode = inNode;
    newConnection.outNode = outNode;
    return newConnection;
}

/**
 * This function makes a very specific Neat instance
 */
const _makePaperExampleParent1 = () => {
    const neat = new Neat(3, 1);
    neat.nodes.push(new Node(4));
    neat.connections = [];
    neat.connections.push(_makeConnection(0, true, neat.nodes[0], neat.nodes[4]));
    neat.connections.push(_makeConnection(1, true, neat.nodes[1], neat.nodes[4]));
    neat.connections.push(_makeConnection(3, false, neat.nodes[1], neat.nodes[3]));
    neat.connections.push(_makeConnection(4, true, neat.nodes[2], neat.nodes[3]));
    neat.connections.push(_makeConnection(5, true, neat.nodes[4], neat.nodes[3]));
    return neat;
}

/**
 * This function makes a very specific Neat instance
 */
const _makePaperExampleParent2 = () => {
    const neat = new Neat(3, 1);
    neat.nodes.push(new Node(4));
    neat.nodes.push(new Node(5));
    neat.connections = [];
    neat.connections.push(_makeConnection(0, false, neat.nodes[0], neat.nodes[4]));
    neat.connections.push(_makeConnection(1, true, neat.nodes[1], neat.nodes[4]));
    neat.connections.push(_makeConnection(2, true, neat.nodes[2], neat.nodes[4]));
    neat.connections.push(_makeConnection(3, false, neat.nodes[1], neat.nodes[3]));
    neat.connections.push(_makeConnection(5, true, neat.nodes[4], neat.nodes[3]));
    neat.connections.push(_makeConnection(6, true, neat.nodes[0], neat.nodes[5]));
    neat.connections.push(_makeConnection(7, true, neat.nodes[5], neat.nodes[4]));
    return neat;
}

/**
 * Tests
 */

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

const test_neat_22 = () => {
    const INPUTNUMBER1 = 3;
    const OUTPUTNUMBER1 = 2;
    const neat1 = new Neat(INPUTNUMBER1, OUTPUTNUMBER1);
    // Confirm parent 3 properties
    for (let i = 0; i < INPUTNUMBER1 + OUTPUTNUMBER1; i++) {
        assertEqual(neat1.nodes[i].id === i, true, 'Neat crossover stress test 1.');
    }

    for (let i = 0; i < neat1.connections.length; i++) {
        assertEqualNoTitle(neat1.connections[i].in, i);
    }

    // Confirm parent 2 properties
    const neat2 = _makeParent2_1();
    for (let i = 0; i < neat2.nodes.length; i++) {
        assertEqualNoTitle(neat2.nodes[i].id === i, true);
    }
    assertEqualNoTitle(neat2.connections.length, 7);

    for (let i = 0; i < neat2.connections.length + 1; i++) {
        if (i > 1) {
            assertEqualNoTitle(neat2.connections[i-1].in, i);
        } else {
            if (i !== 1) {
                assertEqualNoTitle(neat2.connections[i].in, i);
            }
        }
    }

    // Confirm child properties
    const childNeat = neat1.crossOver(neat2);
    for (let i = 0; i < childNeat.nodes.length; i++) {
        assertEqualNoTitle(childNeat.nodes[i].id, i);
    }

    for (let i = 0; i < childNeat.connections.length; i++) {
        assertEqualNoTitle(childNeat.connections[i].in, i);
    }

    // Connection 0
    assertEqualNoTitle(childNeat.connections[0].inNode.id, 0);
    assertEqualNoTitle(childNeat.connections[0].outNode.id, 3);

    // Connection 1
    assertEqualNoTitle(childNeat.connections[1].inNode.id, 0);
    assertEqualNoTitle(childNeat.connections[1].outNode.id, 4);

    // Connection 2
    assertEqualNoTitle(childNeat.connections[2].inNode.id, 1);
    assertEqualNoTitle(childNeat.connections[2].outNode.id, 3);

    // Connection 3
    assertEqualNoTitle(childNeat.connections[3].inNode.id, 1);
    assertEqualNoTitle(childNeat.connections[3].outNode.id, 4);

    // Connection 4
    assertEqualNoTitle(childNeat.connections[4].inNode.id, 2);
    assertEqualNoTitle(childNeat.connections[4].outNode.id, 3);

    // Connection 5
    assertEqualNoTitle(childNeat.connections[5].inNode.id, 2);
    assertEqualNoTitle(childNeat.connections[5].outNode.id, 4);

    // Connection 6
    assertEqualNoTitle(childNeat.connections[6].inNode.id, 1);
    assertEqualNoTitle(childNeat.connections[6].outNode.id, 5);

    // Connection 7
    assertEqualNoTitle(childNeat.connections[7].inNode.id, 5);
    assertEqualNoTitle(childNeat.connections[7].outNode.id, 3);
}

const test_neat_23 = () => {
    const INPUTNUMBER1 = 3;
    const OUTPUTNUMBER1 = 2;
    const neat1 = new Neat(INPUTNUMBER1, OUTPUTNUMBER1);
    // Confirm parent 3 properties
    for (let i = 0; i < INPUTNUMBER1 + OUTPUTNUMBER1; i++) {
        assertEqual(neat1.nodes[i].id === i, true, 'Neat crossover stress test 1.');
    }

    for (let i = 0; i < neat1.connections.length; i++) {
        assertEqualNoTitle(neat1.connections[i].in, i);
    }

    // Confirm parent 2 properties
    const neat2 = _makeParent2_2();
    for (let i = 0; i < neat2.nodes.length; i++) {
        assertEqualNoTitle(neat2.nodes[i].id === i, true);
    }
    assertEqualNoTitle(neat2.connections.length, 8);

    for (let i = 0; i < neat2.connections.length + 1; i++) {
        if (i > 1) {
            assertEqualNoTitle(neat2.connections[i-1].in, i);
        } else {
            if (i !== 1) {
                assertEqualNoTitle(neat2.connections[i].in, i);
            }
        }
    }

    // Confirm child properties
    const childNeat = neat1.crossOver(neat2);
    for (let i = 0; i < childNeat.nodes.length; i++) {
        assertEqualNoTitle(childNeat.nodes[i].id, i);
    }

    for (let i = 0; i < childNeat.connections.length; i++) {
        assertEqualNoTitle(childNeat.connections[i].in, i);
    }

    // Connection 0
    assertEqualNoTitle(childNeat.connections[0].inNode.id, 0);
    assertEqualNoTitle(childNeat.connections[0].outNode.id, 3);

    // Connection 1
    assertEqualNoTitle(childNeat.connections[1].inNode.id, 0);
    assertEqualNoTitle(childNeat.connections[1].outNode.id, 4);

    // Connection 2
    assertEqualNoTitle(childNeat.connections[2].inNode.id, 1);
    assertEqualNoTitle(childNeat.connections[2].outNode.id, 3);

    // Connection 3
    assertEqualNoTitle(childNeat.connections[3].inNode.id, 1);
    assertEqualNoTitle(childNeat.connections[3].outNode.id, 4);

    // Connection 4
    assertEqualNoTitle(childNeat.connections[4].inNode.id, 2);
    assertEqualNoTitle(childNeat.connections[4].outNode.id, 3);

    // Connection 5
    assertEqualNoTitle(childNeat.connections[5].inNode.id, 2);
    assertEqualNoTitle(childNeat.connections[5].outNode.id, 4);

    // Connection 6
    assertEqualNoTitle(childNeat.connections[6].inNode.id, 1);
    assertEqualNoTitle(childNeat.connections[6].outNode.id, 5);

    // Connection 7
    assertEqualNoTitle(childNeat.connections[7].inNode.id, 5);
    assertEqualNoTitle(childNeat.connections[7].outNode.id, 3);

    // Connection 8
    assertEqualNoTitle(childNeat.connections[8].inNode.id, 2);
    assertEqualNoTitle(childNeat.connections[8].outNode.id, 5);
}

const test_neat_24 = () => {
    const parent1 = _makePaperExampleParent1();
    const parent2 = _makePaperExampleParent2();

    const child = parent1.crossOver(parent2);

    for (let i = 0; i < child.nodes.length; i++) {
        assertEqual(child.nodes[i].id, i, 'Cross over using example in Neat paper should be accurate.');
    }

    // Connection 1
    assertEqualNoTitle(child.connections[0].inNode.id, 0);
    assertEqualNoTitle(child.connections[0].outNode.id, 4);
    assertEqualNoTitle(child.connections[0].expressed === true || child.connections[0].expressed === false, true);

    // Connection 2
    assertEqualNoTitle(child.connections[1].inNode.id, 1);
    assertEqualNoTitle(child.connections[1].outNode.id, 4);
    assertEqualNoTitle(child.connections[1].expressed, true);


    // Connection 3
    assertEqualNoTitle(child.connections[2].inNode.id, 2);
    assertEqualNoTitle(child.connections[2].outNode.id, 4);
    assertEqualNoTitle(child.connections[2].expressed, true);

    // Connection 4
    assertEqualNoTitle(child.connections[3].inNode.id, 1);
    assertEqualNoTitle(child.connections[3].outNode.id, 3);
    assertEqualNoTitle(child.connections[3].expressed, false);

    // Connection 5
    assertEqualNoTitle(child.connections[4].inNode.id, 2);
    assertEqualNoTitle(child.connections[4].outNode.id, 3);
    assertEqualNoTitle(child.connections[4].expressed, true);

    // Connection 6
    assertEqualNoTitle(child.connections[5].inNode.id, 4);
    assertEqualNoTitle(child.connections[5].outNode.id, 3);
    assertEqualNoTitle(child.connections[5].expressed, true);

    // Connection 7
    assertEqualNoTitle(child.connections[6].inNode.id, 0);
    assertEqualNoTitle(child.connections[6].outNode.id, 5);
    assertEqualNoTitle(child.connections[6].expressed, true);

    // Connection 7
    assertEqualNoTitle(child.connections[7].inNode.id, 5);
    assertEqualNoTitle(child.connections[7].outNode.id, 4);
    assertEqualNoTitle(child.connections[7].expressed, true);
}

test_neat_21();
test_neat_22();
test_neat_23();
test_neat_24();
