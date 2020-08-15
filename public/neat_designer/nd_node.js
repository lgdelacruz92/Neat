class NDNode {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.r = 20;
        this.moving = false;
        this.type = 'node';
    }

    /**
     * Updates the NDNode one step
     */
    update() {
        if (this.moving) {
            this.pos = createVector(mouseX, mouseY);
        }
    }

    /**
     * Draws the NDNode
     */
    draw() {
        push();
        stroke(255);
        fill(0, 200, 250);
        translate(this.pos.x, this.pos.y);
        circle(0, 0, this.r);
        pop();
    }
}