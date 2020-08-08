let neat;

const HEIGHT = 400;
const NODE_RADIUS = 20;
const WIDTH = 600;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    neat = new Neat(4, 1);
}

function draw() {
    background(0);
    let pp = pnprint(neat, WIDTH, HEIGHT);
    printInputLayer(pp);
}

/**
 * Function that prints the input layer
 * @param {Array} pp The pnprint information
 */
function printInputLayer(pp) {
    for (let i = 0; i < pp.inputLayer.length; i++) {
        const nodeLoc = pp.inputLayer[i];
        noStroke();
        fill(nodeLoc.onColor);
        circle(nodeLoc.x, nodeLoc.y, NODE_RADIUS);
    }
}