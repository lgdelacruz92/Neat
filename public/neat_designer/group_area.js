class GroupArea {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.w = 75;
        this.h = height;
        this.color = null;
        this.label = null;
    }

    /**
     * Detects if x,y is inside this GroupArea
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     */
    inArea(x, y) {
        return this.pos.x < x &&
            x < this.pos.x + this.w &&
            this.pos.y < x &&
            y < this.pos.y + this.h;
    }

    /**
     * Draw the group area
     */
    draw() {
        noStroke();
        if (this.color) {
            fill(this.color.x, this.color.y, this.color.z);
        } else {
            fill(0);
        }
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }
}