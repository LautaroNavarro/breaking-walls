
class ButtonInput {
  active = false;

  setActive (down) {

    this.active = down;

  }

}


class Controller {

  gamePadIndex = null;
  space = new ButtonInput();
  left = new ButtonInput();
  right = new ButtonInput();
  start = new ButtonInput();
  updateLoop = null;
  keyMapping = {
    32: this.space,
    37: this.left,
    39: this.right,
    13: this.start,
  }
  gamePadMapping = {
    0: this.space,
    14: this.left,
    15: this.right,
    9: this.start,
  }

  constructor () {
    this.updateLoop = window.requestAnimationFrame(() => {
      this.update();
    });
  }

  update () {
    if (this.gamePadIndex != null) {
      console.log(this.gamePadIndex);
      for (let key in this.gamePadMapping) {
        if (navigator.getGamepads()[this.gamePadIndex].buttons.length > key) {
          this.gamePadMapping[key].setActive(
            navigator.getGamepads()[this.gamePadIndex].buttons[key].pressed
          );
        }
      }
    }

    this.updateLoop = window.requestAnimationFrame(() => this.update());
  }

  vibrate () {
    if (this.gamePadIndex != null) {
      navigator.getGamepads()[this.gamePadIndex].vibrationActuator.playEffect(
        'dual-rumble',
        {
          startDelay: 0,
          duration: 200,
          weakMagnitude: 0.1,
          strongMagnitude: 1
        }
      );
    }
  }

  handleGamepadConnected (event) {
    if (this.gamePadIndex == null) {
      this.gamePadIndex = event.gamepad.index;
    }
  }

  handleGamepadDisconnected(event) {
    if (this.gamePadIndex == event.gamepad.index) {
      this.gamePadIndex = null;
    }
  }

  keyDownHandler (key_code) {
    if (this.keyMapping[key_code]) {
      this.keyMapping[key_code].setActive(true);
    }

  };

  keyUpHandler (key_code) {

    if (this.keyMapping[key_code]) {
      this.keyMapping[key_code].setActive(false);
    }

  };

}
