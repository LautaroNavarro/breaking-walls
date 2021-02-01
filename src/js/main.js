
window.addEventListener("load", function(event) {

  "use strict";

  let keyDownHandler = (event) => {

    controller.keyDownHandler(event.keyCode);

  };

  let keyUpHandler = (event) => {

    controller.keyUpHandler(event.keyCode);

  };

  let resize = () => {

    display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.height / game.width);
    display.render();

  };

  let renderMenu = () => {
    display.drawRect(0, 0, game.width, game.height, game.backgroundColor);
    display.renderBricks(game.bricks, game.brickWidth, game.brickHeight, game.brickColors);

    display.drawText('60px', 'Arial', 'yellow', 'BREAKING WALLS', 130, 250);
    display.drawText('25px', 'Arial', 'YELLOW', 'PRESS ENTER/START', 280, 400);

  }

  let renderGame = () => {
    display.fill(game.backgroundColor);

    display.drawRect(
      game.paddle.x,
      game.paddle.y,
      game.paddle.width,
      game.paddle.height,
      game.paddle.fillColor,
    );

    display.renderBricks(game.bricks, game.brickWidth, game.brickHeight, game.brickColors);
    display.drawCircle(game.ball.x, game.ball.y, game.ball.radius, game.ball.color);

    for (var i = 0; i < game.lifes; i++) {
      display.drawCircle(23 + ( i * 25), 580, game.ball.radius, game.ball.color);
    }

    display.drawText('25px', 'Arial', 'WHITE', game.brokenBricks, 700, 590);
  }

  let renderGameOver = () => {
    display.drawRect(0, 0, game.width, game.height, 'BLACK');
    display.drawText('40px', 'Arial', 'WHITE', 'GAME OVER', 280, 300);
    display.drawText('40px', 'Arial', 'WHITE', `Broken bricks: ${game.brokenBricks}`, 10, 50);
    display.drawText('40px', 'Arial', 'WHITE', `Level: ${game.level}`, 10, 100);
    display.drawText('25px', 'Arial', 'WHITE', 'PRESS ENTER/START', 280, 400);
  }

  let render = () => {
    if (game.display_game) {
      renderGame();
    } else if (game.display_menu) {
      renderMenu();
    } else if (game.display_game_over) {
      renderGameOver();
    }

    display.render();

  };

  let update = () => {

    if (controller.left.active)  { game.paddle.moveLeft();  }
    if (controller.right.active) { game.paddle.moveRight(); }
    if (controller.start.active) { game.pressStart(); controller.start.setActive(false); }
    if (controller.space.active) { game.changeBackgroundColor(); controller.space.setActive(false); }

    game.update();

  };

  let controller = new Controller();
  let display    = new Display(document.querySelector("canvas"));
  let game       = new Game();
  let engine     = new Engine(1000/60, render, update);

  display.buffer.canvas.height = game.height;
  display.buffer.canvas.width = game.width;

  window.addEventListener("keydown", keyDownHandler);
  window.addEventListener("keyup", keyUpHandler);
  window.addEventListener("gamepadconnected", (event) => {controller.handleGamepadConnected(event)});
  window.addEventListener("gamepaddisconnected", (event) => {controller.handleGamepadDisconnected(event)});
  window.addEventListener("resize", resize);

  resize();

  engine.start();

  let music = new Audio('./media/sound/music.mp3');
  music.loop = true;
  music.play();

});
