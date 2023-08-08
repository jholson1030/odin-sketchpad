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
function changeBlack(event) {
    event.target.style.backgroundColor = '#000000';
}

// The event to change each individual cell back to white (the eraser)
let eraserButton = document.querySelector('.eraser-btn');
function changeWhite(event) {
    event.target.style.backgroundColor = '#ffffff';
}

// The event to target the color picker
let customColor = document.querySelector('.color-picker');
function changeCustomColor(event) {
    event.target.style.backgroundColor = customColor.value;
}



// Selects all the cells on the canvas 
let cellList = document.querySelectorAll('.cell');

// Variables to check if the events in the buttons are being ran or not
let isBlackActive = false;
let isEraserActive = false;
let isCustomActive = false;

// Toggles for the different colors and eraser


function toggleBlack() {
    if (!isBlackActive) {
        cellList.forEach(function (cells) {
            cells.addEventListener('mouseover', changeBlack);
        });
    } else {
        cellList.forEach(function (cells) {
            cells.removeEventListener('mouseover', changeBlack);
        });
    } isBlackActive = !isBlackActive;
    console.log(isBlackActive);
}

function toggleEraser() {
    if (!isEraserActive) {
        cellList.forEach(function (cells) {
            cells.addEventListener('mouseover', changeWhite);
        });
    } else {
        cellList.forEach(function (cells) {
            cells.removeEventListener('mouseover', changeWhite);
        });
    } isEraserActive = !isEraserActive;
    // console.log(isEraserActive);
}

function toggleCustomColor() {
    if (!isCustomActive) {
        cellList.forEach(function (cells) {
            cells.addEventListener('mouseover', changeCustomColor);
        });
    } else {
        cellList.forEach(function (cells) {
            cells.removeEventListener('mouseover', changeCustomColor);
        });
    } isCustomActive = !isCustomActive;
    // console.log(isCustomActive);
} 


blackButton.addEventListener('click', function () {
    toggleBlack();
    // When the black button is clicked, disable the eraser button
    if (isBlackActive) {
        toggleEraser();
        toggleCustomColor();
    }
});

eraserButton.addEventListener('click', function () {
    toggleEraser();
    // When the eraser button is clicked, disable the black button
    if (isEraserActive) {
        toggleBlack();
        toggleCustomColor();
    }
});

customColor.addEventListener('input', function (event) {
    toggleCustomColor();
    // When a color is chosen it will disable the other buttons
    if (isCustomActive) {
        toggleBlack();
        toggleEraser();
    }
});


// Shouldn't have an event listener inside of an event listener...

/* 
let black = blackButton.addEventListener('click', function() {
    cellList.forEach(function (cells) {
        cells.addEventListener('mouseover', changeBlack);
    });
})

let erase = eraserButton.addEventListener('click', function() {
    cellList.forEach(function (cells) {
        cells.addEventListener('mouseover', changeWhite);
    });
}) */




// Clears the canvas to start over again
// Sets a variable called clearCanvas and links it to the HTML button with a query selector
let clearCanvas = document.querySelector('.clear-btn');
// Adds an event listener that goes on click and runs a function that targets the whole cellList to set the background color to white
clearCanvas.addEventListener('click', function() {
    cellList.forEach(Element => {
        Element.style.backgroundColor = '#ffffff';
    });
});