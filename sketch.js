let birdSprite, topPipeSprite, bottomPipeSprite, backgroundSprite, groundSprite;
let canvas;

let player, tubes = [];

function preload() {
	birdSprite = loadImage("images/fatBird.png");
  topPipeSprite = loadImage("images/full pipe top.png");
  bottomPipeSprite = loadImage("images/full pipe bottom.png");
  backgroundSprite = loadImage("images/background.png");
	pipeHeadSprite = loadImage("images/pipeHead.png");
  groundSprite = loadImage("images/groundPiece.png");
}

function setup() {
	canvas = createCanvas(1200, 800);
	frameRate(45);

	background = new Background();
	ground = new Ground();
	player = new Player();
}

function draw() {
	clear();

	background.draw();
	ground.update();

	if (frameCount === 5 || frameCount % 100 === 0) {
		const randomizedY = Math.random() * 400 + 100;
		tubes = tubes.filter(tube => tube.dead === false);
		tubes.push(new Tube({ position: 'top', y: randomizedY }));
		tubes.push(new Tube({ position: 'bottom', y: randomizedY + 175 }));
	}

	tubes.forEach(tube => tube.update());

	tubes.forEach(tube => detectColision(player, tube));

	player.update();
}

addEventListener('click', (e) => {
  player.fly();
});

function detectColision(player, tube) {
	const xColision = (player.x + player.width > tube.x) && (player.x < tube.x + tube.width);
	let yColision = false;

	if (xColision) {
		if (tube.position === 'top') {
			yColision = (player.y < tube.y);
		} else {
			yColision = (player.y + player.height > tube.y);
		}
	}
	console.log(xColision && yColision);
}
