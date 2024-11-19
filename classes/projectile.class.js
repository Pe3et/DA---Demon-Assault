class Projectile extends MovableObject {
    x
    y
    width
    height
    speed
    direction

    /** Updates the projectile object's position based on its direction and speed. */
    travel() {
        if (this.direction == 'right') {
            this.x += this.speed;
        } else if (this.direction == 'left') {
            this.x -= this.speed;
        };
        setTimeout(() => this.travel(), 1000/60)
    }
}