function setup() {
    const canvas = createCanvas(windowWidth - 310, windowHeight-200);
    // const canvas = createCanvas(800,800);
    canvas.parent(document.querySelector('#canvas'));
    // background(255);
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    init();
}

function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }
}

function draw() {
    // background(255);
    frameRate(fr);
    generate();
    

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] === 1) {
                fill(state1.color);
            } else if (nextBoard[i][j] === 1) {
                fill(state2.color);
            } else {
                fill(backColor);
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}

function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < loneliness) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > overpopulation) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == newLife) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }
        }
    }


    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

/**
 * When mouse is dragged
 */
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill(state1.color);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

function mousePressed() {
    noLoop();
    mouseDragged();
}

// function mouseReleased() {
//     loop();
// }

function updateUI() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] === 1) {
                fill(state1.color);
            } else {
                fill(backColor);
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}

document.querySelector(".startButton").addEventListener('click', () => {
    loop();
});

document.querySelector(".stopButton").addEventListener('click', () => {
    noLoop();
});

document.querySelector(".resetButton").addEventListener('click', () => {
    init();
    loop();
});

document.querySelector("#sliderRange").addEventListener('change', () => {
    demo.innerHTML = sliderRange.value;
    fr = parseInt(sliderRange.value);
});

let changeBoxColors = document.querySelector("#boxColors");
changeBoxColors.addEventListener("change", () => {
    state1.color = boxColors.value;
});


function dol() {
    loneliness = parseInt(diesOfLoneliness.value);
};

document.querySelector("#diesOfLoneliness").addEventListener('change', () => {
    dol()
});

function doo() {
    overpopulation = parseInt(dieOfOverpopulation.value);
};

document.querySelector("#dieOfOverpopulation").addEventListener('change', () => {
    doo()
});

function nlr() {
    newLife = parseInt(newLifeReproduction.value);
};

document.querySelector("#newLifeReproduction").addEventListener('change', () => {
    nlr()
});


function randomBoard() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let isLive = Math.round(Math.random());
            if (isLive == 1 && (currentBoard[i][j] = 1)) {
                fill(state1.color);
                stroke(strokeColor);
                rect(i * unitLength, j * unitLength, unitLength, unitLength);
            }
        }
    }
}

document.querySelector(".randomButton").addEventListener('click', () => {
    randomBoard()
});

function darkModeOff() {
    if (darkMode) {
        backColor = "black";
        strokeColor = "green";
        state1.color = "#ffffff";
    } if (!darkMode) {
        backColor = "white";
        strokeColor = "black";
        state1.color = "#00ff09";
    }
    updateUI()
}

document.querySelector(".form-check-input").addEventListener('change', () => {
    darkMode = !darkMode;
    darkModeOff()
});

document.querySelector(".addPattern1").addEventListener('click', () => {
    newPattern = glider;
    addPattern(inPutPointX, inPutPointY)
});

document.querySelector(".addPattern2").addEventListener('click', () => {
    newPattern = gosperGliderGun;
    addPattern(inPutPointX, inPutPointY)
});

document.querySelector("#pointX").addEventListener('change', () => {
    inPutPointX = parseInt(pointX.value);
});

document.querySelector("#pointY").addEventListener('change', () => {
    inPutPointY = parseInt(pointY.value);
});

function addPattern(inPutPointX, inPutPointY) {
    let newPatternArr = newPattern.split("\n");
    for (let i = 0; i < newPatternArr.length; i++) {
        for (let j = 0; j < newPatternArr[i].length; j++) {
            currentBoard[inPutPointX + j][inPutPointY + i] = newPatternArr[i][j] === "." ? 0 : 1;
        }
    }
    updateUI();
}


window.addEventListener('keydown', function (e) {
    if (e.key === "s") {
        loop();
    }
    if (e.key === "p") {
        noLoop();
    }
    if (e.key === "c") {
        init();
        loop();
    }
    if (e.key === "r") {
        randomBoard();
    }
}, false);

function windowResized() {
    resizeCanvas(windowWidth - 310, windowHeight-200);
    init()
    updateUI()
  }