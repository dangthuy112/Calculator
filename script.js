const lowerDisplay = document.querySelector('#lower');
const upperDisplay = document.querySelector('#upper');

let currentNum = 0;
let previousOperator;
let hasDecimal = false;
let operatorPressed = false;

//number buttons
const numberButtons = Array.from(document.querySelectorAll('.number'));
numberButtons.forEach(button => button.addEventListener('click', (e) => updateDisplayNumber(e.target.id)));

//operate buttons
const operateButtons = Array.from(document.querySelectorAll('.operate'));
operateButtons.forEach(button => button.addEventListener('click', (e) => operateHandler(e.target.id)));

//decimal button
const decimalButton = document.querySelector('#decimal');

function operateHandler(input) {
    console.log(input);
    switch (input) {
        case 'add': addHandler();
            break;
        case 'subtract': subtractHandler();
            break;
        case 'multiply': multiplyHandler();
            break;
        case 'divide': divideHandler();
            break;
        case 'equal': equal();
            break;
        case 'decimal': decimal();
            break;
        case 'clear': clear();
            break;
        case 'delete': {
            const removed = deleteDisplay();
            if (removed == '.') {
                hasDecimal = false;
                decimalButton.disabled = false;
                buttonPressAnimation(decimalButton, false);
            }
            break;
        }
    }
}

function addHandler() {
    operatorPressed = true;
    if (previousOperator == undefined) {
        previousOperator = 'add';
        currentNum = +lowerDisplay.textContent;
        upperDisplay.textContent = `${currentNum} + `;
    } else {
        currentNum = operate(previousOperator, currentNum, +lowerDisplay.textContent);
        upperDisplay.textContent = `${currentNum} + `;
    }
}

function subtractHandler() {
    operatorPressed = true;
    if (previousOperator == undefined) {
        previousOperator = 'subtract';
        currentNum = +lowerDisplay.textContent;
        upperDisplay.textContent = `${currentNum} - `;
    } else {
        currentNum = operate(previousOperator, currentNum, +lowerDisplay.textContent);
        upperDisplay.textContent = `${currentNum} - `;
    }
}

function multiplyHandler() {
    operatorPressed = true;
    if (previousOperator == undefined) {
        previousOperator = 'multiply';
        currentNum = +lowerDisplay.textContent;
        upperDisplay.textContent = `${currentNum} * `;
    } else {
        currentNum = operate(previousOperator, currentNum, +lowerDisplay.textContent);
        upperDisplay.textContent = `${currentNum} * `;
    }
}

function divideHandler() {
    operatorPressed = true;
    if (previousOperator == undefined) {
        previousOperator = 'divide';
        currentNum = +lowerDisplay.textContent;
        upperDisplay.textContent = `${currentNum} / `;
    } else {
        currentNum = operate(previousOperator, currentNum, +lowerDisplay.textContent);
        upperDisplay.textContent = `${currentNum} / `;
    }
}

function equal() {
    if (!(previousOperator == undefined)) {
        const previousNum = currentNum;
        const currentNum2 = +lowerDisplay.textContent;
        currentNum = operate(previousOperator, previousNum, +lowerDisplay.textContent);
        updateLowerDisplay(currentNum);
        upperDisplay.textContent = `${previousNum} + ${currentNum2} = `;
        previousOperator = undefined;
    }
}

function decimal() {
    if (operatorPressed) {
        lowerDisplay.textContent = '0.';
        operatorPressed = false;
        hasDecimal = true;
        decimalButton.disabled = true;
    } else if (!(lowerDisplay.textContent.length == 15) && !hasDecimal) {
        lowerDisplay.textContent += '.';
        hasDecimal = true;
        decimalButton.disabled = true;
    }
}

function clear() {
    currentNum = 0;
    operatorPressed = false;
    previousOperator = undefined;
    hasDecimal = false;
    decimalButton.disabled = false;
    upperDisplay.textContent = '';
    lowerDisplay.textContent = 0;
}

function deleteDisplay() {
    const current = lowerDisplay.textContent;
    if (current.length == 1) {
        if (!(+current == 0)) {
            lowerDisplay.textContent = 0;
        }
    } else {
        lowerDisplay.textContent = current.slice(0, current.length - 1);
    }
}

function updateLowerDisplay(update) {
    if (String(update).length > 15) {
        let arr = String(update).split('.');
        update = update.toFixed(15 - arr[0]);
    }

    lowerDisplay.textContent = update;
    hasDecimal = false;
    decimalButton.disabled = false;
}

function updateDisplayNumber(update) {
    if (operatorPressed) {
        lowerDisplay.textContent = update;
        operatorPressed = false;
    } else if (!(lowerDisplay.textContent.length == 15)) {
        if (lowerDisplay.textContent.length == 1 && +lowerDisplay.textContent == 0) {
            lowerDisplay.textContent = update;
        } else {
            lowerDisplay.textContent += update;
        }
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {

    switch (operator) {
        case 'add': return add(a, b);
        case 'subtract': return subtract(a, b);
        case 'multiply': return multiply(a, b);
        case 'divide': return divide(a, b);
    }
}



