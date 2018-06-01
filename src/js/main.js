var canvas = document.getElementById("canvas");
var g = canvas.getContext("2d");

document.onmousemove = onMouseMove;

var w = 320;
var h = 240;

canvas.width = w;
canvas.height = h;

var paddleHeight = 32;
var paddleWidth = 8;
var ballSize = 4;

var lScore = 0;
var rScore = 0;

function Sprite(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.velX = 0;
    this.velY = 0;

    this.render = function() {
        g.fillStyle = "#fff";
        g.fillRect(this.x, this.y, this.w, this.h);

        this.x += this.velX;
        this.y += this.velY;
    }
}

function collide(e1, e2) {
    return !(e1.x > e2.x + e2.w || e1.x + e1.w < e2.x || e1.y > e2.y + e2.h || e1.y + e1.h < e2.y);
}

var lPaddle = new Sprite(10, h / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
var rPaddle = new Sprite(w - 10 - paddleWidth, h / 2 - paddleHeight / 2, paddleWidth, paddleHeight);

var ball = new Sprite(w / 2 - ballSize / 2, h / 2 - ballSize / 2, ballSize, ballSize);
ball.velX = -4 + Math.random() * 8;
ball.velY = -4 + Math.random() * 8;

function render() {
    g.fillStyle = "#000";
    g.fillRect(0, 0, w, h);

    lPaddle.render();
    rPaddle.render();
    ball.render();

    g.fillStyle = "#fff";
    g.fillText(lScore + " | " + rScore, w / 2, h / 2);

    // Enemy Paddle Movement
    rPaddle.velY = 0;
    if (ball.y + ballSize / 2 < rPaddle.y + paddleHeight / 2 - paddleHeight/4) {
        rPaddle.velY = -2;
    }
    if (ball.y + ballSize / 2 > rPaddle.y + paddleHeight / 2 + paddleHeight/4) {
        rPaddle.velY = 2;
    }

    // Ball Collision/////////////////////////////
    if (ball.y <= 0 || ball.y + ballSize >= h) {
        ball.velY *= -1;
    }

    if (collide(ball, lPaddle)) {
        ball.velX *= -1;
        ball.velY = -4 + Math.random() * 8;
    }
    
    if (collide(ball, rPaddle)) {
        ball.velX *= -1;
        ball.velY = -4 + Math.random() * 8;
    }

    if (ball.x + ballSize < 0) {
        rScore++;
        reInit();
    }

    if (ball.x > w) {
        lScore++;
        reInit();
    }

    ///////////////////////////////////////////////

    setTimeout(render, 16);
}

function reInit() {
    ball.x = w / 2 - ballSize / 2;
    ball.y = h / 2 - ballSize / 2;
    ball.velX = 2 + Math.random() * 2;
    ball.velY = 2 + Math.random() * 2;
}

function onMouseMove(e) {
    lPaddle.y = e.y - paddleHeight / 2;
}

render();
