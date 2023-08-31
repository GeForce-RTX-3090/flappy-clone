const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Image assets
const birdUpflap = new Image();
const birdMidflap = new Image();
const birdDownflap = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

// Setting the image sources
birdUpflap.src = "assets/bluebird-upflap.png";
birdMidflap.src = "assets/bluebird-midflap.png";
birdDownflap.src = "assets/bluebird-downflap.png";
bg.src = "assets/background-day.png";
fg.src = "assets/base.png";
pipeNorth.src = "assets/pipe-green.png";
pipeSouth.src = "assets/pipe-green.png";

// Game variables
const gap = 85;
const constant = pipeNorth.height + gap;
let birdY = 150;
let gravity = 1.5;
let score = 0;
let pipe = [{ x: canvas.width, y: 0 }];

document.addEventListener('keydown', moveUp);

function moveUp(e) {
  if (e.code === "Space") {
    birdY -= 25;
  }
}

let currentBirdSprite = birdMidflap;

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x === 125) {
      pipe.push({ x: canvas.width, y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height });
    }

    if (birdY + currentBirdSprite.height >= canvas.height - fg.height ||
        birdY <= 0 ||
        birdY + currentBirdSprite.height >= pipe[i].y + constant - gap && birdY <= pipe[i].y + pipeNorth.height) {
        location.reload(); // reload the page when the bird hits the ground or pipes
    }

    if (pipe[i].x === 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(currentBirdSprite, 10, birdY);

  birdY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score: " + score, 10, canvas.height - 20);
}

// Initialize the game loop
setInterval(draw, 20);
