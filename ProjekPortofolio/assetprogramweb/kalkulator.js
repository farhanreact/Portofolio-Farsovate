const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.calc-button');

let currentInput = '';
let operator = '';
let operand1 = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        if (!isNaN(value)) {
            currentInput += value;
            updateScreen(currentInput);
        } else if (value === 'C') {
            currentInput = '';
            operand1 = null;
            operator = '';
            updateScreen('0');
        } else if (value === '←') {
            currentInput = currentInput.slice(0, -1);
            updateScreen(currentInput || '0');
        } else if (['+', '−', '×', '÷'].includes(value)) {
            if (currentInput === '') return;
            operand1 = parseFloat(currentInput);
            operator = value;
            currentInput = '';
        } else if (value === '=') {
            if (currentInput === '' || operand1 === null) return;
            const operand2 = parseFloat(currentInput);
            let result = 0;

            switch (operator) {
                case '+':
                    result = operand1 + operand2;
                    break;
                case '−':
                    result = operand1 - operand2;
                    break;
                case '×':
                    result = operand1 * operand2;
                    break;
                case '÷':
                    result = operand2 !== 0 ? operand1 / operand2 : 'Error';
                    break;
            }

            updateScreen(result);
            currentInput = result.toString();
            operand1 = null;
            operator = '';
        }
    });
});

function updateScreen(value) {
    screen.textContent = value;
}
