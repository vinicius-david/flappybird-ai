class Ground {
  constructor() {
    this.width = 30;
    this.height = 30;
    this.x = 0;
    this.y = canvas.height - this.height;
  }

  draw() {
    rect(0, this.y, canvas.width, this.height);

    for (let i = 0; i < 40; i++) {
      image(groundSprite, i * this.width, this.y);
    }
  }
}
