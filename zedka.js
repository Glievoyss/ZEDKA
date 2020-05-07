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

let gap = 160;
let constant;

let bX = 10;
let bY = 150;

const gravity = 1.5;

let score = 0;
let record = 0;

const fly = new Audio();
const scor = new Audio();
const smeh = new Audio();

fly.src = "sounds/noch.mp3";
scor.src = "sounds/ou.mp3";
smeh.scr = "sounds/ou2.mp3";
fly.play();

document.addEventListener("keydown", moveUp);
document.addEventListener("touchstart", moveUpMouse);
document.addEventListener("touchmove", moveUpMouse);

function moveUp(e) {
  if (e.code === "KeyH") {
    gap += 10;
  } else if (e.code === "KeyJ") {
    gap -= 10;
  }
  bY -= 25;
}

function moveUpMouse(e) {
  if (e.code === "KeyH") {
    gap += 10;
  } else if (e.code === "KeyJ") {
    gap -= 10;
  }
  bY -= 7;
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
      score > record ? (record = score) : (record = record);
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
      smeh.play();
    }
  }

  ctx.drawImage(logo, 0, cvs.height - logo.height);

  ctx.drawImage(zedka, bX, bY);

  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Балы : " + score, 10, cvs.height - 70);
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Рекорд : " + record, 10, cvs.height - 30);

  requestAnimationFrame(draw);
}

virusDown.onload = draw();
