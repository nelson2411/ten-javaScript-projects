/* We define the variables that we will use in the project. */
const calculatorDisplay = document.querySelector("h1")
const inputBtns = document.querySelectorAll("button")
const clearBtn = document.getElementById("clear-btn")

let firstValue = 0
let operatorValue = ""
let awaitingNextValue = false

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number
    awaitingNextValue = false
  } else {
    // If current display value is 0, replace it, if not add number.
    const displayValue = calculatorDisplay.textContent
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number
  }
}

// define addDecimal function, the addDecimal must be define before the event listener

const addDecimal = () => {
  // if operator pressed, don't add decimal
  if (awaitingNextValue) return // The return keyword is used to exit a function and return a value. So, the next line of code will not be executed.
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
  }
}

// calculate first and second values depending on operator :) and return the result
// We defined the operations in a object because it is easier to call them later.
// In order to call the operations we use the operatorValue variable using a key-value pair.
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
}

const useOPerator = (operator) => {
  const currentValue = Number(calculatorDisplay.textContent)
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator
    return
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue)
    calculatorDisplay.textContent = calculation
    firstValue = calculation
  }
  awaitingNextValue = true
  operatorValue = operator
}

/* Ok, let's add the event listeners to the buttons. */
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value))
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOPerator(inputBtn.value))
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal())
  }
})

// create the clear button funcionality

const resetAll = () => {
  calculatorDisplay.textContent = "0"
  firstValue = 0
  operatorValue = ""
  awaitingNextValue = false
}

// Create the event listener for the clear button

clearBtn.addEventListener("click", resetAll)
