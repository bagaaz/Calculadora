const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operetor]')
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
   constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
   }

   formatDisplayNumber(number) {
      const stringNumber = number.toString();

      const integerDigitis = parseFloat(stringNumber.split('.')[0]);
      const decimalDigitis = stringNumber.split('.')[1];

      let integerDisplay;

      if (isNaN(integerDigitis)) {
         integerDisplay = '';
      } else {
         integerDisplay = integerDigitis.toLocaleString('en', {maximumFractionDigits: 0})
      }

      if (decimalDigitis != null) {
         return `${integerDisplay}.${decimalDigitis}`
      } else {
         return integerDisplay;
      }
   }

   calculate() {
      let result;

      const _previosusOperand = parseFloat(this.previousOperand);
      const _currentOperand = parseFloat(this.currentOperand);

      if(isNaN(_previosusOperand) || isNaN(_currentOperand)) return

      switch (this.operation) {
         case '+':
            result = _previosusOperand + _currentOperand;
            break;
         case '-':
            result = _previosusOperand - _currentOperand;
            break;
         case '÷':
            result = _previosusOperand / _currentOperand;
            break;
         case '∗':
            result = _previosusOperand * _currentOperand;
            break;
         default:
            return;
      }

      this.currentOperand = result;
      this.operation = undefined;
      this.previousOperand = '';
   }

   chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
         this.calculate()
      }

      this.operation = operation;

      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
   }

   appendNumber(number) {
      if (this.currentOperand.includes('.') && number === '.') return;
      this.currentOperand = `${this.currentOperand}${number.toString()}`
   }

   clearCurrent() {
      this.currentOperand = '';
   }

   clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
   }

   updateDisplay() {
      this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ''}`;
      this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
   }
};

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

for (const numberButton of numberButtons) {
   numberButton.addEventListener('click', () => {
      calculator.appendNumber(numberButton.innerText);
      calculator.updateDisplay();
   })
};

for (const operatorButton of operatorButtons) {
   operatorButton.addEventListener('click', () => {
      calculator.chooseOperation(operatorButton.innerText);
      calculator.updateDisplay();
   })
};

allClearButton.addEventListener('click', () => {
   calculator.clear();
   calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
   calculator.clearCurrent();
   calculator.updateDisplay();
})

equalButton.addEventListener('click', () => {
   calculator.calculate();
   calculator.updateDisplay();
});