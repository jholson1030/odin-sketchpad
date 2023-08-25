// Declaring variables for the container, rows and the individual cells

const container = document.getElementById('container');
let rows = document.getElementsByClassName('gridRow');
let cells = document.querySelectorAll('cell');
let cellList = [];
let activeBrush = null; 

let slider = document.querySelector('.slider');
let sliderValue = document.querySelector('#slider-value');





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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createCell() {
    let newCell = document.createElement('div');
    newCell.className = 'cell';
    return newCell;
}





slider.addEventListener('input', function sliderEvent () {
    let val = slider.value;
    sliderValue.textContent = `${val} x ${val}`;

    removeAllChildNodes(container);

    // Updates grid layout
    removeAllChildNodes(container);
    container.style.gridTemplateColumns = `repeat(${val}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${val}, 1fr)`;

    // Recreate cells
    for (let c = 0; c < val * val; c++) {
        let div = createCell();
        container.appendChild(div);
        applyBrush(div);
    }

    cellList = document.querySelectorAll('.cell');  
});





// The event to change each individual cell black
let blackButton = document.querySelector('.black-btn');

// The event to change each individual cell back to white (the eraser)
let eraserButton = document.querySelector('.eraser-btn');

// The event to target the color picker
let customColor = document.querySelector('.color-picker');

// Event to toggle the grid border on or off
// let borderButton = document.querySelector('.grid-btn');



// Event to change each cell a random color
let rainbowButton = document.querySelector('.rainbow-btn');



function changeBlack(event) {
    event.target.style.backgroundColor = '#000000';
}

function changeWhite(event) {
    event.target.style.backgroundColor = '#ffffff';
}

function changeCustomColor(event) {
    event.target.style.backgroundColor = customColor.value;
}

function changeRainbow(event) {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}
/*
function toggleGridBorder() {
    cells.style.border = 'none';
}
*/

// Function that applys the correct brush color to activeBrush
function applyBrush(cell) {
    cell.addEventListener('mouseover', function(event) {
        if (event.buttons === 1) {
            if (activeBrush === 'black') {
                changeBlack(event);
            } else if (activeBrush === 'eraser') {
                changeWhite(event);
            } else if (activeBrush === 'custom') {
                changeCustomColor(event);
            } else if (activeBrush === 'rainbow') {
                changeRainbow(event);
            }
        }
    });
}


// Function that removes all brush event listeners
function removeBrush (cell) {
        cell.removeEventListener('mouseover', changeBlack);
        cell.removeEventListener('mouseover', changeWhite);
        cell.removeEventListener('mouseover', changeCustomColor);
        cell.removeEventListener('mouseover', changeRainbow);
    
}

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

rainbowButton.addEventListener('click', function() {
    activeBrush = 'rainbow';
    cellList.forEach(removeBrush);
    cellList.forEach(applyBrush);
});

/*
borderButton.addEventListener('click', function() {
    toggleGridBorder();
})
*/

// Makes the 16 x 16 grid

function defaultGrid(rowNum, cellNum) {
    removeAllChildNodes(container);
    makeRows(rowNum);
    makeColumns(cellNum); 

    slider.value = 16;
    sliderValue.textContent = `16 x 16`;

    
    container.style.gridTemplateColumns = `repeat(16, 1fr)`;
    container.style.gridTemplateRows = `repeat(16, 1fr)`;

    for (let c = 0; c < 256; c++) {
        let div = createCell();
        container.appendChild(div);
        
    }
    cellList = [];
    cellList = document.querySelectorAll('.cell');
}


defaultGrid(16, 16);


// Clears the canvas to start over again
// Sets a variable called clearCanvas and links it to the HTML button with a query selector
let clearCanvas = document.querySelector('.clear-btn');
// Adds an event listener that goes on click and runs a function that targets the whole cellList to set the background color to white
clearCanvas.addEventListener('click', function() {
    console.log('clicked');
    cellList.forEach(element => {
        element.style.backgroundColor = '#ffffff';
    });
});

// PARTY TIME!!! //

let partyState = false;

function partyOn() {
    document.querySelector('.party-cats').style.display = 'flex';
}

document.querySelector('.party-cats').style.display = 'none';

function partyOff() {
    document.querySelector('.party-cats').style.display = 'none';
}

function toggleParty() {
    if (partyState) {
        partyOff();
        document.querySelector('.dance-break').innerHTML = "Let's party!";
        
    } else {
        partyOn();
        document.querySelector('.dance-break').innerHTML = 'CATS!!!';
    }
    partyState = !partyState;
}

document.querySelector('.dance-break').addEventListener('click', toggleParty);

// Day/Night mode //

const body = document.querySelector('body');
const modeToggle = document.querySelector('.mode-toggle');

modeToggle.addEventListener('click', function() {
    body.classList.toggle('night-mode');
});