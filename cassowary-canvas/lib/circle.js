import {Variable} from "cassowary";
const TAU = Math.PI * 2;

class Circle {
  constructor({center, radius}) {
    this.center = center;
    this.radius = typeof radius === "number" ? new Variable({value: radius, name: "radius"}) : radius;
  }

  render(context) {
    const {center, radius} = this;
    const {x, y} = center;
    context.beginPath();
    context.arc(x.value, y.value, radius.value, 0, TAU);
    context.stroke();
  }
}

export default Circle;
