const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const zedka = new Image();
const map = new Image();
const logo = new Image();
const virusUp = new Image();
const virusDown = new Image();

zedka.src = "images/zedka.png";
map.src = "images/map.png";
logo.src = "images/logo.png";
virusUp.src = "images/virusUp.png";
virusDown.src = "images/virusDown.png";

let gap = 120;
let constant;

let bX = 10;
let bY = 150;

const gravity = 1.5;

let score = 0;

const fly = new Audio();
const scor = new Audio();

fly.src = "sounds/noch.mp3";
scor.src = "sounds/ou.mp3";
fly.play();

document.addEventListener("keydown", moveUp);

function moveUp(e) {
  if (e.code === "KeyH") {
    gap += 10;
  } else if (e.code === "KeyJ") {
    gap -= 10;
  }
  bY -= 25;
}

let pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

function draw() {
  ctx.drawImage(map, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    constant = virusUp.height + gap;
    ctx.drawImage(virusUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(virusDown, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * virusUp.height) - virusUp.height,
      });
    }

    if (
      (bX + zedka.width >= pipe[i].x &&
        bX <= pipe[i].x + virusUp.width &&
        (bY <= pipe[i].y + virusUp.height ||
          bY + zedka.height >= pipe[i].y + constant)) ||
      bY + zedka.height >= cvs.height - logo.height
    ) {
      scor.play();
      score = 0;
      bX = 10;
      bY = 150;
      pipe = [];
      pipe[0] = {
        x: cvs.width,
        y: 0,
      };
      break;
    }

    if (pipe[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(logo, 0, cvs.height - logo.height);

  ctx.drawImage(zedka, bX, bY);

  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

virusDown.onload = draw();
