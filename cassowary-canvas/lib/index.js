import c from "cassowary";
import _ from "lodash";

import Point from "./point";
import Quad from "./quad";
import Rect from "./rect";

const {Inequality, SimplexSolver, Equation, Expression, Strength, LEQ, GEQ} = c;
const {weak, medium, strong, required} = c.Strength;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const solver = new SimplexSolver();

canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

function constrain(...constraints) {
  constraints.forEach((constraint) => this.addConstraint(constraint));
  return this;
}

function leq(b, strength, weight) {
  return new Inequality(this, LEQ, b, strength, weight);
}
function geq(b, strength, weight) {
  return new Inequality(this, LEQ, b, strength, weight);
}
function eq(b, strength, weight) {
  return new Equation(this, b, strength, weight);
}
function plus(b) { 
  return c.plus(this, b);
}
function minus(b) { 
  return c.minus(this, b);
}
function times(b) { 
  return c.times(this, b);
}
function over(b) { 
  return c.divide(this, b);
}

const frame = new Rect({
  solver,
  topLeft: new Point(0, 0, "canvas-top-left"),
  width: canvas.width,
  height: canvas.height,
  style: {
    fillStyle: "#333"
  }
});

const homeButton = new Rect({
  solver,
  width: 100,
  height: 100,
  style: {
    fillStyle: "#0F0"
  }
});

const choiceContainer = new Rect({
  solver,
  height: 150,
  style: {
    fillStyle: "#00F"
  }
});

const choices = [
  new Rect({ solver,
    style: {fillStyle: color()}
  }),
  new Rect({ solver,
    style: {fillStyle: color()}
  }),
  new Rect({ solver,
    style: {fillStyle: color()}
  })
];

const margin = 25;//choiceContainer.width::over(20);
solver.add(
  homeButton.bottomLeft.x::eq(frame.bottomLeft.x::plus(25)),
  homeButton.bottomLeft.y::eq(frame.bottomLeft.y::minus(25)),
  choiceContainer.center.x::eq(frame.center.x),
  choiceContainer.bottomLeft.x::geq(homeButton.right.x, weak),
  //choiceContainer.bottomRight.x::leq(frame.bottomRight.x::minus(homeButton.right.x), medium),
  choiceContainer.bottomLeft.y::eq(frame.bottom.y::minus(150))
);

choices.forEach((choice) => {
  solver.add(
    choice.width::eq(choiceContainer.width::minus(margin::times(choices.length + 1))::over(choices.length)),
    choice.height::eq(choiceContainer.height::times(0.8)),
    choice.center.y::eq(choiceContainer.center.y)
  );
});

solver.add(
  choices[0].left.x::eq(choiceContainer.left.x::plus(margin))
);

choices.reduce((prev, cur) => {
  solver.add(
    cur.left.x::eq(prev.right.x::plus(margin))
  );
  return cur;
});

console.log(_.invoke(choices, "toString"));

window.addEventListener("resize", (event) => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  canvas.width = width;
  canvas.height = height;
  solver
    .addEditVar(frame.width)
    .addEditVar(frame.height)
    .beginEdit();

  solver
    .suggestValue(frame.width, width)
    .suggestValue(frame.height, height)
    .resolve();

  solver.endEdit();
  console.log(frame.toString());
});


function draw() {
  frame.render(context);
  homeButton.render(context);
  choiceContainer.render(context);
  choices.forEach((choice) => choice.render(context));
  requestAnimationFrame(draw);
}

function color(h=(Math.random() * 360), s=80, l=80) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function rand(bottom=0, top=100) {
  return Math.floor(bottom + (Math.random() * (top - bottom)));
}

function chain(rects, sourceCKey, targetCKey, startPoint) {
  if(startPoint) {
    this.add(
      rects[0][sourceCKey].x::eq(startPoint.x),
      rects[0][sourceCKey].y::eq(startPoint.y)
    );
  }

  rects.reduce((prev, rect) => {
    this.add(
      rect[sourceCKey].x::eq(prev[targetCKey].x),
      rect[sourceCKey].y::eq(prev[targetCKey].y)
    );
    return prev;
  });

  return this;
}

draw();
