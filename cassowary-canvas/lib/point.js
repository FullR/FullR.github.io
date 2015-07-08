import {Variable} from "cassowary";

class Point {
  constructor(x, y, label) {
    this.label = label;
    this.x = new Variable({
      name: `point-${label}-x`,
      value: x
    });
    this.y = new Variable({
      name: `point-${label}-y`,
      value: y
    });
  }

  toString() {
    const {label, x, y} = this;
    return `Point(${x.value}, ${y.value}) - ${label}`;
  }
}

export default Point;
