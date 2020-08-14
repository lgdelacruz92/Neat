const neat_mutation_test_1 = () => {
    const neat = new Neat(3, 2);
    assertEqual(neat.noCycle(), true, "Ensure that no input nodes have a cycle.");
}

neat_mutation_test_1();