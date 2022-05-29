class Player {
  constructor() {
    this.x = 200;
    this.y = 100;
    this.velocity = 0;
    this.aceleration = -10;
    this.alpha = 0.99;
    this.width = birdSprite.width;
    this.height = birdSprite.height;
  }

  draw() {
    image(birdSprite, this.x, this.y);
  }

  update() {
    this.y = this.y + this.velocity;
    this.velocity += 0.5;
    this.aceleration *= this.alpha;
    this.draw();
  }

  fly() {
    this.aceleration = -10;
    this.velocity = this.aceleration;
  }
}
