class NDConnection {
    constructor() {
        this.start = createVector(random(0, width), random(0, height));
        this.end = createVector(random(0, width), random(0, height));
        this.radiusForEdit = 20;
        this.moveStart = false;
        this.moveEnd = false;
    }

    /**
     * Updates the NDConnection
     */
    update() {
        if (mousePrsd && dist(this.start.x, this.start.y, mouseX, mouseY) < this.radiusForEdit) {
            this.moveStart = true;
        } else if (mousePrsd && dist(this.end.x, this.end.y, mouseX, mouseY) < this.radiusForEdit) {
            this.moveEnd = true;
        }

        if (!mousePrsd) {
            this.moveStart = false;
            this.moveEnd = false;
        }

        if (this.moveStart) {
            this.start = createVector(mouseX, mouseY);
        } else if (this.moveEnd) {
            this.end = createVector(mouseX, mouseY);
        }
    }

    /**
     * Draws the connection
     */
    draw() {
        stroke(255);
        strokeWeight(3);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
}