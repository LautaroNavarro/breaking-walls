
class Game {

    // Menu logic
    display_game_over = false;
    display_game = false;
    display_menu = true;
    paused = false;

    animationInterval = null;

    width = 800;
    height = 600;
    paddle = new Paddle();
    friction = 0.5;
    backgroundColor = 'BLACK';

    level = 1;
    lifes = 3;

    ball = {
        x: 400,
        y: 400,
        color: 'WHITE',
        radius: 10,
        speedX: 1,
        speedY: 10,
        maxAbsoluteSpeed: 11,
        maxAxisSpeed: 10,
        minAxisSpeed: 1,
    }

    // BRICKS
    bricks = [];
    bricksLeft = 0;
    brokenBricks = 0;
    brickWidth = 98;
    brickHeight = 40;
    brickRowNumber = 2;
    brickColNumber = 8;
    maxBrickRowNumber = 7;
    brickColors = {
        1: 'YELLOW',
        2: 'ORANGE',
        3: 'RED',
        4: 'PURPLE',
    }

    changeBackgroundColor () {
        if (this.paused == false && this.display_game == true) {
            this.backgroundColor = this.backgroundColor == "BLACK" ? "WHITE" : "BLACK";
        }
    }

    pressStart () {
        if (this.display_game) {
            this.paused = this.paused == true ? false : true;
        } else if (this.display_menu) {
            this.cleanGame();
            this.display_menu = false;
            this.display_game = true;
        } else {
            this.cleanGame();
            this.display_game_over = false;
            this.display_menu = true;
        }
    }

    cleanGame () {
        this.display_game = false;
        this.paused = false;
        this.backgroundColor = 'BLACK';
        this.display_game_over = false;
        this.display_menu = true;
        this.brokenBricks = 0;
        this.bricksLeft = 0;
        clearInterval(this.animationInterval);
        this.animationInterval = null;
        this.ball.x = 400;
        this.ball.y = 400;
        this.ball.speedX = 1;
        this.ball.speedY = 10;
        this.level = 1;
        this.lifes = 3;
        this.initBricks();
    }

    constructor () {
        this.cleanGame();
    }

    initBricks () {
        this.bricks = [];
        let bricksRow;
        this.bricksLeft = 0;
        for (var i = 0; i < this.brickRowNumber; i++) {
            bricksRow = [];
            for (var x = 0; x < this.brickColNumber; x++) {
                let resistence = Math.floor(Math.random() / 0.2);
                if (resistence != 0) {
                    this.bricksLeft++;
                }
                bricksRow.push({
                    resistence: resistence,
                    x: x * (this.brickWidth + 2),
                    y: i * (this.brickHeight + 2),
                    counted: false,
                });
            }
            this.bricks.push(bricksRow.slice());
        }
    }

    collideObject(object) {

      if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
      else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }

    }

    resetBall () {
        this.ball.x = this.width / 2;
        this.ball.y = this.height / 2;
        this.ball.speedX = Math.floor(this.ball.minAxisSpeed + Math.random()*(this.ball.maxAxisSpeed + 1 - this.ball.minAxisSpeed)) * (Math.round(Math.random()) * 2 - 1);
        this.ball.speedY = (this.ball.maxAbsoluteSpeed - Math.abs(this.ball.speedX)) * -1;
    }

    checkCircleAndRectCollition = (circle_x, circle_y, circle_r, rect_x, rect_y, rect_h, rect_w) => {

        let distX = Math.abs(circle_x - rect_x - rect_w/2);
        let distY = Math.abs(circle_y - rect_y - rect_h/2);

        if (distX > (rect_w/2 + circle_r)) { return false; }
        if (distY > (rect_h/2 + circle_r)) { return false; }

        if (distX <= (rect_w/2)) { return true; }
        if (distY <= (rect_h/2)) { return true; }

        let dx=distX-rect_w/2;
        let dy=distY-rect_h/2;
        return (dx*dx+dy*dy<=(circle_r*circle_r));
    }

    updateBall () {

        this.ball.x += this.ball.speedX;
        this.ball.y += this.ball.speedY;

        if ((this.ball.x - this.ball.radius) < 1 && this.ball.speedX < 0) {
            this.ball.speedX = this.ball.speedX * -1;
        }
        if ((this.ball.x + this.ball.radius) >= this.width && this.ball.speedX > 0) {
            this.ball.speedX = this.ball.speedX * -1;
        }
        if ((this.ball.y - this.ball.radius) < 1 && this.ball.speedY < 0) {
            this.ball.speedY = this.ball.speedY * -1;
        }
        if ((this.ball.y + this.ball.radius) > this.height) {
            this.lifes --;
            if (this.lifes == 0) {
                this.display_game_over = true;
                this.display_game = false;
            } else {
                this.resetBall();
            }
        }
    }

    handleBallAndPaddleCollition () {
        if (this.checkCircleAndRectCollition(
            this.ball.x,
            this.ball.y,
            this.ball.radius,
            this.paddle.x,
            this.paddle.y,
            this.paddle.height,
            this.paddle.width,
        )) {
            if (this.bricksLeft == 0) {
                if (this.brickRowNumber != this.maxBrickRowNumber) {
                    this.brickRowNumber++;
                }
                this.level++;
                this.initBricks();
            }
            this.ball.speedX = (this.ball.x - (this.paddle.x + (this.paddle.width / 2))) / this.ball.maxAbsoluteSpeed;
            let newSpeedY = this.ball.maxAbsoluteSpeed - Math.abs((this.ball.x - (this.paddle.x + (this.paddle.width / 2))) / this.ball.maxAbsoluteSpeed);
            this.ball.speedY = newSpeedY * -1;
        }
    }

    handleBrickCollition () {
        for (let i = 0; i < this.bricks.length; i++) {
            for (let x = 0; x < this.bricks[i].length; x++) {
                if (this.bricks[i][x].resistence != 0) {
                    let collitionDetected = this.checkCircleAndRectCollition(
                        this.ball.x,
                        this.ball.y,
                        this.ball.radius,
                        this.bricks[i][x].x,
                        this.bricks[i][x].y,
                        this.brickHeight,
                        this.brickWidth,
                    );
                    if (collitionDetected) {
                        this.bricks[i][x].resistence = this.bricks[i][x].resistence - 1;
                        this.ball.speedY = this.ball.speedY * -1;

                        if (Math.random() > 0.5) {
                            new Audio('./media/sound/s1.mp3').play();
                        } else {
                            new Audio('./media/sound/s2.mp3').play();
                        }

                        if (this.bricks[i][x].resistence == 0 && !this.bricks[i][x].counted) {
                            this.brokenBricks++;
                            this.bricksLeft--;
                            this.bricks[i][x].counted = true;
                        }

                        this.backgroundColor = Math.random() > 0.5 ? 'BLACK' : 'WHITE';
                    }
                }
            }
        }
    }

    update () {
        if (this.paused == false && this.display_game == true) {
            this.paddle.update();
            this.paddle.velocity_x *= this.friction;
            this.updateBall();
            this.handleBallAndPaddleCollition();
            this.handleBrickCollition();
            this.collideObject(this.paddle);
        } else if (this.display_menu && this.animationInterval == null) {
            this.animationInterval = setInterval( () => {this.initBricks()}, 1000 );
        }
    }
}


class Paddle {
    x = 340;
    y = 550;
    width = 120;
    height = 10;
    velocity_x = 0;
    fillColor = 'WHITE';

    moveLeft () {
        this.velocity_x -= 5;
    }

    moveRight () {
        this.velocity_x += 5;
    }

    update () {
        this.x += this.velocity_x;
    }

}
