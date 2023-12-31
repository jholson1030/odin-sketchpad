// Declaring variables for the container, rows and the individual cells


const container = document.getElementById('container');
let rows = document.getElementsByClassName('gridRow');
let cells = document.querySelectorAll('cell');
let cellList;

let slider = document.querySelector('.slider');
let sliderValue = document.querySelector('#slider-value');


function createCell() {
    let newCell = document.createElement('div');
    newCell.className = 'cell';
    return newCell;
}

function makeGrid(size) {
    removeAllChildNodes(container);
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let c = 0; c < size * size; c++) {
        let div = createCell();
        container.appendChild(div);
        applyBrush(div);
    }
    cellList = document.querySelectorAll('.cell');
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



slider.addEventListener('input', function () {
    let val = this.value;
    sliderValue.textContent = `${val} x ${val}`;

    makeGrid(val);
});

function defaultGrid() {
    makeGrid(16);
}


// Declare the default grid at the end of the code

defaultGrid();
loadDrawing();



// The event to change each individual cell black
let blackButton = document.querySelector('.black-btn');

// The event to change each individual cell back to white (the eraser)
let eraserButton = document.querySelector('.eraser-btn');

// The event to target the color picker
let customColor = document.querySelector('#custom-color');

// Event to change each cell a random color
let rainbowButton = document.querySelector('.rainbow-btn');

// To change the canvas color
let customCanvasColor = document.querySelector('.canvas-color');

// This represents the specific brush that is active
let activeBrush = null;

function changeBlack(event) {
    event.target.style.backgroundColor = '#000000';
    saveDrawing();
}

function changeWhite(event) {
    event.target.style.backgroundColor = '#ffffff';
    saveDrawing();
}

function changeCustomColor(event) {
    event.target.style.backgroundColor = customColor.value;
    saveDrawing();
}

function changeRainbow(event) {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    saveDrawing();
}

function changeCanvasColor() {
    container.style.backgroundColor = customCanvasColor.value;
    saveDrawing();
}


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

customColor.addEventListener('input', function() {
    activeBrush = 'custom';
    cellList.forEach(removeBrush);
    cellList.forEach(applyBrush);
});

rainbowButton.addEventListener('click', function() {
    activeBrush = 'rainbow';
    cellList.forEach(removeBrush);
    cellList.forEach(applyBrush);
});

customCanvasColor.addEventListener('input', changeCanvasColor);

// Clears the canvas to start over again
// Sets a variable called clearCanvas and links it to the HTML button with a query selector
let clearCanvas = document.querySelector('.clear-btn');
// Adds an event listener that goes on click and runs a function that targets the whole cellList to set the background color to white
clearCanvas.addEventListener('click', function() {
    cellList.forEach(element => {
        element.style.backgroundColor = '#ffffff';
    });
    saveDrawing();
});

// Targets the cell's border and toggles it on and off 

let bordersOn = false;
let gridButton = document.querySelector('.grid-btn');

function toggleGridBorder() {
    bordersOn = !bordersOn;
    cellList.forEach(cell => {
        cell.style.border = bordersOn ? '1px solid black' : 'none';
    });
}

gridButton.addEventListener('click', toggleGridBorder);


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
        document.querySelector('.dance-break').innerHTML = "Make it a party!!!";
        
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


function saveDrawing() {
    let colors = [];
    cellList.forEach(function(cell) {
        colors.push(cell.style.backgroundColor);
    });
    localStorage.setItem('savedDrawing', JSON.stringify(colors));
}

function loadDrawing() {
    let savedColors = JSON.parse(localStorage.getItem('savedDrawing'));
    if (savedColors && savedColors.length === cellList.length) {
        cellList.forEach(function(cell, index) {
            cell.style.backgroundColor = savedColors[index];
        });
    }
}