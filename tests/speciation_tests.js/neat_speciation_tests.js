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
    const result = neat1.dist(neat2);
    assertEqual(result, 0, 'Neat should have a distance function with another neat.');
}

const test_speciation_2 = () => {
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
    const neat2JSON = {
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
            }, {
                "identificationNumber": 3,
                "value": 0,
            }, {
                "identificationNumber": 4,
                "value": 0,
            },],
        "connections": [
            {
                "innovationNumber": 0,
                "weight": -0.99,
                "expressed": true,
                "inNode": 1,
                "outNode": 4,
            }, {
                "innovationNumber": 1,
                "weight": -1.59,
                "expressed": true,
                "inNode": 0,
                "outNode": 3,
            }, {
                "innovationNumber": 2,
                "weight": -0.28,
                "expressed": true,
                "inNode": 1,
                "outNode": 3,
            }, {
                "innovationNumber": 3,
                "weight": -1.72,
                "expressed": true,
                "inNode": 0,
                "outNode": 4,
            }, {
                "innovationNumber": 4,
                "weight": -1.35,
                "expressed": true,
                "inNode": 3,
                "outNode": 2,
            }, {
                "innovationNumber": 5,
                "weight": -1.82,
                "expressed": true,
                "inNode": 4,
                "outNode": 2,
            },
        ]
    }

    const neat1 = NEAT.fromJSON(neat1JSON);
    const neat2 = NEAT.fromJSON(neat2JSON);
    assertEqual(neat1.dist(neat2) > 0.5, true, 'Neat distance from two nodes extra.');
}

const test_speciation_3 = () => {
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
    const neat2JSON = {
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
            }, {
                "identificationNumber": 3,
                "value": 0,
            },],
        "connections": [
            {
                "innovationNumber": 0,
                "weight": -0.96,
                "expressed": true,
                "inNode": 0,
                "outNode": 2,
            }, {
                "innovationNumber": 1,
                "weight": -1.59,
                "expressed": true,
                "inNode": 1,
                "outNode": 3,
            }, {
                "innovationNumber": 2,
                "weight": -1.74,
                "expressed": true,
                "inNode": 3,
                "outNode": 2,
            },]
    }

    const neat1 = NEAT.fromJSON(neat1JSON);
    const neat2 = NEAT.fromJSON(neat2JSON);
    const result = neat1.dist(neat2);
    assertEqual(neat1.dist(neat2) < 0.5, true, 'Neat distance from two nodes extra.');
}

test_speciation_1();
test_speciation_2();
test_speciation_3();