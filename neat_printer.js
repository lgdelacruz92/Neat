const ON_COLOR = '#32a852';
const OFF_COLOR = '#a84632';

/**
 * Prints the Neat in a canvas
 * @param {Neat} neat Neat network to print
 * @param {number} width Width of canvas
 * @param {number} height Height of canvas 
 */
function pnprint(neat, width, height) {
    const inputLayer = _getInputLayerLocations(neat, width, height);
    const outputLayer = _getOutputLayerLocations(neat, width, height);
    const hiddenLayers = _getHiddenLayers(neat, width, height);
    const connections = _getConnectionLines(neat, inputLayer, outputLayer, hiddenLayers);
    return {inputLayer, outputLayer, hiddenLayers, connections};
}

/**
 * Gets the node locations of the input layer
 * @param {Neat} neat Neat network to get layer locations
 * @param {number} width Width of canvas
 * @param {number} height Height of canvas
 * @return {Object} Example
 *                    {
 *                        x: number,
 *                        y: number,
 *                        onColor: #32a852,
 *                        offColor: #a84632,
 *                        id: string
 *                    }
 */
function _getInputLayerLocations(neat, width, height) {
    const inputNumber = neat.inputNumber;
    const increments = 1 / (inputNumber + 1);
    const result = [];
    for (let i = 1; i <= inputNumber; i++) {
        const nodeId = neat.nodes[i-1].id;
        result.push({ x: width / 8, y: i * (height * increments), onColor: ON_COLOR, offColor: OFF_COLOR, id: nodeId });
    }
    return result;
}

/**
 * This gets the output layer locations
 * @param {Neat} neat Neat network to get layer locations
 * @param {number} width Width of the canvas
 * @param {number} height Height of the canvas
 * @return {Object} Example
 *                    {
 *                       x: number,
 *                       y: number,
 *                       onColor: #32a852,
 *                       offColor: #a84632,
 *                       id: string
 *                    }
 */
function _getOutputLayerLocations(neat, width, height) {
    const outputNumber = neat.outputNumber;
    const increments = 1 / (outputNumber + 1);
    const result = [];
    for (let i = 1; i <= outputNumber; i++) {
        const nodeId = neat.nodes[neat.inputNumber + i-1].id;
        result.push({ x: width * (7/8), y: i * (height * increments), onColor: ON_COLOR, offColor: OFF_COLOR, id: nodeId });
    }
    return result;
}

/**
 * Gets the line informations of neat connections
 * @param {Neat} neat The neat to get connections for
 */
function _getConnectionLines(neat, inputLayer, outputLayer, hiddenLayers) {
    const result = [];
    for (let i = 0; i < neat.connections.length; i++) {
        const connection = neat.connections[i];
        const inNode = connection.inNode;
        const outNode = connection.outNode;
        const location0 = inputLayer.find(node => node.id === inNode.id);
        const location1 = hiddenLayers.find(node => node.id === inNode.id);

        const location2 = outputLayer.find(node => node.id === outNode.id);
        const location3 = hiddenLayers.find(node => node.id === outNode.id);

        if (location1 && location3) {
            result.push({lineLoc: [location1.x, location1.y, location3.x, location3.y], onColor: ON_COLOR, offColor: OFF_COLOR });
        } else if (location1 && location2) {
            result.push({lineLoc: [location1.x, location1.y, location2.x, location2.y], onColor: ON_COLOR, offColor: OFF_COLOR });
        } else if (location0 && location3) {
            result.push({lineLoc: [location0.x, location0.y, location3.x, location3.y], onColor: ON_COLOR, offColor: OFF_COLOR });
        } else if (location0 && location2) {
            result.push({lineLoc: [location0.x, location0.y, location2.x, location2.y], onColor: ON_COLOR, offColor: OFF_COLOR });
        } else {
            throw Error('There should never be a situation where whe cant find a node');
        }
    }
    return result;
}

/**
 * Function that gets the hidden layer locations
 * @param {Neat} neat The neat to get connections for
 * @param {number} width The canvas width
 * @param {number} height The canvas height
 *  * @return {Object} Example
 *                    {
 *                       x: number,
 *                       y: number,
 *                       onColor: #32a852,
 *                       offColor: #a84632,
 *                       id: string
 *                    }
 */
function _getHiddenLayers(neat, width, height) {
    const hiddenLayerStartIndex = neat.inputNumber + neat.outputNumber - 1;
    const totalNodes = neat.nodes.length;
    const result = [];
    const numHiddenLayers = totalNodes - neat.inputNumber - neat.outputNumber;
    for (let i = 1; i <= numHiddenLayers; i++) {
        const randomXHiddenLocation = (Math.random() *7)/8 + (1/8);
        const increments = 1 / (numHiddenLayers + 1);
        const nodeId = neat.nodes[hiddenLayerStartIndex + i].id;

        result.push({ x: randomXHiddenLocation * width, y: i * increments * height, onColor: ON_COLOR, offColor: OFF_COLOR, id: nodeId })
    }
    return result;
}