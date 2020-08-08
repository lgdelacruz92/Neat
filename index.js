let neat;
let pp;

const HEIGHT = 400;
const NODE_RADIUS = 20;
const WIDTH = 600;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    neat = new Neat(4, 1);
    neat.mutate(true);
    neat.mutate(true);
    pp = pnprint(neat, WIDTH, HEIGHT);
}

function draw() {
    background(0);
    printInputLayer(pp);
    printOutputLayer(pp);
    printHiddenLayers(pp);
    printConnections(pp);
}

/**
 * Function that prints the input layer
 * @param {Object} pp The pnprint information
 */
function printInputLayer(pp) {
    for (let i = 0; i < pp.inputLayer.length; i++) {
        const nodeLoc = pp.inputLayer[i];
        noStroke();
        fill(nodeLoc.onColor);
        circle(nodeLoc.x, nodeLoc.y, NODE_RADIUS);
    }
}

/**
 * Function that prints the output layer
 * @param {Object} pp The pnprint information
 */
function printOutputLayer(pp) {
    for (let i = 0; i < pp.outputLayer.length; i++) {
        const nodeLoc = pp.outputLayer[i];
        noStroke();
        fill(nodeLoc.onColor);
        circle(nodeLoc.x, nodeLoc.y, NODE_RADIUS);
    }
}

/**
 * Function that prints the connection lines
 * @param {Object} pp The pnprint information
 */
function printConnections(pp) {
    for (let i = 0; i < pp.connections.length; i++) {
        const connectionMetaData = pp.connections[i];
        const lineLoc = connectionMetaData.lineLoc;
        const color = connectionMetaData.onColor;
        stroke(color);
        strokeWeight(2);
        line(lineLoc[0], lineLoc[1], lineLoc[2], lineLoc[3]);
    }
}

function printHiddenLayers(pp) {
    for (let i = 0; i < pp.hiddenLayers.length; i++) {
        const nodeLoc = pp.hiddenLayers[i];
        noStroke();
        fill(nodeLoc.onColor);
        circle(nodeLoc.x, nodeLoc.y, NODE_RADIUS);
    }
}