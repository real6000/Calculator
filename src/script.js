const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const sciPanel = document.getElementById('scientific-panel');
const toggleSciBtn = document.getElementById('toggle-scientific');

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

// Toggle visibility
toggleSciBtn.addEventListener('click', () => {
  sciPanel.style.display = sciPanel.style.display === 'none' ? 'grid' : 'none';
});

// Handle scientific function clicks
document.querySelectorAll('.sci-func').forEach(btn => {
  btn.addEventListener('click', () => {
    let value = parseFloat(currentInput);
    if (isNaN(value)) return;

    let result;
    const func = btn.textContent;

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180); // degrees
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case '√':
        result = Math.sqrt(value);
        break;
      case '^':
        if (previousInput) {
          result = Math.pow(parseFloat(previousInput), value);
          previousInput = '';
        } else {
          previousInput = currentInput;
          currentInput = '';
          operator = '^'; // store power mode
          return;
        }
        break;
      case 'log':
        result = Math.log10(value);
        break;
    }

    currentInput = result.toString();
    justCalculated = true;
    updateDisplay();
  });
});