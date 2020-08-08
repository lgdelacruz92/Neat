const ON_COLOR = '#32a852';
const OFF_COLOR = '#a84632';

/**
 * Prints the Neat in a canvas
 * @param {Neat} neat Neat network to print
 * @param {number} width Width of canvas
 * @param {number} height Height of canvas 
 */
function pnprint(neat, width, height) {
    return {
        inputLayer: _getInputLayerLocations(neat, width, height),
        outputLayer: _getOutputLayerLocations(neat, width, height)
    }
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
 *                        offColor: #a84632
 *                    }
 */
function _getInputLayerLocations(neat, width, height) {
    const inputNumber = neat.inputNumber;
    const increments = 1 / (inputNumber + 1);
    const result = [];
    for (let i = 1; i <= inputNumber; i++) {
        result.push({ x: width / 8, y: i * (height * increments), onColor: ON_COLOR, offColor: OFF_COLOR });
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
 *                       offColor: #a84632
 *                    }
 */
function _getOutputLayerLocations(neat, width, height) {
    const outputNumber = neat.outputNumber;
    const increments = 1 / (outputNumber + 1);
    const result = [];
    for (let i = 1; i <= outputNumber; i++) {
        result.push({ x: width * (7/8), y: i * (height * increments), onColor: ON_COLOR, offColor: OFF_COLOR });
    }
    return result;
}