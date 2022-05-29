let birdSprite, topPipeSprite, bottomPipeSprite, backgroundSprite, groundSprite;
let canvas;

let players = [], playersBackUp = []; tubes = [];

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

	if (players.length === 0) {
		tubes = [];
		players = createNewGeneration(playersBackUp);
		playersBackUp = players;

		console.log('new generation');
	}
}

addEventListener('click', (e) => {
  // player.fly();
});

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
