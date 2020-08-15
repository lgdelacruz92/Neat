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
        this.type = 'connection';
        this.color = createVector(255, 255, 255);
        this.id = uuidv4();
    }

    /**
     * Updates the NDConnection
     */
    update() {
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
     * True if x,y is near start, else, false.
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     */
    nearStart(x, y) {
        return dist(this.start.x, this.start.y, x, y) < this.radiusForEdit;
    }

    /**
     * True if x,y is neart end, else false.
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     */
    nearEnd(x, y) {
        return dist(this.end.x, this.end.y, x, y) < this.radiusForEdit;
    }

    /**
     * True if x,y is near it's center. Else, false.
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     */
    nearCenter(x, y) {
        const midPoint = this._getMidPoint();
        return dist(midPoint.x, midPoint.y, x, y) < this.radiusForEdit;
    }

    /**
     * Distance of x,y to center
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     */
    distToCenter(x, y) {
        const midPoint = this._getMidPoint();
        return dist(midPoint.x, midPoint.y, x, y);
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
        stroke(this.color.x, this.color.y, this.color.z);
        strokeWeight(3);
        line(this.start.x, this.start.y, this.end.x, this.end.y);

        const midPoint = this._getMidPoint();
        stroke(200, 200, 100);
        circle(midPoint.x, midPoint.y, 2);
    }
}