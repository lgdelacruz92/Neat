class NDNode {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.r = 20;
        this.moving = false;
        this.type = 'node';
        this.color = createVector(0, 200, 250);
        this.id = uuidv4();
        this.number = null;
        this.value = 0;
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
        strokeWeight(1);
        fill(this.color.x, this.color.y, this.color.z);
        translate(this.pos.x, this.pos.y);
        circle(0, 0, this.r);

        if (this.number !== null) {
            textSize(15);
            fill(255);
            text(`${this.number}`, -4, 5);
        }
        pop();
    }
}