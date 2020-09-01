
// variables declared

let originalGrid;
let userGrid;

let presetMaker;

let preset1;
let preset2;
let preset3;

let playing = false;

let myTimeOut;
let timer = 0;

let speed = 1000;

let cols = 40;
let rows = 40;

// creating 2d array - 2d array for next evolution - preset arrays - random arrays

function create2dArray(height, width) {
    let currGrid = new Array(height).fill(null).map(() => new Array(width).fill(0));
    return currGrid;
}

function createNext2dArray(array) {
    let next2dArray = array.map(arr => [...arr]);
    return next2dArray
}

function createPresetArrays(array) {
    preset1 = array.map(arr => [...arr]);
    preset2 = array.map(arr => [...arr]);
    preset3 = array.map(arr => [...arr]);
        for(let col = 0; col < preset1.length; col++){
            for(let row = 0; row < preset1.length; row++){
                preset1[row][col] = Math.floor(Math.random() * 2)
                preset2[row][col] = Math.floor(Math.random() * 2)
                preset3[row][col] = Math.floor(Math.random() * 2)
            }
        }
}

function createRandomArray(array) {
    random = array.map(arr => [...arr]);

    for(let col = 0; col < preset1.length; col++){
        for(let row = 0; row < preset1.length; row++){
            random[row][col] = Math.floor(Math.random() * 2);
        }
    }
    return random;
}

let grid = create2dArray(cols, rows)
let secondGrid = createNext2dArray(grid)
presetMaker = createPresetArrays(grid)

// create grid and other html elements

function createGrid () {
    let container = document.querySelector(".container") // grab container div from html

    let table = document.createElement("table"); // create a table
    table.setAttribute('id', 'grid') // set table id to 'grid'

    for (let i = 0; i < rows; i++ ) { // for loop to create table rows
        let row = document.createElement("tr") // create rows
        for(let j = 0; j < cols; j++) { // for loop to create cells 
            let cell = document.createElement("td") // create cells
            cell.setAttribute('id', i + "-" + j)
            cell.setAttribute('class', 'dead')
            cell.addEventListener("click", handleClick)
            row.appendChild(cell) // append each cell to rows
        }
        table.appendChild(row) // append rows to table
    }
    container.appendChild(table) // append table to container div
}

let container = document.querySelector(".container"); // grab container div from html

let startButton = document.createElement("BUTTON")
startButton.textContent = "Start";
startButton.addEventListener('click', buttonClick)
container.appendChild(startButton);

let stepStart = document.createElement("BUTTON")
stepStart.textContent = "Step";
stepStart.addEventListener('click', stepButton)
container.appendChild(stepStart);

let resetButton = document.createElement("BUTTON")
resetButton.textContent = "Reset";
resetButton.addEventListener('click', resetClick);
container.appendChild(resetButton);

let pauseButton = document.createElement("BUTTON");
pauseButton.textContent = "Pause";
pauseButton.addEventListener('click', pauseClick);
container.appendChild(pauseButton);

let preset1Button = document.createElement("BUTTON");
preset1Button.textContent = "preset1";
preset1Button.addEventListener('click', presetClick);
container.appendChild(preset1Button);

let preset2Button = document.createElement("BUTTON");
preset2Button.textContent = "preset2";
preset2Button.addEventListener('click', presetClick);
container.appendChild(preset2Button);

let preset3Button = document.createElement("BUTTON");
preset3Button.textContent = "preset3";
preset3Button.addEventListener('click', presetClick);
container.appendChild(preset3Button);

let randomButton = document.createElement("BUTTON");
randomButton.textContent = "random";
randomButton.addEventListener('click', presetClick);
container.appendChild(randomButton);

let speedInput = document.createElement("INPUT");
speedInput.setAttribute("type", "number");
speedInput.setAttribute('id', "changeSpeedInput");
speedInput.setAttribute("min", "1");
speedInput.setAttribute("max", "11");
speedInput.setAttribute("value", "1")
let speedButton = document.createElement("BUTTON");
speedButton.textContent = "Speed";
speedButton.addEventListener('click', changeSpeed);
container.appendChild(speedInput);
container.appendChild(speedButton);

let sizeInput = document.createElement("INPUT");
sizeInput.setAttribute("type", "number");
sizeInput.setAttribute('id', "changeSizeInput");
sizeInput.setAttribute("min", "10");
sizeInput.setAttribute("max", "120");
sizeInput.setAttribute("value", "40");
let sizeButton = document.createElement("BUTTON");
sizeButton.textContent = "Size";
sizeButton.addEventListener('click', changeSize);
container.appendChild(sizeInput);
container.appendChild(sizeButton);

let timerh1 = document.getElementById("timerh1");

// function to determine next evolution of array

function next2dArray(grid) {
    for(let col = 0; col < grid.length; col++){
        for(let row = 0; row < grid.length; row++){
            let cell = grid[col][row];
            let count = 0;
            for(let i = -1; i < 2; i++){
                for(let j = -1; j < 2; j++){
                    if(i === 0 && j ===0) {
                        continue;
                    }

                    // handling borders of grid - wrap around using modulus (handles -1 value)

                    const colWrap = (col + i + cols) % cols;
                    const rowWrap = (row + j + rows) % rows;

                    count += grid[colWrap][rowWrap];

                    // rules for game

                    if (cell === 1 && count === 2 || count === 3) {
                        secondGrid[col][row] = 1;
                    } else if (cell === 0 && count === 3) {
                        secondGrid[col][row] = 1;
                    } else {
                        secondGrid[col][row] = 0;
                    }
                }
            }
        }
    }

}

// swap original array and next evolution array - reset second array to 0s

function swapGrids() {    
    for (row in grid) {
        for (col in grid[row]) {
            grid[row][col] = secondGrid[row][col];
            secondGrid[row][col] = 0;
        }
    }
}

// populate html grid with next2darray function values

function populateGrid() {
    let cell='';
    for(let col = 0; col < grid.length; col++){
        for(let row = 0; row < grid.length; row++){
            cell = document.getElementById(row + '-' + col);
            if (grid[row][col] == 0) {
                cell.setAttribute('class', 'dead');
            } else {
                cell.setAttribute('class', 'alive');
            }
        }
    }
}

// run game of life and hanlde the count of evolutions

function evolve(){
    next2dArray(grid);
    swapGrids();
    populateGrid();

    myTimeOut = setTimeout(evolve, speed);
    if (myTimeOut) {
        timer += 1;
        timerh1.innerHTML= `${timer}`;
    }

}

// handle click of cells on grid (dead / alive)

function handleClick() {
    if (playing == false) {
        let location = this.id.split("-");
        let row = Number(location[0]);
        let col = Number(location[1]);
        if (this.className==='alive'){
            this.setAttribute('class', 'dead');
            grid[row][col] = 0;
        }else{
            this.setAttribute('class', 'alive');
            grid[row][col] = 1;
        }
    } else {
        null;
    }   
}

// start button

function buttonClick() {
    if (playing) {
        return null;
    }

    playing = true;

    evolve();
}

// step through evolutions manually

function stepButton(event) {
    playing = false;
    if (MouseEvent) {
        timer += 1;
        timerh1.innerHTML= `${timer}`;
    }
    clearTimeout(myTimeOut);
    next2dArray(grid);
    swapGrids();
    populateGrid();
}

// reset page

function resetClick() {
    location.reload();
}

// pause evolutions

function pauseClick() {
    playing = false;
    clearTimeout(myTimeOut);
}

// set preset or random grid

function presetClick(event) {
    if(event.target.textContent.includes("1")) {
        clearTimeout(myTimeOut);
        timer = 0;
        timerh1.innerHTML= `${timer}`;
        for (row in grid) {
            for (col in grid[row]) {
                grid[row][col] = preset1[row][col];
                secondGrid[row][col] = 0;
                populateGrid();
            }
        }
    } else if (event.target.textContent.includes("2")) {
        clearTimeout(myTimeOut);
        timer = 0;
        timerh1.innerHTML= `${timer}`;
        for (row in grid) {
            for (col in grid[row]) {
                grid[row][col] = preset2[row][col];
                secondGrid[row][col] = 0;
                populateGrid();
            }
        }
    } else if (event.target.textContent.includes("3")) {
        clearTimeout(myTimeOut);
        timer = 0;
        for (row in grid) {
            for (col in grid[row]) {
                grid[row][col] = preset3[row][col];
                secondGrid[row][col] = 0;
                populateGrid();
            }
        }
    } else {
        clearTimeout(myTimeOut);
        timer = 0;
        timerh1.innerHTML= `${timer}`;
        createRandomArray(grid);
        for (row in grid) {
            for (col in grid[row]) {
                grid[row][col] = random[row][col];
                secondGrid[row][col] = 0;
                populateGrid();
            }
        }

    } 
}

// change speed of evolutions

function changeSpeed() {
    let input = Number(document.getElementById("changeSpeedInput").value);
    speedValues = {
        11: 0.05,
        10: 0.09,
        9: 0.1,
        8: 0.2,
        7: 0.3,
        6: 0.4,
        5: 0.5,
        4: 0.6,
        3: 0.7,
        2: 0.8,
        1: 1,
    }
            
    for (let [key, value] of Object.entries(speedValues)) {
        if(input == key) {
            speed = 1000 * value;
        }
    }
}

// change size of grid

function changeSize() {
    playing = false;
    let input = Number(document.getElementById("changeSizeInput").value);
    if (input == 0) {
        return null;
    }
    cols =  input;
    rows = input;
    clearTimeout(myTimeOut);
    timer = 0;
    timerh1.innerHTML= `${timer}`;

    userArray = create2dArray(input, input);
    grid = userArray;
    secondGrid = createNext2dArray(grid);

    userGrid = createGrid();
    userGrid = originalGrid;
    document.getElementById("grid").remove();

    next2dArray(grid);
    swapGrids();
    populateGrid();
    userPreset = createPresetArrays(grid);
    presetMaker = userPreset;

}

// load grid 

window.onload = loadGrid(); // load grid to page onload

function loadGrid () {
    originalGrid = createGrid();
}

