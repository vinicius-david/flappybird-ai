class Tube {
  constructor({ position, y }) {
    this.velocity = -3.5;
    this.acceleration = -0.001;
    this.position = position;
    this.dead = false;
    this.x = canvas.width;
    this.y = y;
    this.width = topPipeSprite.width;
    this.height = this.position === 'top' ? y : canvas.height;
  }

  draw() {
    if (this.position === 'top') {
      rect(this.x + 1.5, 0, topPipeSprite.width - 3, this.y);
      image(topPipeSprite, this.x, 0, topPipeSprite.width, this.height);
      image(pipeHeadSprite, this.x - 3, this.y - pipeHeadSprite.height - 30, 110, 50);
    } else {
      rect(this.x + 1.5, this.y, bottomPipeSprite.width - 3, canvas.height - this.y - groundSprite.height);
      image(bottomPipeSprite, this.x, this.y, bottomPipeSprite.width, canvas.height - this.y - groundSprite.height);
      image(pipeHeadSprite, this.x - 3, this.y, 110, 50);
    }
  }

  update() {
    this.x += this.velocity;
    this.velocity += this.acceleration;

    if (this.x < -10) {
      this.dead = true;
    }

    this.draw();
  }
}
