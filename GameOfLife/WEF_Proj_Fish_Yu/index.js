const unitLength = 20;
let strokeColor = "green";
let boxColor = "#ffffff";
let boxColor2 = "rgba(0,0,0,0.3)";
let strokeColors = strokeColor;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let fr = 10;
let loneliness = 2;
let overpopulation = 3;
let newLife = 3;
let backColor = 0;


function setup() {
    const canvas = createCanvas(windowWidth - 100, windowHeight - 100);
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
                fill(boxColor);
            } else if (nextBoard[i][j] === 1) {
                fill(boxColor2);
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
    fill(boxColor);
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
    boxColor = boxColors.value;
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
    console.log(overpopulation)
});

function nlr() {
    newLife = parseInt(newLifeReproduction.value);
};

document.querySelector("#newLifeReproduction").addEventListener('change', () => {
    nlr()
    console.log(newLife)
});


function randomBoard() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let isLive = Math.round(Math.random());
            if (isLive == 1 && (currentBoard[i][j] = 1)) {
                fill(boxColor);
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
    console.log("!!")
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] === 1) {
                fill(boxColor);
            } else if (nextBoard[i][j] === 1) {
                fill(boxColor2);
            } else {
                fill(backColor);
            }
            backColor = "white";
            strokeColor = "black";
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
};

document.querySelector(".form-check-input").addEventListener('click', () => {
    darkModeOff()
});