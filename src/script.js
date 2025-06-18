const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let previousInput = '';
let operator = null;
let justCalculated = false;

function updateDisplay() {
  display.textContent = currentInput || '0';
  display.classList.remove('update-flash');
  void display.offsetWidth; // trigger reflow to restart animation
  display.classList.add('update-flash');
}

function calculate(){
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return '';

    switch(operator){
        case '+': return (prev + current).toString();
        case '−': return (prev - current).toString();
        case '×': return (prev * current).toString();
        case '÷': 
            if (current === 0) return 'Error';
            return (prev / current).toString();
        default: return currentInput;     
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const btnText = button.textContent;

        if(button.id==='clear'){
            currentInput = '';
            previousInput = '';
            operator = null;
            justCalculated = false;
            updateDisplay();
            return;
        }
        if(button.id==='equals'){
            if(operator&&currentInput){
                currentInput = calculate();
                previousInput = '';
                operator = null;
                justCalculated = true;

                updateDisplay();
            }
            return;
        }
        if(['+', '-', '*', '÷'].includes(btnText)){
            if(currentInput === '') return;
            if(operator && previousInput !== ''){
                currentInput = calculate();
                updateDisplay();
            }
            operator = btnText;
            previousInput= currentInput;
            currentInput = '';
            justCalculated = false;
            updateDisplay();
            return;
        }
        if(btnText==='.'){
            if(currentInput.includes('.')) return;
            if(currentInput==='')currentInput ='0';
        }

        if(justCalculated){
            currentInput=btnText;
            justCalculated = false;
        }else{
            currentInput +=btnText;
        }
        updateDisplay();
    });
});