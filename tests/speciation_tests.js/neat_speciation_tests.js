const test_speciation_1 = () => {
    const neat1JSON = {
        "inputNumber": 2,
        "outputNumber": 1,
        "nodes": [
            {
                "identificationNumber": 0,
                "value": 0,
            }, {
                "identificationNumber": 1,
                "value": 0,
            }, {
                "identificationNumber": 2,
                "value": 0,
            },],
        "connections": [
            {
                "innovationNumber": 0,
                "weight": -0.99,
                "expressed": true,
                "inNode": 1,
                "outNode": 2,
            }, {
                "innovationNumber": 1,
                "weight": -1.59,
                "expressed": true,
                "inNode": 0,
                "outNode": 2,
            },
        ]
    }
    const neat1 = NEAT.fromJSON(neat1JSON);
    const neat2 = NEAT.fromJSON(neat1JSON);

    assertEqual(neat1.dist(neat2), 1, 'Neat should have a distance function with another neat.');
}

test_speciation_1();