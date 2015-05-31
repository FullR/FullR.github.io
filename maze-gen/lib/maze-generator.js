import _ from "lodash";
import cw from "catiline";
import mazeWorker from "./maze-worker";

export default maze;

function Maze(nodes, _config) {
    this.nodes = nodes;
    this._config = _config;
}

_.extend(Maze.prototype, {
    toCanvas(canvasWidth, canvasHeight, canvas = document.createElement("canvas"), context = canvas.getContext("2d")) {

        const {width, height, entrance, exit} = this._config;
        const nodes = this.nodes;
        const nodeWidth = (canvasWidth - 1) / width;
        const nodeHeight = (canvasHeight - 1) / height;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        context.lineWidth = 1;
        context.lineCap = "butt";
        context.strokeStyle = "#000000";
        context.fillStyle = "#FFFFFF";
        context.translate(0.5, 0.5);
        context.beginPath();

        nodes.forEach((node) => {
            node.children.forEach((child) => {
                let cx = 0;
                let cy = 0;
                // don't draw exit/entrance
                // TODO: move this logic into the maze generation
                if(vecEqual([node, child], entrance) || 
                    vecEqual([node, child], exit)) {
                    return;
                }

                // minor pixel offset so lines connect nicely
                if(node.x > child.x) {
                    cx = -0.5;
                }
                else if(node.x < child.x) {
                    cx = 0.5;
                }

                if(node.y > child.y) {
                    cy = -0.5;
                }
                else if(node.y < child.y) {
                    cy = 0.5;
                }

                context.moveTo((node.x * nodeWidth) - cx, (node.y * nodeHeight) - cy);
                context.lineTo((child.x * nodeWidth) + cx, (child.y * nodeHeight) + cy);
            });
        });
        
        context.stroke();
        return canvas;
    }
});

function maze(_config) {
    console.time("Generated maze");
    return cw(mazeWorker).data(_config).then((nodes) => {
        console.timeEnd("Generated maze");
        return new Maze(nodes, _config);
    });

}

function pointsEqual(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

function vecEqual([p1, p2], [p3, p4]) {
    return (pointsEqual(p1, p3) && pointsEqual(p2, p4)) ||
        (pointsEqual(p1, p4) && pointsEqual(p2, p3));
}
