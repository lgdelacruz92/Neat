const test_neat_propagation_1 = () => {
    const neat = _makePaperExampleParent1();
    neat.connections[0].weight = 0.3;
    neat.connections[1].weight = 0.5;
    neat.connections[2].weight = 0.5;
    neat.connections[3].weight = 0.1;
    neat.connections[4].weight = 0.2;
    assertEqual(neat.activate([0.7, 0.6, 0.3])[0], 0.132, 'Neat propagation on complicated network should be accurate: test 1.');
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
    assertEqual(0.1253 < result && result < 0.1255, true, 'Neat propagation on complicated network should be accurate: test 2.');
}

test_neat_propagation_1();
test_neat_propagation_2();