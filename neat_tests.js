const test_neat_1 = () => {
    assertThrows(() => { new Neat() }, 'Value required: inputNumber.', 'Neat requires inputNumber as contructor.');
}

test_neat_1();