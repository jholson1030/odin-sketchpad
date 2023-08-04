// Declaring variables for the container, rows and the individual cells

const container = document.getElementById('container');
let rows = document.getElementsByClassName('gridRow');
let cells = document.querySelectorAll('cell');

// This is the active mode. It represents the current mode that is selected. It's default is black on startup until another button is selected.
let activeMode = 'black';

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

// This function handles what color the cell will be based on the active mode
function handleCellHover (event) { // The 'event' parameter  represents  the hover event that happens when the mouse moves over a cell
    const cell = event.target; // This targets the cell that is being triggered by the event

    if (activeMode === 'black') {
        cell.style.backgroundColor = '#000000';
    } else if (activeMode === 'eraser') {
        cell.style.backgroundColor = '#f4f4f4';
    }
}

// Clears the canvas to start over again

// Sets a variable called clearCanvas and links it to the HTML button with a query selector
let clearCanvas = document.querySelector('.clear-btn');
// Adds an event listener that goes on click and runs a function that targets the whole cellList to set the background color to white
clearCanvas.addEventListener('click', function() {
    cellList.forEach(Element => {
        Element.style.backgroundColor = '#f4f4f4';
    });
});



// Declare the default grid at the end of the code

defaultGrid();