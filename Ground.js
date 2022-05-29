class Ground {
  constructor() {
    this.width = 30;
    this.height = 30;
    this.x = 0;
    this.y = canvas.height - this.height;
    this.speed = -1.25;
  }

  draw() {
    rect(this.x, this.y, canvas.width, this.height);

    for (let i = 0; i < 60; i++) {
      image(groundSprite, i * this.width + this.x, this.y);
    }
  }

  update() {
    this.x += this.speed;
    
    if (this.x < - 15) {
      this.x = 0;
    }
    
    this.draw();
  }
}
