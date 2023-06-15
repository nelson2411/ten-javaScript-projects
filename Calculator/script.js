/* We define the variables that we will use in the project. */

const calculatorDisplay = document.querySelector("h1")
const inputBtns = document.querySelectorAll("button")
const clearBtn = document.getElementById("clear-btn")

function sendNumberValue(number) {
  // If current display value is 0, replace it, if not add number.
  const displayValue = calculatorDisplay.textContent
  calculatorDisplay.textContent =
    displayValue === "0" ? number : displayValue + number
}

// define addDecimal function, the addDecimal must be define before the event listener

const addDecimal = () => {
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
  }
}

/* Ok, let's add the event listeners to the buttons. */
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value))
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value))
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal())
  }
})

// create the clear button funcionality

const resetAll = () => {
  calculatorDisplay.textContent = "0"
}

// Create the event listener for the clear button

clearBtn.addEventListener("click", resetAll)
