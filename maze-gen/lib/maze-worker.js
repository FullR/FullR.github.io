export default mazeWorker;

// This function is run in a worker thread
function mazeWorker({width = 50, height = 50, maxBranchLength = 0, enableLoops = false}, callback) {
    const children = [];
    let i;
    let branchLength;
    let openNodes;
    let child;

    const grid = range(0, height + 1).map((y) => {
        return range(0, width + 1).map((x) => {
            return {
                x, y,
                children: [],
                parent: null
            };
        })
    });

    const nodes = grid.reduce((nodes, row) => nodes.concat(row), []);

    if(typeof maxBranchLength !== "number" || maxBranchLength <= 0) {
        maxBranchLength = Infinity;
    }

    nodes.forEach((node) => {
        node.neighbors = getNeighbors(node);
    });

    addWalls();
    openNodes = getOpenNodes();
    while(openNodes.length) {
        child = sample(openNodes);
        while(child && !child.neighbors.some(notConnected)) {
            child = child.parent;
        }
        if(child) {
            for(i = 0; i < maxBranchLength && child.neighbors.some(notConnected); i++) {
                child = connectNode(child);
            }
        }
        else {
            openNodes = getOpenNodes();
            continue;
        }
    }

    // Only send required data back to main thread
    callback(nodes.map(({x, y, children}) => {
        return {x, y, children};
    }));

    // Functions
    function getNode(x, y) {
        return grid[y] ? grid[y][x] : null;
    }

    function addWalls() {
        let x;
        let y;
        
        for(x = 0; x < width; x++) {
            connect(getNode(x, 0), getNode(x + 1, 0));
            connect(getNode(x, height), getNode(x + 1, height));
        }
        
        for(y = 0; y < height; y++) {
            connect(getNode(0, y), getNode(0, y + 1));
            connect(getNode(width, y), getNode(width, y + 1));
        }
    }

    function range(a, b) {
        let r = [];
        while(a < b) {
            r.push(a);
            a++;
        }
        return r;
    }

    function sample(arr) {
        return arr[Math.floor(arr.length * Math.random())];
    }

    function getNeighbors({x, y}) {
        return [
            getNode(x, y-1),
            getNode(x, y+1),
            getNode(x-1, y),
            getNode(x+1, y)
        ].filter(function(v) {
            return !!v;
        });
    }

    function connectNode(node) {
        const child = sample(node.neighbors.filter(notConnected));
        connect(node, child);
        return child;
    }
    
    function connect(parent, child) {
        parent.children.push({x: child.x, y: child.y});
        child.parent = parent;
        children.push(child);
    }

    function getOpenNodes() {
        const _nodes = enableLoops ? nodes : children;
        return _nodes.filter((node) => node.neighbors.some(notConnected));
    }

    function notConnected(node) {
        return !node.parent && !node.children.length;
    }
}