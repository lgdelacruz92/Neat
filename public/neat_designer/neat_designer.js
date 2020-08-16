let ndNodes;
let ndConnections;
let rightClickOpen;
let currentlySelectedItems;
let inputGroupArea;
let outputGroupArea;

function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent("viewport");
    ndNodes = [];
    ndConnections = [];
    mousePrsd = false; 
    currentlySelectedItems = [];
    inputGroupArea = new GroupArea(0, 0);
    outputGroupArea = new GroupArea(width - 75, 0);
    inputGroupArea.color = createVector(50, 50, 50);
    outputGroupArea.color = createVector(100, 100, 100);

    initializeActions();
}

function draw() {
    background(0);
    inputGroupArea.draw();
    outputGroupArea.draw();
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
        ndConnections[i].number = i;
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
        ndNodes[i].number = i;
        if (inputGroupArea.inArea(ndNodes[i].pos.x, ndNodes[i].pos.y)) {
            ndNodes[i].color = createVector(100, 150, 200);
        } else if (outputGroupArea.inArea(ndNodes[i].pos.x, ndNodes[i].pos.y)) {
            ndNodes[i].color = createVector(200, 50, 75);
        } else {
            ndNodes[i].color = createVector(0, 200, 250);
        }
    }
}

/**
 * Function called when moused is pressed inside the canvas
 * Assign which node to be moving
 */
function mousePressed(e) {
    if (e.button === 0) {
        closePopup(e);
        handleLeftClick();
        deselect(currentlySelectedItems);
    } else if (e.button === 2) {
        const target = createVector(mouseX, mouseY);
        const canvasTarget = getCanvasTarget(target);
        if (canvasTarget !== null) {
            currentlySelectedItems.push({ canvasTarget, origColor: canvasTarget.color });
            canvasTarget.color = createVector(235, 119, 52);
        }
        handleRightClick(target);
    }
    return false;
}

/**
 * Deselects all items in the currentlySelectedItems
 * @param {Array} currentlySelectedItems Array of items currently selected
 */
function deselect(currentlySelectedItems) {
    for (let i = 0; i < currentlySelectedItems.length; i++) {
        const item = currentlySelectedItems[i].canvasTarget;
        item.color = currentlySelectedItems[i].origColor;
    }
    currentlySelectedItems = [];
}

/**
 * Gets the most likely target based on coordinates
 * @param {object} target The x, y location
 */
function getCanvasTarget(target) {
    const possibleTargets = [];
    for (let i = 0; i < ndNodes.length; i++) {
        const r = dist(ndNodes[i].pos.x, ndNodes[i].pos.y, target.x, target.y)
        if (r < ndNodes[i].r) {
            possibleTargets.push({ item: ndNodes[i], r });
        }
    }

    for (let i = 0; i < ndConnections.length; i++) {
        if (ndConnections[i].nearCenter(target.x, target.y)) {
            possibleTargets.push({ item: ndConnections[i], r: ndConnections[i].distToCenter(target.x, target.y) });
        }
    }

    if (possibleTargets.length > 0) {
        possibleTargets.sort((a, b) => b.r - a.r);
        return possibleTargets[0].item;
    }
    return null;
}

/**
 * Closes the pop up if it is open
 */
function closePopup(e) {
    const popup = document.querySelector('#right-click-canvas-popup');
    if (popup) {
        if (e.target !== popup) {
            popup.setAttribute('class', 'right-click popup disabled');
        }
    } else {
        throw Error('Error: pop up is missing')
    }
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
 * Handles right click event if there is
 * @param {object} target position
 */
function handleRightClick(target) {
    const rightClickCanvasPopUp = document.querySelector('#right-click-canvas-popup');
    const canvasEl = document.querySelector('canvas');
    if (rightClickCanvasPopUp && canvasEl) {
        const rect = canvasEl.getBoundingClientRect();

        if (insideRect(target, rect)) {
            rightClickCanvasPopUp.setAttribute('class', 'right-click popup');
            rightClickCanvasPopUp.setAttribute('style', `top: ${rect.top + target.y}px; left: ${rect.left + target.x}px`);
            return false;
        }
    } else {
        throw Error('This should not happen. Right click div is missing.');
    }
}

/**
 * True if an x,y coordinate is inside a Rectangle else false
 * @param {object} target Target coordinate
 * @param {object} rect Rect object to check against
 * @return {boolean}
 */
function insideRect(target, rect) {
    return rect.left < target.x + rect.left && 
        target.x + rect.left < rect.left + rect.width && 
        rect.top < target.y + rect.top && 
        target.y + rect.top < rect.top + rect.height;
}

/**
 * Initializes the buttons on the screen
 */
function initializeActions() {
    initializeAddNodeAction();
    initializeAddConnectionAction();
    initializeDeleteItemAction();
    initializeExportAction();
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
        throw Error('Button or container is missing.');
    }
}

/**
 * Remove context menu on canvas
 */
function removeContextMenu() {
    const canvas = document.querySelector('canvas');
    const containerEl = document.querySelector('.container');
    if (canvas) {
        containerEl.oncontextmenu = function(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        canvas.oncontextmenu = function(e) {
            e.preventDefault();
            e.stopPropagation();
        };
    } else {
        throw Error('No canvas found.');
    }
}

/**
 * Initializes delete item action
 */
function initializeDeleteItemAction() {
    const deleteBtn = document.querySelector('.delete-button');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (currentlySelectedItems.length > 1) {
                throw Error('Something is strange. This shouldnt happen.');
            } else if (currentlySelectedItems.length === 1) {
                for (let i = 0; i < ndNodes.length; i++) {
                    if (ndNodes[i].id === currentlySelectedItems[0].canvasTarget.id) {
                        ndNodes.splice(i, 1);
                        break;
                    }
                }

                for (let i = 0; i < ndConnections.length; i++) {
                    if (ndConnections[i].id === currentlySelectedItems[0].canvasTarget.id) {
                        ndConnections.splice(i, 1);
                        break;
                    }
                }

                currentlySelectedItems = [];
            }
        });
    } else {
        throw Error('Delete button doesnt exists.');
    }
}

/**
 * Initializes delete item action
 */
function initializeExportAction() {
    const exportEl = document.querySelector('.nd-export-button');
    if (exportEl) {
        exportEl.addEventListener('click', () => {
            exportNeat();
        });
    } else {
        throw Error('Export button is missing.');
    }
}

/**
 * Exports the canvas
 */
function exportNeat() {
    let neat = null;
    validateConnections();
    const inputNodes = getAllInputs();
    if (inputNodes.length === 0) {
        throw Error('No input nodes. Please put at least one node in input area.');
    }
    
    const outputNodes = getAllOutputs();
    if (outputNodes.length === 0) {
        throw Error('No output nodes. Please put at least one node in input area.');
    }
    const nodes = grabNodes(inputNodes, outputNodes);
    const connections = grabConnections();

    neat = {
        inputNumber: inputNodes.length,
        outputNumber: outputNodes.length,
        nodes: nodes.map(n => ({ identificationNumber: n.node.number, value: n.node.value })),
        connections
    }

    validateNeat(neat);
    outputNeatJSON(neat);
}

/**
 * Outputs the neat JSON into the ouput area
 * @param {neatJSON} neat The neat JSON
 */
function outputNeatJSON(neatJSON) {
    const exportedNeatJSONOutput = document.querySelector('#exported-neat-json');
    if (exportedNeatJSONOutput) {
        const neatAsString = prettifyJSON(neatJSON);
        const neatAsArray = neatAsString.split('\n');
        exportedNeatJSONOutput.innerHTML = '';
        for (let i = 0; i < neatAsArray.length; i++) {
            const pEl = document.createElement('pre');
            const textNode = document.createTextNode(neatAsArray[i]);
            pEl.appendChild(textNode);
            exportedNeatJSONOutput.appendChild(pEl);
        }
    } else {
        throw Error('Something went wrong. Export neat JSON div is missing.');
    }
}

/**
 * Grabs the connections
 */
function grabConnections() {
    const connections = [];
    for (let i = 0; i < ndConnections.length; i++) {
        const nodeInStart = findNodeInStart(ndConnections[i]);
        const nodeInEnd = findNodeInEnd(ndConnections[i]);
        if (nodeInStart === null || nodeInEnd === null) {
            throw Error('This connection is broken. Ensure it has an input and output.');
        } else {
            connections.push({ 
                innovationNumber: ndConnections[i].number,
                weight: ndConnections[i].weight,
                expressed: ndConnections[i].expressed,
                inNode: nodeInStart[0].number,
                outNode: nodeInEnd[0].number
            })
        }
    }
    return connections;
}

/**
 * Grabs the nodes
 */
function grabNodes(inputNodes, outputNodes) {

    const alreadyInNode = {};
    const nodes = [];
    for (let i = 0; i < inputNodes.length; i++) {
        nodes.push({ node: inputNodes[i], number: i });
        alreadyInNode[inputNodes[i].id] = true;
    }
    for (let i = 0; i < outputNodes.length; i++) {
        nodes.push({ node: outputNodes[i], number: i });
        alreadyInNode[outputNodes[i].id] = true;
    }
    for (let i = 0; i < ndNodes.length; i++) {
        if (alreadyInNode[ndNodes[i].id] === undefined) {
            nodes.push({ node: ndNodes[i], number: i });
        }
    }
    return nodes;
}

/**
 * Validates the connections
 */
function validateConnections() {
    if (ndConnections.length === 0) {
        throw Error('There has to be a min of one connection.');
    }

    for (let i = 0; i < ndConnections.length; i++) {
        const nodeInStart = findNodeInStart(ndConnections[i]);
        const nodeInEnd = findNodeInEnd(ndConnections[i]);
        if (nodeInStart === null || nodeInEnd === null) {
            throw Error('This connection is broken. Ensure it has an input and output.');
        }
    }
}

/**
 * Finds the node that is connected to the start of this connection
 * @param {Connection} connection The connection
 */
function findNodeInStart(connection) {
    const result = [];
    for (let i = 0; i < ndNodes.length; i++) {
        const r = dist(connection.start.x, connection.start.y, ndNodes[i].pos.x, ndNodes[i].pos.y);
        if ( r < ndNodes[i].r) {
            result.push(ndNodes[i]);
        }
    }
    if (result.length > 1) {
        console.log('%cThere is more than one node in the start of a connection. Please fix.', 'color: red');
    } else if (result.length !== 1) {
        console.log('%cThe start of a connection is not connected. Please connect it (red end) to a node.', 'color: red');
    }
    return result;
}

/**
 * Finds the node that is connected to the end of this connection
 * @param {Connection} connection The connection
 */
function findNodeInEnd(connection) {
    const result = [];
    for (let i = 0; i < ndNodes.length; i++) {
        const r = dist(connection.end.x, connection.end.y, ndNodes[i].pos.x, ndNodes[i].pos.y);
        if ( r < ndNodes[i].r) {
            result.push(ndNodes[i]);
        }
    }
    if (result.length > 1) {
        console.log('%cThere is more than one node in the end of a connection. Please fix.', 'color: red');
    } else if (result.length !== 1) {
        console.log('%cThe end of a connection is not connected. Please connect it (blue end) to a node.', 'color: red');
    }
    return result;
}

/**
 * Gets all the nodes in the output area
 */
function getAllOutputs() {
    const result = [];
    for (let i = 0; i < ndNodes.length; i++) {
        if (outputGroupArea.inArea(ndNodes[i].pos.x, ndNodes[i].pos.y)) {
            result.push(ndNodes[i]);
        }
    }
    return result;
}

/**
 * Gets all the nodes int he input area
 */
function getAllInputs() {
    const result = [];
    for (let i = 0; i < ndNodes.length; i++) {
        if (inputGroupArea.inArea(ndNodes[i].pos.x, ndNodes[i].pos.y)) {
            result.push(ndNodes[i]);
        }
    }
    return result;
}

/**
 * Validates if the format of the Neat has the proper characteristics
 * @param {Neat} neat The Neat object to validate
 */
function validateNeat(neat) {
    if (neat !== null) {
        if (neat.inputNumber + neat.outputNumber > neat.nodes.length) {
            throw Error('Export not working correctly. The node numbers does not match.');
        }
        if (neat.inputNumber === undefined) {
            throw Error('inputNumber missing');
        }
        if (neat.outputNumber === undefined) {
            throw Error('outputNumber missing')
        }
        if (Array.isArray(neat.connections) === false) {
            throw Error('connections property error')
        }
        if (Array.isArray(neat.nodes) === false) {
            throw Error('connections property error')
        }
    }
}