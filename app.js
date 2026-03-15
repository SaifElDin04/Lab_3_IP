// --- 1. DOM (Select Nodes) ---
const displayCurr = document.getElementById('curr-operand');
const displayPrev = document.getElementById('prev-operand');
const keypad = document.getElementById('keypad');

// --- State Variables ---
let currentInput = '0';
let previousInput = '';
let selectedOperator = undefined;

// --- 2. LOGIC (Functions) ---

function clearAll() {
    currentInput = '0';
    previousInput = '';
    selectedOperator = undefined;
}

function deleteNumber() {
    if (currentInput === '0') return;
    currentInput = currentInput.toString().slice(0, -1);
    if (currentInput === '') currentInput = '0';
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput = currentInput.toString() + number.toString();
    }
}

function chooseOperation(operator) {
    if (currentInput === '0' && previousInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    selectedOperator = operator;
    previousInput = currentInput;
    currentInput = '0';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(curr)) return;

    switch (selectedOperator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '×': result = prev * curr; break;
        case '÷': result = curr === 0 ? "Error" : prev / curr; break;
        case '%': result = prev % curr; break;
        default: return;
    }

    currentInput = result.toString();
    selectedOperator = undefined;
    previousInput = '';
}

function updateDisplay() {
    displayCurr.innerText = currentInput;
    if (selectedOperator != null) {
        displayPrev.innerText = `${previousInput} ${selectedOperator}`;
    } else {
        displayPrev.innerText = '';
    }
}

// --- 3. EVENT (Listen) ---
// Using Event Delegation for efficiency
keypad.addEventListener('click', (e) => {
    const target = e.target;
    
    // Ignore clicks that aren't on buttons
    if (!target.classList.contains('btn')) return;

    const action = target.dataset.action;
    const value = target.dataset.value;

    if (value) {
        appendNumber(value);
    } else if (action === 'operator') {
        chooseOperation(target.innerText);
    } else if (action === 'calculate') {
        calculate();
    } else if (action === 'clear') {
        clearAll();
    } else if (action === 'delete') {
        deleteNumber();
    }

    updateDisplay();
});