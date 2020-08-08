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
        inputLayer: _getInputLayerLocations(neat, width, height)
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
        result.push({ x: 100, y: i * (height * increments), onColor: ON_COLOR, offColor: OFF_COLOR });
    }
    return result;
}

