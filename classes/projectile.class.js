class Projectile extends MovableObject {
    x
    y
    width
    height
    speed
    direction
    removalFlag = false

    /** Updates the projectile object's position based on its direction and speed. */
    travel() {
        if (this.direction == 'right') {
            this.x += this.speed;
        } else if (this.direction == 'left') {
            this.x -= this.speed;
        }
        this.travelCheck()
    }

    /** Checks if the projectile is out of the map and updates its removal flag accordingly. */
    travelCheck() {
        if (this.isOutOfMap()) {
            this.removalFlag = true
        } else {
            this.contiueTravel()
        }
    }

    /** Continues the projectile's travel after a short delay. */
    contiueTravel() {
        setTimeout(() => this.travel(), 1000 / 60)
    }

    /** Checks if the projectile is outside the map boundaries. */
    isOutOfMap() {
        return this.x < -100 || this.x > world.level.endPosX + 100
    }
}