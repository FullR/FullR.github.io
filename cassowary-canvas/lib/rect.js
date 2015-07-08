import c from "cassowary";
import _ from "lodash";
import Point from "./point";
const {Variable, Expression, Equation, Strength} = c;
const {weak} = Strength;

function maybeCVar(value) {
  if(value && typeof value === "object") {
    return value;
  } else {
    return new Variable({value: value || 0});
  }
}

function maybeCPoint(point) {
  if(point instanceof Point) {
    return point;
  }
  else if(point) return new Point(point.x, point.y);
  else return new Point(0, 0);
}

class Rect {
  constructor({
    width,
    height,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    top,
    bottom,
    left,
    right,
    center,

    style={
      fillStyle: "#FFF"
    },
    weightMap,
    solver
  } = {}) {
    this.style = style;
    this.width = maybeCVar(width);
    this.height = maybeCVar(height);

    if(!topLeft && typeof x === "number" && typeof y === "number") {
      this.topLeft = new Point(x, y);
    } else {
      this.topLeft = maybeCPoint(topLeft);
    }
    this.topLeft = maybeCPoint(topLeft);
    this.topRight = maybeCPoint(topRight);
    this.bottomLeft = maybeCPoint(bottomLeft);
    this.bottomRight = maybeCPoint(bottomRight);
    this.top = maybeCPoint(top);
    this.bottom = maybeCPoint(bottom);
    this.left = maybeCPoint(left);
    this.right = maybeCPoint(right);
    this.center = maybeCPoint(center);

    // Use passed weightmap or assume the specified parameters are required
    this.weightMap = weightMap || _.transform(arguments[0], (map, value, key) => {
      if(key) {
        map[key] = Strength.strong;
      }
    });
    if(solver) {
      this.constrain(solver);
    }
  }

  get points() {
    return [
      this.topLeft,
      this.topRight,
      this.bottomLeft,
      this.bottomRight,
      this.top,
      this.bottom,
      this.left,
      this.right,
      this.center
    ];
  }

  constrain(solver) {
    const {width, height, topLeft, topRight, bottomLeft, bottomRight, top, bottom, left, right, center, weightMap} = this;

    _.each(weightMap, (weight=weak, key) => {
      const v = this[key];
      if(v) {
        if(v instanceof Point) {
          solver.addStay(v.x, weight);
          solver.addStay(v.y, weight);
        } else {
          solver.addStay(v, weight);
        }
      }
    });

    solver
      // top right
      .addConstraint(new Equation(new Expression(topLeft.x).plus(width), topRight.x))
      .addConstraint(new Equation(topLeft.y, topRight.y))
      // bottom left
      .addConstraint(new Equation(topLeft.x, bottomLeft.x))
      .addConstraint(new Equation(new Expression(topLeft.y).plus(height), bottomLeft.y))
      // bottom right
      .addConstraint(new Equation(new Expression(topLeft.x).plus(width), bottomRight.x))
      .addConstraint(new Equation(new Expression(topLeft.y).plus(height), bottomRight.y))

      .addConstraint(new Equation(new Expression(bottomRight.x).minus(width), topLeft.x))
      .addConstraint(new Equation(new Expression(bottomRight.y).minus(height), topLeft.y))
      // identities
      .addConstraint(new Equation(topRight.x, bottomRight.x))
      .addConstraint(new Equation(topLeft.x, bottomLeft.x)) 
      .addConstraint(new Equation(bottom.x, top.x))
      .addConstraint(new Equation(left.y, right.y))
      .addConstraint(new Equation(topLeft.y, topRight.y))
      .addConstraint(new Equation(bottomLeft.y, bottomRight.y))

      // top
      .addConstraint(new Equation(
        new Expression(topLeft.x).plus(topRight.x).divide(2),
        top.x
      ))
      // bottom
      .addConstraint(new Equation(
        new Expression(bottomLeft.x).plus(bottomRight.x).divide(2),
        bottom.x
      ))
      // left
      .addConstraint(new Equation(
        new Expression(topLeft.y).plus(bottomLeft.y).divide(2),
        left.y
      ))
      // right
      .addConstraint(new Equation(
        new Expression(topRight.y).plus(bottomRight.y).divide(2),
        right.y
      ))
      // center
      .addConstraint(new Equation(
        top.x,
        center.x
      ))
      .addConstraint(new Equation(
        left.y,
        center.y
      ))
      .addConstraint(new Equation(
        topLeft.x,
        new Expression(center.x).minus(c.divide(width, 2))
      ))
      .addConstraint(new Equation(
        topLeft.y,
        new Expression(center.y).minus(c.divide(height, 2))
      ))
      .addConstraint(new Equation(
        width,
        new Expression(right.x).minus(left.x)
      ))
      .addConstraint(new Equation(
        height,
        new Expression(bottom.y).minus(top.y)
      ))
      .addConstraint(new Equation(
        width,
        new Expression(center.x).minus(left.x).times(2)
      ))
      .addConstraint(new Equation(
        width,
        new Expression(right.x).minus(center.x).times(2)
      ))
      .addConstraint(new Equation(
        height,
        new Expression(center.y).minus(top.y).times(2)
      ))
      .addConstraint(new Equation(
        height,
        new Expression(bottom.y).minus(center.y).times(2)
      ));

      return this;
  }

  render(context) {
    context.save();
    context.fillStyle = this.style.fillStyle;
    context.fillRect(this.topLeft.x.value, this.topRight.y.value, this.width.value, this.height.value);
    context.restore();
  }

  toString() {
    const {topLeft, width, height} = this;
    return `Rect (${topLeft.x.value}, ${topLeft.y.value}) [${width.value} x ${height.value}]`;
  }
}

export default Rect;