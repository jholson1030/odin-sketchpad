// Declaring variables for the container, rows and the individual cells

const container = document.getElementById('container');
let rows = document.getElementsByClassName('gridRow');
let cells = document.querySelectorAll('cell');
let sliderValueOutput = document.getElementById('slider-value');
// Script for the slider that controls the grid size goes here
let slider = document.getElementById('slider-options');


function makeRowsAndColumns(cellNum) {
    // Clears existing cells
    container.innerHTML = '';
    for (i = 0; i < cellNum; i++) {
        let newCell = document.createElement('div');
        newCell.className = 'cell';
        container.appendChild(newCell);
    }
}

function updateCellSize(size) {
    // Can be adjusted for desired container size
    const containerSize = 16;
    // Calculate cell size based on container size and slider value
    const cellSize = containerSize / size;
    container.style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
    container.style.gridTemplateRows = `repeat(${size}, ${cellSize}px)`;
}

slider.onimput = function () {
    const newSize = parseInt(this.value);
    // Update slider value display
    sliderValueOutput.innerHTML = newSize;
    makeRowsAndColumns(newSize);
    updateCellSize(newSize);
}

// Initiate default grid
makeRowsAndColumns(2);
updateCellSize(2);

/*
// Makes the 16 x 16 grid
function defaultGrid() {
    makeRows(16);
    makeColumns(16);
}

// Take the rows and column input and creates a grid
function makeRows(rowNum) {
    // Creates rows
    for (r = 0; r < rowNum; r++) {
        let row = document.createElement('div');
        container.appendChild(row).className = 'gridRow';
    }
}

// Creates the columns

function makeColumns(cellNum) {
    for (i = 0; i < rows.length; i++) {
        for (j = 0; j < cellNum; j++) {
            let newCell = document.createElement('div');
            rows[j].appendChild(newCell).className = 'cell';
        }
    }
}

function updateGridSize(size) {
    // Calculates the grid size (8x8, 16x16, 32x32, 64x64)
    const gridSize = 8 * size;
    // Sets the container width and height
    container.style.width = gridSize + 'em';
    container.style.height = gridSize + 'em';
    makeRows(gridSize);
    makeColumns(gridSize);
}
*/




slider.oninput = function () {
    // Takes the value of the slider and converts it to and integer and
    // assigns it to the variable 'newSize'
    const newSize = parseInt(this.value);
    // Updates the slider value display. Might remove this later or update
    // it to the values of 8x8, 16x16, 32x32, & 64x64
    sliderValueOutput.innerHTML = newSize;
    updateGridSize(newSize);
}

// Initialize the default grid

updateGridSize(2);

// Declare the default grid at the end of the code

defaultGrid();





// The event to change each individual cell black
let blackButton = document.querySelector('.black-btn');

// The event to change each individual cell back to white (the eraser)
let eraserButton = document.querySelector('.eraser-btn');

// The event to target the color picker
let customColor = document.querySelector('.color-picker');

// Selects all the cells on the canvas 
let cellList = document.querySelectorAll('.cell');

// This represents the specific brush that is active
let activeBrush = null;

function changeBlack(event) {
    event.target.style.backgroundColor = '#000000';
}

function changeWhite(event) {
    event.target.style.backgroundColor = '#ffffff';
}

function changeCustomColor(event) {
    event.target.style.backgroundColor = customColor.value;
}


// Function that applys the correct brush color to activeBrush

//Nested if/ if... if else statements. If the left mouse button is being held  down
// and if activeBrush === 'black/eraser/ect.' it works.
function applyBrush(cell) {
    cell.addEventListener('mouseover', function(event) {
        if (event.buttons === 1) {
            if (activeBrush === 'black') {
                changeBlack(event);
            } else if (activeBrush === 'eraser') {
                changeWhite(event);
            } else if (activeBrush === 'custom') {
                changeCustomColor(event);
            }
        }
    });
}


// Function that removes all brush event listeners
function removeBrush (cell) {
        cell.removeEventListener('mouseover', changeBlack);
        cell.removeEventListener('mouseover', changeWhite);
        cell.removeEventListener('mouseover', changeCustomColor);
    
}

// Update mousedown with two parameters
cellList.forEach(function(cell) {
    cell.addEventListener('mousedown', function(event) {
        applyBrush(cell, event);
    });
    cell.addEventListener('mouseup', function() {
        removeBrush(cell);
    });
});


// Event listeners that apply the selected brush to activeBrush when you click the buttons 
// and also removes the other previously selected brush
blackButton.addEventListener('click', function() {
    activeBrush = 'black';
    cellList.forEach(removeBrush);
    cellList.forEach(applyBrush);
});

eraserButton.addEventListener('click', function() {
    activeBrush = 'eraser';
    cellList.forEach(removeBrush);
    cellList.forEach(applyBrush);
});

customColor.addEventListener('click', function() {
    activeBrush = 'custom';
    cellList.forEach(removeBrush);
    cellList.forEach(applyBrush);
});






// Clears the canvas to start over again
// Sets a variable called clearCanvas and links it to the HTML button with a query selector
let clearCanvas = document.querySelector('.clear-btn');
// Adds an event listener that goes on click and runs a function that targets the whole cellList to set the background color to white
clearCanvas.addEventListener('click', function() {
    cellList.forEach(Element => {
        Element.style.backgroundColor = '#ffffff';
    });
});