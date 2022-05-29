let birdSprite, topPipeSprite, bottomPipeSprite, backgroundSprite, groundSprite;
let canvas;

let players = [], playersBackUp = []; tubes = [];

let generation = 0;
let record = 0;
let currentScore = 0;

const populationSize = 800;

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

	background = new Background();
	ground = new Ground();

	for (let i = 0; i < populationSize; i++) {
		players.push(new Player());
	}

	playersBackUp = players;
}

function draw() {
	clear();

	background.draw();
	ground.update();

	if (frameCount === 5 || frameCount % 100 === 0) {
		const randomizedY = Math.random() * 400 + 100;
		tubes = tubes.filter(tube => tube.dead === false);
		tubes.push(new Tube({ position: 'top', y: randomizedY }));
		tubes.push(new Tube({ position: 'bottom', y: randomizedY + 190 }));
	}

	let checkScore = false;
	tubes.forEach(tube => {
		const result = tube.update(players);

		if (!checkScore) {
			checkScore = result;
		}
	});
	
	players.forEach(player => {
		let colided = false;
		tubes.some(tube => {
			if (detectColision(player, tube)) {
				colided = true;
				return true;
			} else {
				return false;
			}
		});

		if (colided) {
			player.dead = true;
		} else {
			player.update(tubes, checkScore);
		}
	});

	players = players.filter(player => !player.dead);

	showScore();

	if (players.length === 0) {
		tubes = [];
		players = createNewGeneration(playersBackUp);
		playersBackUp = players;

		console.log('new generation');
		generation ++;
	}
}

function showScore() {
	const maxScore = Math.max(...players.map(p => p.score));
	currentScore = maxScore;

	if (currentScore > record) {
		record = currentScore;
	}

	text('Generation: ' + generation, 550, 64)
	text('Score: ' + currentScore, 550, 128);
  text('Best: ' + record, 550, 192);
	textSize(32);
	fill(500, 500, 500, 500);
}

addEventListener('keypress', (e) => {
	if (e.key === 's') {
		loop();
	} else {
		noLoop();
	}
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

	return xColision && yColision;
}
