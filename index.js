
let preset1;
let preset2;
let preset3;

let playing = false;
let myTimeOut;
let speed = 1000;

cols = 40
rows = 40

function create2dArray() {
    let currGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
        for(let col = 0; col < currGrid.length; col++){
            for(let row = 0; row < currGrid.length; row++){
                const cell = currGrid[row][col]
            }
        }
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

const grid = create2dArray()
const secondGrid = createNext2dArray(grid)
createPresetArrays(grid)

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
            // cell.setAttribute('playing', 'false')
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

let resetButton = document.createElement("BUTTON")
resetButton.textContent = "Reset";
resetButton.addEventListener('click', resetClick)
container.appendChild(resetButton);

let pauseButton = document.createElement("BUTTON")
pauseButton.textContent = "Pause";
pauseButton.addEventListener('click', pauseClick)
container.appendChild(pauseButton);

let preset1Button = document.createElement("BUTTON")
preset1Button.textContent = "preset1";
preset1Button.addEventListener('click', presetClick)
container.appendChild(preset1Button);

let preset2Button = document.createElement("BUTTON")
preset2Button.textContent = "preset2";
preset2Button.addEventListener('click', presetClick)
container.appendChild(preset2Button);

let preset3Button = document.createElement("BUTTON")
preset3Button.textContent = "preset3";
preset3Button.addEventListener('click', presetClick)
container.appendChild(preset3Button);

let randomButton = document.createElement("BUTTON")
randomButton.textContent = "random";
randomButton.addEventListener('click', presetClick)
container.appendChild(randomButton);

let speedInput = document.createElement("INPUT")
speedInput.setAttribute("type", "number");
speedInput.setAttribute('id', "changeSpeedInput");
speedInput.setAttribute("min", "1")
speedInput.setAttribute("max", "11")
let speedButton = document.createElement("BUTTON")
speedButton.textContent = "Speed";
speedButton.addEventListener('click', changeSpeed)
container.appendChild(speedInput);
container.appendChild(speedButton);



function next2dArray(grid) {
    for(let col = 0; col < grid.length; col++){
        for(let row = 0; row < grid.length; row++){
            let count = 0
            for(let i = -1; i < 2; i++){
                for(let j = -1; j < 2; j++){
                    if(i === 0 && j ===0) {
                        continue;
                    }
                    const colWrap = (col + i + cols) % cols;
                    const rowWrap = (row + j + rows) % rows;

                    count += grid[colWrap][rowWrap]

                    if (cell = 0) {
                        if (count == 3) {
                            secondGrid[col][row] = 1
                        }
                    } else {
                        if (count == 2 || count == 3) {
                            secondGrid[col][row] = 1
                        } else {
                            secondGrid[col][row] = 0
                        }
                    }
                }
            }
        }
    }

}

function swapGrids() {    
    for (row in grid) {
        for (col in grid[row]) {
            grid[row][col] = secondGrid[row][col];
            secondGrid[row][col] = 0;
        }
    }
}

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

function evolve(){
    next2dArray(grid);
    swapGrids();
    populateGrid();

    myTimeOut = setTimeout(evolve, speed);
}

function handleClick() {
    if (playing == false) {
        let location = this.id.split("-")
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

function buttonClick () {
    playing = true;
    // table = document.getElementById("grid");
    // rows = table.getElementsByTagName("tr")
    // tds = null;
    // for (let i = 0; i < rows.length; i++ ) { // for loop to create table rows
    //     tds = rows[i].getElementsByTagName("td")
    //     for(let j = 0; j < tds.length; j++) { // for loop to create cells 
    //         tds[j].setAttribute("playing", "true")
    //     }
    // }
    evolve()
}

function resetClick() {
    location.reload()
}

function pauseClick() {
    playing = false;
    clearTimeout(myTimeOut)
}

function presetClick(event) {
    if(event.target.textContent.includes("1")) {
        clearTimeout(myTimeOut)
        for (row in grid) {
            for (col in grid[row]) {
                grid[row][col] = preset1[row][col];
                secondGrid[row][col] = 0;
                populateGrid()
            }
        }
    } else if (event.target.textContent.includes("2")) {
        clearTimeout(myTimeOut);
        for (row in grid) {
            for (col in grid[row]) {
                grid[row][col] = preset2[row][col];
                secondGrid[row][col] = 0;
                populateGrid()
            }
        }
    } else if (event.target.textContent.includes("3")) {
        clearTimeout(myTimeOut);
        for (row in grid) {
            for (col in grid[row]) {
                grid[row][col] = preset3[row][col];
                secondGrid[row][col] = 0;
                populateGrid()
            }
        }
    } else {
        clearTimeout(myTimeOut);
        createRandomArray(grid);
        for (row in grid) {
            for (col in grid[row]) {
                grid[row][col] = random[row][col];
                secondGrid[row][col] = 0;
                populateGrid()
            }
        }

    } 
}

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
            speed = 1000 * value
        }
    }

}

window.onload = loadGrid() // load grid to page onload

function loadGrid () {
    createGrid()
}

