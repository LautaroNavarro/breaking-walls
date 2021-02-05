
class ButtonInput {
  active = false;
  individual_clicks = false;
  enabled_click = true;

  constructor (individual_clicks) {
    if (individual_clicks) {
      this.individual_clicks = individual_clicks;
    }
  }

  setActive (down) {
    if (this.individual_clicks) {
      if (down) {
        if (this.enabled_click) {
          this.active = down;
          this.enabled_click = false;
        }
      } else {
        if (this.active == false) {
          this.enabled_click = true;
        }
        this.active = down;
      }
    } else {
      this.active = down;
    }


  }

}


class Controller {

  gamePadIndex = null;
  space = new ButtonInput(true);
  left = new ButtonInput();
  right = new ButtonInput();
  start = new ButtonInput(true);
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
