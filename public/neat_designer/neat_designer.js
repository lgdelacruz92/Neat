let ndNodes;
let ndConnection;
let mousePrsd;
function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent("viewport");
    ndNodes = [];
    ndConnection = new NDConnection();
    mousePrsd = false; 

    initializeActions();
}

function draw() {
    background(0);
    drawNodes();
    ndConnection.draw();
    ndConnection.update();
}

/**
 * Draws the nodes inside ndNodes
 */
function drawNodes() {
    const movingNodes = ndNodes.filter(ndn => ndn.moving === true);
    if (movingNodes > 1) {
        throw Error('This should not happen. More than one nodes should not be moving.');
    }
    for (let i = 0; i < ndNodes.length; i++) {
        ndNodes[i].draw();
        ndNodes[i].update();
    }
}

/**
 * Function called when moused is pressed inside the canvas
 * Assign which node to be moving
 */
function mousePressed() {
    const possibleTargetNDNodes = [];
    for (let i = 0; i < ndNodes.length; i++) {
        if (dist(ndNodes[i].pos.x, ndNodes[i].pos.y, mouseX, mouseY) < ndNodes[i].r) {
            possibleTargetNDNodes.push(ndNodes[i]);
        }
    }

    if (possibleTargetNDNodes.length > 0) {
        const targetNDNode = possibleTargetNDNodes[possibleTargetNDNodes.length - 1];
        targetNDNode.moving = true;
    }

    mousePrsd = true;
}

/**
 * Function called when moused is released
 * 
 */
function mouseReleased() {
    for (let i = 0; i < ndNodes.length; i++) {
        ndNodes[i].moving = false;
    }
    mousePrsd = false;
}

/**
 * Initializes the buttons on the screen
 */
function initializeActions() {
    initializeAddNodeAction();
}

/**
 * Initializes specifically the ADD NODE button
 */
function initializeAddNodeAction() {
    const addBtnEl = document.querySelector('.nd-add-button');
    if (addBtnEl) {
        addBtnEl.addEventListener('click', () => {
            ndNodes.push(new NDNode(random(0, width), random(0, height)));
        });
    } else {
        throw Error('Button with class .nd-add-button is missing.');
    }
}