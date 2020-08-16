const neat_jason_sample_1 = {
    inputNumber: 2,
    outputNumber: 1,
    connections: [
        {
            innovationNumber: 0,
            weight: -0.3,
            expressed: true,
            inNode: 0,
            outNode: 2
        },
        {
            innovationNumber: 1,
            weight: -0.4,
            expressed: true,
            inNode: 1,
            outNode: 2
        }
    ],
    nodes: [
        {
            identificationNumber: 0,
            value: 0
        },
        {
            identificationNumber: 1,
            value: 0
        },
        {
            identificationNumber: 2,
            value: 0
        }
    ]
}

/**
 * const neat = new Neat(3, 2);
 * 
 */
const test_neat_designer_1 = () => {
    const neat = NEAT.fromJSON(neat_jason_sample_1);
    assertEqual(neat.connections.length, 2, 'Neat fromJSON function.');
    assertEqualNoTitle(neat.nodes.length, 3);
    assertEqualNoTitle(neat.nodeCurrentNumber, 3);
    assertEqualNoTitle(neat.connectionCurrentNumber, 1);
    assertEqualNoTitle(neat.inputNodeIds[0], true);
    assertEqualNoTitle(neat.inputNodeIds[1], true);
    assertEqualNoTitle(neat.inputNodeIds[2], undefined);
    assertEqualNoTitle(neat.outputNodeIds[2], true);
    assertEqualNoTitle(neat.connections[0].in, 0);
    assertEqualNoTitle(neat.connections[1].in, 1);
    assertEqualNoTitle(neat.nodes[0].id, 0);
    assertEqualNoTitle(neat.nodes[1].id, 1);
    assertEqualNoTitle(neat.nodes[2].id, 2);
    assertEqualNoTitle(neat.connections[0].weight, -0.3)
    assertEqualNoTitle(neat.connections[1].weight, -0.4)
    assertEqualNoTitle(neat.connections[0].inNode.id, 0);
    assertEqualNoTitle(neat.connections[0].outNode.id, 2);
    assertEqualNoTitle(neat.connections[1].inNode.id, 1);
    assertEqualNoTitle(neat.connections[1].outNode.id, 2);
}

const test_neat_designer_2 = () => {
    const neat = NEAT.fromJSON(neat_jason_sample_1);
    const neatJSON = neat.toJSON();
    assertEqualObject(neat_jason_sample_1, neatJSON, 'Neat toJSON function.');
}

test_neat_designer_1();
test_neat_designer_2();
