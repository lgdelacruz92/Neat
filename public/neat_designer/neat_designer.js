let ndNode;
let mousePressedAndDragged;
function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent("viewport");
    ndNode = new NDNode(100, 100);
    mousePressedAndDragged = false;
}

function draw() {
    background(0);
    ndNode.draw();
    ndNode.update();
}

function mousePressed() {
    mousePressedAndDragged = true;
}

function mouseReleased() {
    mousePressedAndDragged = false;
}