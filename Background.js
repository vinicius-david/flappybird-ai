class Background {
  constructor() {}

  draw() {
    image(backgroundSprite, 0, 0);
    image(backgroundSprite, backgroundSprite.width, 0);
  }
}
