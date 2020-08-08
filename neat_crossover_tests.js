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

test_neat_21(); 
