// Declaring variables for the container, rows and the individual cells

const container = document.getElementById('container');
let rows = document.getElementsByClassName('gridRow');
let cells = document.querySelectorAll('cell');


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


// Declare the default grid at the end of the code

defaultGrid();


// Script for the slider that controls the grid size goes here
let slider = document.getElementById('slider-options');

// Updates the current value of the canvas size
slider.oninput = function() {

    // Add code to this function
    output.innerHTML = this.value;
}


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
function applyBrush (cell) {
    if (activeBrush === 'black') {
        cell.addEventListener('mouseover', changeBlack);
    } else if (activeBrush === 'eraser') {
        cell.addEventListener('mouseover', changeWhite);
    } else if (activeBrush === 'custom') {
        cell.addEventListener('mouseover', changeCustomColor);
    }
}

// Function that removes all brush event listeners
function removeBrush (cell) {
    cell.removeEventListener('mouseover', changeBlack);
    cell.removeEventListener('mouseover', changeWhite);
    cell.removeEventListener('mouseover', changeCustomColor);
}

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