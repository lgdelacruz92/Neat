let ndNodes;
let ndConnections;
function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent("viewport");
    ndNodes = [];
    ndConnections = [];
    mousePrsd = false; 

    initializeActions();
}

function draw() {
    background(0);
    drawConnections();
    drawNodes();
}

/**
 * Draws the connections
 */
function drawConnections() {
    for (let i = 0; i < ndConnections.length; i++) {
        ndConnections[i].draw();
        ndConnections[i].update();
    }
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
function mousePressed(e) {
    if (e.button === 0) {
        handleLeftClick();
    } else if (e.button === 2) {
        console.log('right click');
    }
    return false;
}

/**
 * Handle left click
 */
function handleLeftClick() {
    const possibleTarget = [];
    for (let i = 0; i < ndNodes.length; i++) {
        const r = dist(ndNodes[i].pos.x, ndNodes[i].pos.y, mouseX, mouseY);
        if ( r < ndNodes[i].r) {
            possibleTarget.push({ item: ndNodes[i], r});
        }
    }
    
    for (let i = 0; i < ndConnections.length; i++) {
        if (ndConnections[i].nearCenter(mouseX, mouseY)) {
            possibleTarget.push({ item: ndConnections[i], r: ndConnections[i].distToCenter(mouseX, mouseY) });
        } else if (ndConnections[i].nearStart(mouseX, mouseY)) {
            ndConnections[i].moveStart = true;
        } else if (ndConnections[i].nearEnd(mouseX, mouseY)) {
            ndConnections[i].moveEnd = true;
        }
    }

    if (possibleTarget.length > 0) {
        possibleTarget.sort((a, b) => b.r - a.r);
        const targetNDNode = possibleTarget[possibleTarget.length - 1].item;

        if (targetNDNode.type === 'node') {
            targetNDNode.moving = true;
        } else if (targetNDNode.type === 'connection') {
            targetNDNode.moveBoth = true;
        } else {
            throw Error('This should not happen. No type item');
        }
    }
}

/**
 * Handle left click release
 */
function handleLeftClickRelease() {
    for (let i = 0; i < ndNodes.length; i++) {
        ndNodes[i].moving = false;
    }

    for (let i = 0; i < ndConnections.length; i++) {
        ndConnections[i].moveBoth = false;
        ndConnections[i].moveStart = false;
        ndConnections[i].moveEnd = false;
    }
}

/**
 * Function called when moused is released
 * 
 */
function mouseReleased(e) {
    if (e.button === 0) {
        handleLeftClickRelease();
    }
    return false;
}

/**
 * Function called when moused clicked
 */
function mouseCliced(e) {
    handleRightClick(e);
    return false;
}

/**
 * Handles right click event if there is
 */
function handleRightClick(e) {
    console.log(e);
    e.preventDefault();
}

/**
 * Initializes the buttons on the screen
 */
function initializeActions() {
    initializeAddNodeAction();
    initializeAddConnectionAction();
    removeContextMenu();
}

/**
 * Initializes specifically the ADD NODE button
 */
function initializeAddNodeAction() {
    const addBtnEl = document.querySelector('.nd-add-node-button');
    if (addBtnEl) {
        addBtnEl.addEventListener('click', () => {
            ndNodes.push(new NDNode(random(0, width), random(0, height)));
        });
    } else {
        throw Error('Button with class .nd-add-node-button is missing.');
    }
}

/**
 * Initializes specifically the ADD CONNECTION button
 */
function initializeAddConnectionAction() {
    const addBtnEl = document.querySelector('.nd-add-connection-button');
    if (addBtnEl) {
        addBtnEl.addEventListener('click', () => {
            ndConnections.push(new NDConnection());
        });
    } else {
        throw Error('Button with class .nd-add-connection-button is missing.');
    }
}

/**
 * Remove context menu on canvas
 */
function removeContextMenu() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.oncontextmenu = function(e) {
            e.preventDefault();
            e.stopPropagation();
        };
    }
    
}