const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Image assets
const birdUpflap = new Image();
const birdMidflap = new Image();
const birdDownflap = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();

// Setting the image sources
birdUpflap.src = "assets/bluebird-upflap.png";
birdMidflap.src = "assets/bluebird-midflap.png";
birdDownflap.src = "assets/bluebird-downflap.png";
bg.src = "assets/background-day.png";
fg.src = "assets/base.png";
pipeNorth.src = "assets/pipe-green.png";

// Game variables
const gap = 85;
const constant = pipeNorth.height + gap;
let birdY = 150;
let gravity = 1.5;
let score = 0;
let birdFrame = 0;
const birdSprites = [birdDownflap, birdMidflap, birdUpflap];
let pipe = [{ x: canvas.width + 10, y: 0 }];

document.addEventListener('keydown', moveUp);

function moveUp(e) {
  if (e.code === "Space") {
    birdY -= 20;
  }
}

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.save();
    ctx.translate(pipe[i].x, pipe[i].y + constant);
    ctx.rotate(Math.PI);
    ctx.drawImage(pipeNorth, -pipeNorth.width, -pipeNorth.height);
    ctx.restore();

    pipe[i].x--;

    if (pipe[i].x === 125) {
      pipe.push({ x: canvas.width, y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height });
    }

    if ((birdY + birdSprites[birdFrame].height >= canvas.height - fg.height) ||
        (birdY <= pipe[i].y + pipeNorth.height && birdY + birdSprites[birdFrame].height >= pipe[i].y) ||
        (birdY + birdSprites[birdFrame].height >= pipe[i].y + constant && birdY <= pipe[i].y + constant + gap)) {
        return; // Stop the game when the bird hits the ground or pipes
    }

    if (pipe[i].x === 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(birdSprites[birdFrame], 10, birdY);

  birdFrame = (birdFrame + 1) % 3;
  birdY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score: " + score, 10, canvas.height - 20);
}

// Initialize the game loop
setInterval(draw, 20);
