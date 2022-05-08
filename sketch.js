let birdSprite, topPipeSprite, bottomPipeSprite, backgroundSprite, groundSprite;
let canvas;

let player;

function preload() {
	birdSprite = loadImage("images/fatBird.png");
  topPipeSprite = loadImage("images/full pipe top.png");
  bottomPipeSprite = loadImage("images/full pipe bottom.png");
  backgroundSprite = loadImage("images/background.png");
  groundSprite = loadImage("images/groundPiece.png");
}

function setup() {
	canvas = createCanvas(1200, 800);

	background = new Background();
	ground = new Ground();
	player = new Player();
}

function draw() {
	clear();

	background.draw();
	ground.draw();
	player.update();
}

addEventListener('click', (event) => {
	console.log(player.aceleration);
  player.fly();
});
