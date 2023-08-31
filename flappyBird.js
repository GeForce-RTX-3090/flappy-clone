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
let birdY = canvas.height / 2 - 10; // Center the bird vertically
let gravity = 1.5;
let score = 0;
let birdFrame = 0;
const birdSprites = [birdDownflap, birdMidflap, birdUpflap];
let pipe = [{ x: canvas.width, y: -pipeNorth.height + Math.floor(Math.random() * pipeNorth.height) }];

document.addEventListener('keydown', moveUp);

function moveUp(e) {
  if (e.code === "Space") {
    birdY -= 30; // Increase the jump height slightly for better control
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    const constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x === canvas.width / 2) { // Generate new pipes at half canvas width
      pipe.push({ x: canvas.width, y: -pipeNorth.height + Math.floor(Math.random() * pipeNorth.height) });
    }

    // Collision checks
    if ((birdY + birdSprites[birdFrame].height >= canvas.height - fg.height) ||
        (birdY <= pipe[i].y + pipeNorth.height && birdY + birdSprites[birdFrame].height >= pipe[i].y) ||
        (birdY + birdSprites[birdFrame].height >= pipe[i].y + constant && birdY <= pipe[i].y + constant + gap)) {
        ctx.fillStyle = "#000";
        ctx.font = "30px Verdana";
        ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
        return;
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
