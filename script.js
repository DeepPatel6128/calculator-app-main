class Calculator{
    constructor(prevOperand, currOperand){
        this.previousElement = prevOperand
        this.currentElement = currOperand
        this.clear()
    }
    clear(){
        this.currentOperand = ' '
        this.prevOperand = ' '
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(this.currentOperand.includes('.') && number === '.') return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.prevOperand !== ''){
            this.compute()
        }
        if(this.currentOperand === '') return
        this.operation = operation
        this.prevOperand = this.currentOperand.toString()
        this.currentOperand = ''
    }
    compute(){
        let computation
        let prev = parseFloat(this.prevOperand)
        let curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr))return;

        switch(this.operation){
            case '+':
            computation = prev + curr
            break

            case '-':
            computation = prev - curr
            break

            case '*':
            computation = prev * curr
            break

            case '/':
            computation = prev / curr
            break

            default: return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }
    insertComas(number){
        const stringNumber = number.toString()
        const integerDigit = parseInt(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigit)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigit.toLocaleString('en', {maximumFractionDigits:0})
        }
        if(decimalDigit != null){
            return `${integerDisplay}.${decimalDigit}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentElement.innerText = this.insertComas(this.currentOperand)
        if(this.operation != null){
            this.previousElement.innerText =
            `${this.insertComas(this.prevOperand)} ${this.operation}`
        }else{
            this.previousElement.innerText = '' 
        }
    }
}


const prevOperand = document.querySelector('[data-previous-operand]')
const currentOperand = document.querySelector('[data-current-operand ]')
const numbers = document.querySelectorAll('[data-number]')
const operations = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const resetButton = document.querySelector('[data-reset]')
const equalButton = document.querySelector('[data-equal]')


const calculator = new Calculator(prevOperand , currentOperand)

numbers.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operations.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

resetButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})
