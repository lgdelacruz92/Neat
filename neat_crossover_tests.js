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
    for (let i = 0; i < INPUTNUMBER1 + OUTPUTNUMBER1; i++) {
        assertEqual(neat1.nodes[i].id === i, true, 'Neat crossover stress test 1.');
    }

    for (let i = 0; i < neat1.connections.length; i++) {
        assertEqualNoTitle(neat1.connections[i].in, i);
    }

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

test_neat_21(); 
test_neat_22(); 
