import React from "react";

function getKeyChar(event) {
  return String.fromCharCode(event.keyCode || event.charCode);
}

export default function keyboardListener(Parent) {
  return class KeyboardListener extends Parent {
    constructor(props) {
      super(props);
      this._onKeyDown = this._onKeyDown.bind(this);
      this._onKeyUp = this._onKeyUp.bind(this);
      this._onKeyPress = this._onKeyPress.bind(this);

      window.addEventListener("keydown", this._onKeyDown);
      window.addEventListener("keyup", this._onKeyUp);
      window.addEventListener("keypress", this._onKeyPress);
    }

    componentWillUnmount() {
      window.removeEventListener("keydown", this._onKeyDown);
      window.removeEventListener("keyup", this._onKeyUp);
      window.removeEventListener("keypress", this._onKeyPress);
    }

    _onKeyDown(event) {
      if(this.onKeyDown) {
        this.onKeyDown(event);
      }
    }

    _onKeyUp(event) {
      if(this.onKeyUp) {
        this.onKeyUp(event);
      }
    }

    _onKeyPress(event) {
      if(this.onKeyPress) {
        this.onKeyPress(event);
      }
    }
  };
}
