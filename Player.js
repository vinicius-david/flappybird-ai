class Player {
  constructor(brain) {
    this.x = Math.random() * 150 + 50 ;
    this.y = 100;
    this.velocity = 0;
    this.aceleration = -10;
    this.alpha = 0.99;
    this.width = birdSprite.width;
    this.height = birdSprite.height;
    this.brain = brain ? brain : new NeuralNetwork(2,2,1);
    this.score = 0;
  }

  draw() {
    image(birdSprite, this.x, this.y);
  }

  update(tubes, checkScore) {
    if (tubes.length > 0) {
      let closestTube = tubes[0];
      tubes.some(tube => {
        if (tube.x + tube.width > this.x) {
          closestTube = tube;
          return true;
        } else {
          return false;
        }
      });
  
      const horizontaldistance = closestTube.x - this.x;
      const verticaldistance = closestTube.y - this.y + 95;
  
      this.think({ d1: horizontaldistance, d2: verticaldistance })
    }

    this.y = this.y + this.velocity;
    this.velocity += 0.5;
    this.aceleration *= this.alpha;

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    if (this.y > (canvas.height - 2 * ground.height - 10)) {
      this.y = canvas.height - 2 * ground.height - 10;
      this.velocity = 0;
    }

    if (checkScore) {
      this.score ++;
    }

    this.draw();
  }

  think(inputs) {
    const output = this.brain.run(inputs)[0];

    if (output > 0.5) {
      this.fly();
    }
  }

  fly() {
    this.aceleration = -10;
    this.velocity = this.aceleration;
  }
}
