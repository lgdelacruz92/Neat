/**
 * Makes a very specific Neat network
 */
const _makeNeat1 = () => {
    const neat = new Neat(3, 2);

    const node5 = new Node(5);
    const node6 = new Node(6);
    neat.nodes.push(node5);
    neat.nodes.push(node6);

    const conn7 = new Connection(7, 0, true);
    const conn8 = new Connection(8, 0, true);
    const conn9 = new Connection(9, 0, true);
    const conn10 = new Connection(10, 0, true);

    neat.connections.splice(0, 1);
    
    conn7.inNode = node5;
    conn7.outNode = neat.nodes[3];
    
    conn8.inNode = neat.nodes[0];
    conn8.outNode = node6;
    
    conn9.inNode = node6;
    conn9.outNode = node5;
    
    conn10.inNode = neat.nodes[2];
    conn10.outNode = node6;
    

    neat.connections.push(conn7);
    neat.connections.push(conn8);
    neat.connections.push(conn9);
    neat.connections.push(conn10);

    return neat;
}

/**
 * Tests
 */
const test_neat_propagation_1 = () => {
    const neat = _makePaperExampleParent1();
    neat.connections[0].weight = 0.3;
    neat.connections[1].weight = 0.5;
    neat.connections[2].weight = 0.5;
    neat.connections[3].weight = 0.1;
    neat.connections[4].weight = 0.2;
    const result = neat.activate([0.7, 0.6, 0.3])[0];
    assertEqual(0.532 < result && result < 0.533, true, 'Neat propagation on complicated network should be accurate: test 1.');
}

const test_neat_propagation_2 = () => {
    const neat = _makePaperExampleParent2();
    neat.connections[0].weight = 0.5;
    neat.connections[1].weight = 0.5;
    neat.connections[2].weight = 0.3;
    neat.connections[3].weight = 0.5;
    neat.connections[4].weight = 0.6;
    neat.connections[5].weight = 0.1;
    neat.connections[6].weight = 0.7;
    const result = neat.activate([0.5, 0.3, 0.08])[0];
    assertEqual(0.531 < result && result < 0.532, true, 'Neat propagation on complicated network should be accurate: test 2.');
}

const test_neat_propagation_3 = () => {
    const neat = _makeNeat1();
    assertEqual(neat.connections.length, 9, 'Neat must have the proper connections');
    assertEqualNoTitle(neat.nodes.length, 7);

    neat.connections[0].weight = 0.9;
    neat.connections[1].weight = 0.6;
    neat.connections[2].weight = 0.3;
    neat.connections[3].weight = 0.4;
    neat.connections[4].weight = 0.4;
    neat.connections[5].weight = 0.7;
    neat.connections[6].weight = 0.3;
    neat.connections[7].weight = 0.1;
    neat.connections[8].weight = 0.4;

    const result = neat.activate([0.5, 0.7, 0.6]);
    assertEqualNoTitle(0.71 < result[1] && result[1] < 0.72, true);
    assertEqual(0.66 < result[0] && result[0] < 0.67, true, 'Activate function on something more difficult.');
}

test_neat_propagation_1();
test_neat_propagation_2();
test_neat_propagation_3();