class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.readyToReset = false
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand =''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //Append number to the output screen
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
         //convert numbers to a string and append
            this.currentOperand = this.currentOperand.toString().slice(0,8) + number.toString()        
    }



    // Choose / * + - or =
    chooseOperation(operation){
        if(this.currentOperand === '') return
        //show the sign in output
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }


    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
            break
            case '-':
                computation = prev - current
            break
            case 'x':
                computation = prev * current
            break
            case '/':
                computation = prev / current
            break
            default:
                return
        }
        this.readyToReset = true;
        this.currentOperand = computation 
        console.log(parseFloat(this.currentOperand))
        this.operation = undefined
        this.previousOperand = ''
    }

   

    //Update the values inside of our output
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand

        //Display operand with previous number
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operation}`}
    }

}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const resetButton = document.querySelector('[data-reset]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//Define class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


//add number to calculator output
numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        if(calculator.previousOperand === "" &&
        calculator.currentOperand !== "" &&
    calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }

        calculator.appendNumber(button.innerText)
        //updateDisplay() will be constantly updating when we click on the button
        calculator.updateDisplay();
    })
})



//add operation to calculator output
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)

        //updateDisplay() will be constantly updating when we click on the button
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

resetButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);

    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-light');
        document.getElementById('switcher').checked = false;
    } else {
        setTheme('theme-dark');
      document.getElementById('slider').checked = true;
    }
})();