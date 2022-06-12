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
let darkMode = false;
let pointX = 0;
let pointY = 0;



const glider = 
`..O
O.O
.OO`

const gosperGliderGun =
`........................O...........
......................O.O...........
............OO......OO............OO
...........O...O....OO............OO
OO........O.....O...OO..............
OO........O...O.OO....O.O...........
..........O.....O.......O...........
...........O...O....................
............OO......................`