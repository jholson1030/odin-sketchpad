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

// The event to change each individual cell black

function changeBlack(event) {
    event.target.style.backgroundColor = '#000000';
}

// The event to change each individual cell back to white (the eraser)

function changeWhite(event) {
    event.target.style.backgroundColor = '#ffffff';
}

// Takes changeBlack/changeWhite and puts it in an event listener

let cellList = document.querySelectorAll('.cell');
cellList.forEach(function (cells) {
    cells.addEventListener('mouseover', changeBlack);
});

// Clears the canvas to start over again

// Sets a variable called clearCanvas and links it to the HTML button with a query selector
let clearCanvas = document.querySelector('.clear-btn');
// Adds an event listener that goes on click and runs a function that targets the whole cellList to set the background color to white
clearCanvas.addEventListener('click', function() {
    cellList.forEach(Element => {
        Element.style.backgroundColor = '#f4f4f4';
    });
});