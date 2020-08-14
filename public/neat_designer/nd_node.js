class NDNode {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.r = 20;
        this.moving = false;
    }

    /**
     * Updates the NDNode one step
     */
    update() {
        if (mousePressedAndDragged 
            && dist(this.pos.x, this.pos.y, mouseX, mouseY) < this.r 
            && !this.moving) {
            this.moving = true;
        }
        if (!mousePressedAndDragged) {
            this.moving = false;
        }

        if (this.moving) {
            this.pos = createVector(mouseX, mouseY);
        }
    }

    /**
     * Draws the NDNode
     */
    draw() {
        push();
        noStroke();
        fill(0, 200, 250);
        translate(this.pos.x, this.pos.y);
        circle(0, 0, this.r);
        pop();
    }
}