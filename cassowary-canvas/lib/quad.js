import c from "cassowary";
import Point from "./point";

const {GEQ, LEQ, Inequality, Expression, Equation, Variable} = c;

function ineqConst(solver, v1, op, v2) {
  solver.addConstraint(new Inequality(v1, op, v2));
}

function constrainMidPoint(solver, p1, p2, mp) {
  const xExpr = new Expression(p1.x).plus(p2.x).divide(2);
  const yExpr = new Expression(p1.y).plus(p2.y).divide(2);

  solver.addConstraint(new Equation(mp.x, xExpr))
        .addConstraint(new Equation(mp.y, yExpr));
}

class Quad {
  constructor({
      topLeft=new Point(0, 0, "top-left"), 
      topRight=new Point(0, 0, "top-right"), 
      bottomLeft=new Point(0, 0, "bottom-left"), 
      bottomRight=new Point(0, 0, "bottom-right")
    }={}) {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;

    this.top = new Point(0, 0, "top");
    this.bottom = new Point(0, 0, "bottom");
    this.left = new Point(0, 0, "left");
    this.right = new Point(0, 0, "right");

    this.vCenter = new Point(0, 0, "v-center");
    this.hCenter = new Point(0, 0, "h-center");
    this.center = new Point(0, 0, "center");
  }

  get corners() {
    return [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight];
  }

  get sides() {
    return [this.top, this.bottom, this.left, this.right];
  }

  get points() {
    return [...this.sides, ...this.corners];
  }

  constrain(solver, {cornerStrength}={}) {
    const {topLeft, bottomLeft, topRight, bottomRight, top, bottom, left, right, vCenter, hCenter, center, radius} = this;
    // constrain corners to be stationary (if possible)
    this.corners.forEach((point) => {
      solver.addStay(point.x, cornerStrength);
      solver.addStay(point.y, cornerStrength);
    });

    // constrain midpoints to be dependent upon their corners
    constrainMidPoint(solver, topLeft, topRight, top);
    constrainMidPoint(solver, bottomLeft, bottomRight, bottom);
    constrainMidPoint(solver, topLeft, bottomLeft, left);
    constrainMidPoint(solver, topRight, bottomRight, right);

    constrainMidPoint(solver, top, bottom, vCenter);
    constrainMidPoint(solver, left, right, hCenter);
    solver.addConstraint(new Equation(center.x, hCenter.x))
          .addConstraint(new Equation(center.y, vCenter.y));

    // keep top corners from passing bottom corners and left corners from passing right corners
    ineqConst(solver, c.plus(topLeft.x, 20), LEQ, topRight.x); // (topLeft.x + 20) <= topRight.x
    ineqConst(solver, c.plus(topLeft.x, 20), LEQ, bottomRight.x); // (topLeft.x + 20) <= bottomRight.x
    ineqConst(solver, c.plus(bottomLeft.x, 20), LEQ, topRight.x); // (bottomLeft.x + 20) <= topRight.x
    ineqConst(solver, c.plus(bottomLeft.x, 20), LEQ, bottomRight.x); // (bottomLeft.x + 20) <= bottomRight.x
    ineqConst(solver, c.plus(topLeft.y, 20), LEQ, bottomLeft.y); // (topLeft.y + 20) <= bottomLeft.y
    ineqConst(solver, c.plus(topLeft.y, 20), LEQ, bottomRight.y); // (topLeft.y + 20) <= bottomRight.y
    ineqConst(solver, c.plus(topRight.y, 20), LEQ, bottomLeft.y); // (topRight.y + 20) <= bottomLeft.y
    ineqConst(solver, c.plus(topRight.y, 20), LEQ, bottomRight.y); // (topRight.y + 20) <= bottomRight.y
  }

  draw(context, {fillStyle="#FFF"}={}) {
    const {topLeft, topRight, bottomLeft, bottomRight, top, bottom, left, right, vCenter, hCenter, center} = this;
    context.save();
    context.fillStyle = fillStyle;
    context.strokeStyle = "#000";
    context.beginPath();
    context.moveTo(topLeft.x.value, topLeft.y.value);
    context.lineTo(topRight.x.value, topRight.y.value);
    context.lineTo(bottomRight.x.value, bottomRight.y.value);
    context.lineTo(bottomLeft.x.value, bottomLeft.y.value);
    context.lineTo(topLeft.x.value, topLeft.y.value);
    context.fillStyle = fillStyle;
    //context.stroke();
    context.fill();
    context.restore();

    //context.beginPath();
    //context.moveTo(top.x.value, top.y.value);
    //context.lineTo(right.x.value, right.y.value);
    //context.lineTo(bottom.x.value, bottom.y.value);
    //context.lineTo(left.x.value, left.y.value);
    //context.lineTo(top.x.value, top.y.value);
    //context.stroke();

    //context.beginPath();
    //context.arc(center.x.value, center.y.value, 20, 0, Math.PI * 2);
    //context.stroke();
  }
}

export default Quad;
