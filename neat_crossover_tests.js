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
    const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
    const neat1 = new Neat(INPUTNUMBER1, OUTPUTNUMBER1);
    for (let i = 0; i < INPUTNUMBER1; i++) {
        neat1.nodes[i].id = `${i}`;
    }

    for (let i = INPUTNUMBER1; i < INPUTNUMBER1 + OUTPUTNUMBER1; i++) {
        neat1.nodes[i].id = `${i}`;
    }

    for (let i = 0; i < neat1.connections.length; i++) {
        neat1.connections[i].in = `${LETTERS[i]}`;
    }

    for (let i = 0; i < INPUTNUMBER1 + OUTPUTNUMBER1; i++) {
        assertEqual(neat1.nodes[i].id === `${i}`, true, 'Neat crossover stress test 1.');
    }

    for (let i = 0; i < neat1.connections.length; i++) {
        assertEqualNoTitle(neat1.connections[i].in, `${LETTERS[i]}`);
    }

    const INPUTNUMBER2 = 3;
    const OUTPUTNUMBER2 = 2;
    const neat2 = new Neat(INPUTNUMBER2, OUTPUTNUMBER2);
    for (let i = 0; i < INPUTNUMBER2; i++) {
        neat2.nodes[i].id = `${i}`;
    }

    for (let i = INPUTNUMBER2; i < INPUTNUMBER2 + OUTPUTNUMBER1; i++) {
        neat2.nodes[i].id = `${i}`;
    }

    for (let i = 0; i < neat2.connections.length; i++) {
        neat2.connections[i].in = `${LETTERS[i]}`;
    }

    const node5 = new Node("5");
    const connectionG = new Connection('g', 0, true);
    const connectionH = new Connection('h', 0, true);
    neat2.connections.splice(1, 1);
    connectionG.inNode = neat2.nodes[1];
    connectionG.outNode = node5;
    connectionH.inNode = node5;
    connectionH.outNode = neat2.nodes[3];
    neat2.nodes.push(node5);
    neat2.connections.push(connectionG);
    neat2.connections.push(connectionH);
    for (let i = 0; i < neat2.nodes.length; i++) {
        assertEqualNoTitle(neat2.nodes[i].id === `${i}`, true);
    }
    assertEqualNoTitle(neat2.connections.length, 7);

    for (let i = 0; i < neat2.connections.length + 1; i++) {
        if (i > 1) {
            assertEqualNoTitle(neat2.connections[i-1].in, `${LETTERS[i]}`);
        } else {
            if (i !== 1) {
                assertEqualNoTitle(neat2.connections[i].in, `${LETTERS[i]}`);
            }
        }
    }
    const childNeat = neat1.crossOver(neat2);

    for (let i = 0; i < childNeat.nodes.length; i++) {
        assertEqualNoTitle(childNeat.nodes[i].id, `${i}`);
    }
}

test_neat_21(); 
test_neat_22(); 
