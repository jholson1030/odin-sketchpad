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
let blackButton = document.querySelector('.black-btn');

// The event to change each individual cell back to white (the eraser)
let eraserButton = document.querySelector('.eraser-btn');

// The event to target the color picker
let customColor = document.querySelector('.color-picker');

// Selects all the cells on the canvas 
let cellList = document.querySelectorAll('.cell');

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

function applyBrush (cell) {
    if (activeBrush === 'black') {
        cell.addEventListener('mouseover', changeBlack);
    } else if (activeBrush === 'eraser') {
        cell.addEventListener('mouseover', changeWhite);
    } else if (activeBrush === 'custom') {
        cell.addEventListener('mouseover', changeCustomColor);
    }
}

function removeBrush (cell) {
    cell.removeEventListener('mouseover', changeBlack);
    cell.removeEventListener('mouseover', changeWhite);
    cell.removeEventListener('mouseover', changeCustomColor);
}

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

// REMOVE THIS LATER //
/*
// Variables to check if the events in the buttons are being ran or not
let isBlackActive = false; // OFF
let isEraserActive = false; // OFF
let isCustomActive = false; // OFF


function blackBrush() {
    if (isBlackActive === true) {
        cellList.forEach(function (cells) {
            cells.addEventListener('mouseover', changeBlack);
            // isEraserActive = false;
            // isCustomActive = false;
        });
    } else cellList.forEach(function (cells) {
            cells.removeEventListener('mouseover', changeBlack);
        });
    
    }

function whiteBrush() {
    if (isEraserActive === true) {
        cellList.forEach(function (cells) {
            cells.addEventListener('mouseover', changeWhite);
            // isBlackActive = false;
            // isCustomActive = false;
        });
    } else cellList.forEach(function (cells) {
            cells.removeEventListener('mouseover', changeWhite);
        });
    }

function customBrush() {
    if (isCustomActive === true) {
        cellList.forEach(function (cells) {
            cells.addEventListener('mouseover', changeCustomColor);
            // isBlackActive = false;
            // isEraserActive = false;
        });
    } else cellList.forEach(function (cells) {
            cells.removeEventListener('mouseover', changeCustomColor);
        });
    }

    blackButton,addEventListener('click', function () {
        if (!isBlackActive) {
            isBlackActive = true;
            blackBrush();
            isEraserActive = false;
            isCustomActive = false;
        }
    });
    
    eraserButton.addEventListener('click', function () {
        if (!isEraserActive) {
            isEraserActive = true;
            whiteBrush();
            isBlackActive = false;
            isCustomActive = false;
        }
    });
    
    customColor.addEventListener('input', function () {
        if (!isCustomActive) {
            isCustomActive = true;
            customBrush();
            isBlackActive = false;
            isEraserActive = false;
        }
    });
   */ 





// Clears the canvas to start over again
// Sets a variable called clearCanvas and links it to the HTML button with a query selector
let clearCanvas = document.querySelector('.clear-btn');
// Adds an event listener that goes on click and runs a function that targets the whole cellList to set the background color to white
clearCanvas.addEventListener('click', function() {
    cellList.forEach(Element => {
        Element.style.backgroundColor = '#ffffff';
    });
});