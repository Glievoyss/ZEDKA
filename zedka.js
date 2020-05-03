var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var zedka = new Image();
var map = new Image();
var logo = new Image();
var virusUp = new Image();
var virusDown = new Image();

zedka.src = "images/zedka.png";
map.src = "images/map.png";
logo.src = "images/logo.png";
virusUp.src = "images/virusUp.png";
virusDown.src = "images/virusDown.png";

let gap = 120;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/noch.mp3";
scor.src = "sounds/ou.mp3";

// on key down

document.addEventListener("keydown", moveUp);

function moveUp(e) {
  console.log(e.code);
  if (e.code === "KeyH") {
    gap += 10;
  } else if (e.code === "KeyJ") {
    gap -= 10;
  }
  bY -= 25;
  fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

// draw images

function draw() {
  ctx.drawImage(map, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
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

    // detect collision

    if (
      (bX + zedka.width >= pipe[i].x &&
        bX <= pipe[i].x + virusUp.width &&
        (bY <= pipe[i].y + virusUp.height ||
          bY + zedka.height >= pipe[i].y + constant)) ||
      bY + zedka.height >= cvs.height - logo.height
    ) {
      location.reload(); // reload the page
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
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

draw();
