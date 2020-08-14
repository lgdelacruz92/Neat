class NDConnection {
    constructor() {
        this.start = createVector(random(0, width), random(0, height));
        this.end = createVector(random(0, width), random(0, height));
        this.radiusForEdit = 20;
        this.moveStart = false;
        this.moveEnd = false;
        this.moveBoth = false;
        this._updateSlope();
        this._updateLength();
    }

    /**
     * Updates the NDConnection
     */
    update() {
        const midPoint = this._getMidPoint();
        if (mousePrsd && dist(this.start.x, this.start.y, mouseX, mouseY) < this.radiusForEdit) {
            this.moveStart = true;
        } else if (mousePrsd && dist(this.end.x, this.end.y, mouseX, mouseY) < this.radiusForEdit) {
            this.moveEnd = true;
        } else if (mousePrsd && dist(midPoint.x, midPoint.y, mouseX, mouseY) < this.radiusForEdit * 4) {
            this.moveBoth = true;
        }

        if (!mousePrsd) {
            this.moveStart = false;
            this.moveEnd = false;
            this.moveBoth = false;
        }

        if (this.moveStart) {
            this.start = createVector(mouseX, mouseY);
            this._updateSlope();
            this._updateLength();
        } else if (this.moveEnd) {
            this.end = createVector(mouseX, mouseY);
            this._updateSlope();
            this._updateLength();
        } else if (this.moveBoth) {
            const dir1 = this.slope.setMag(-this.length / 2);
            const mousePos = createVector(mouseX, mouseY);
            this.start = p5.Vector.add(dir1, mousePos);
            this.end = p5.Vector.add(dir1.mult(-1), mousePos);
        }
    }

    /**
     * Updates the slope property
     */
    _updateSlope() {
        this.slope = createVector(this.end.x - this.start.x, this.end.y - this.start.y);
    }

    /**
     * Updates the length property
     */
    _updateLength() {
        this.length = dist(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    _getMidPoint() {
        return createVector((this.end.x + this.start.x) / 2, (this.end.y + this.start.y) / 2);
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