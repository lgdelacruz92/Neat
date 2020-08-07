const test_neat_1 = () => {
    assertThrows(() => { new Neat() }, 'Value required: inputNumber.', 'Neat requires inputNumber as contructor.');
}

const test_neat_2 = () => {
    assertThrows(() => { new Neat(2) }, 'Value required: outputNumber.', 'Neat requires outputNumber as contructor.');
}

const test_neat_3 = () => {
    const neat = new Neat(2, 1);
    const result = neat.activate();
    assertEqual(Array.isArray(result), true, 'Neat activate function returns an array.');
}

const test_neat_4 = () => {
    const neat = new Neat(2, 1);
    const result = neat.activate();
    assertEqual(result.length, 1, 'Neat activate function returns the correct number of outputs.');
}

test_neat_1();
test_neat_2();
test_neat_3();
test_neat_4();