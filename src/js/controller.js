
class ButtonInput {
  active = false;
  debounce = false;
  debounce_time = null;
  last_time_pressed = 0;

  constructor (debounce, debounce_time) {
    if (debounce) {
      this.debounce = debounce;
      this.debounce_time = debounce_time;
    }
  }

  setActive (down) {
    if (down && this.debounce) {
      let now = window.performance.now()
      if (now - this.last_time_pressed > this.debounce_time) {
        this.last_time_pressed = now;
      } else {
        return null;
      }
    }

    this.active = down;

  }

}


class Controller {

  gamePadIndex = null;
  space = new ButtonInput(true, 200);
  left = new ButtonInput();
  right = new ButtonInput();
  start = new ButtonInput(true, 200);
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

  update () {
    if (this.gamePadIndex != null) {
      for (let key in this.gamePadMapping) {
        if (navigator.getGamepads()[this.gamePadIndex].buttons.length > key) {
          this.gamePadMapping[key].setActive(
            navigator.getGamepads()[this.gamePadIndex].buttons[key].pressed
          );
        }
      }
    }
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
