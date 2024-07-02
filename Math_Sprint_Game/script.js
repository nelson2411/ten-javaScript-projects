// Pages
const gamePage = document.getElementById("game-page")
const scorePage = document.getElementById("score-page")
const splashPage = document.getElementById("splash-page")
const countdownPage = document.getElementById("countdown-page")
// Splash Page
const startForm = document.getElementById("start-form")
const radioContainers = document.querySelectorAll(".radio-container")
const radioInputs = document.querySelectorAll("input")
const bestScores = document.querySelectorAll(".best-score-value")
// Countdown Page
const countdown = document.querySelector(".countdown")
// Game Page
const itemContainer = document.querySelector(".item-container")
// Score Page
const finalTimeEl = document.querySelector(".final-time")
const baseTimeEl = document.querySelector(".base-time")
const penaltyTimeEl = document.querySelector(".penalty-time")
const playAgainBtn = document.querySelector(".play-again")

// Equations
let questionAmount = 0
let equationsArray = []
let playerGuessArray = [] // This will store the player's guesses, either true or false
let bestScoresArray = []

// Game Page
let firstNumber = 0
let secondNumber = 0
let equationObject = {}
const wrongFormat = []

// Time
let timer
let timePlayed = 0 // This will be the time played in seconds
let baseTime = 0 // This will be the base time in seconds
let penaltyTime = 0 // This will be the penalty time in seconds
let finalTime = 0 // This will be the final time in seconds
let finalTimeDisplay = "0.0"

// Scroll
let valueY = 0 // This value will represent the Y axis of the scroll bar

// Refresh Splash Page Best Scores
const bestScoresToDOM = () => {
  bestScores.forEach((bestScore, index) => {
    const bestScoreEl = bestScore
    bestScoreEl.textContent = `${bestScoresArray[index].bestScore}s`
  })
}

// Check Local Storage for Best Scores, set bestScoresArray values
const getSavedBestScores = () => {
  if (localStorage.getItem("bestScores")) {
    bestScoresArray = JSON.parse(localStorage.bestScores)
  } else {
    bestScoresArray = [
      { questions: 10, bestScore: finalTimeDisplay },
      { questions: 25, bestScore: finalTimeDisplay },
      { questions: 50, bestScore: finalTimeDisplay },
      { questions: 99, bestScore: finalTimeDisplay },
    ]
    localStorage.setItem("bestScores", JSON.stringify(bestScoresArray))
  }
  bestScoresToDOM()
}

// Update Best Score Array
const updateBestScore = () => {
  bestScoresArray.forEach((score, index) => {
    // Select correct Best Score to update
    if (questionAmount == score.questions) {
      // Return Best Score as number with one decimal
      const savedBestScore = Number(bestScoresArray[index].bestScore)
      // Update if the new final score is less or replacing zero
      if (savedBestScore === 0 || savedBestScore > finalTime) {
        bestScoresArray[index].bestScore = finalTime.toFixed(1)
      }
    }
  })
  bestScoresToDOM()
  localStorage.setItem("bestScores", JSON.stringify(bestScoresArray))
}

// Reset the Game
const playAgain = () => {
  gamePage.addEventListener("click", startTimer)
  scorePage.hidden = true
  splashPage.hidden = false
  equationsArray = []
  playerGuessArray = []
  valueY = 0
  playAgainBtn.hidden = true
}

// Show Score Page
const showScorePage = () => {
  // Show Play Again Button after 1 second
  setTimeout(() => {
    playAgainBtn.hidden = false
  }, 1000)

  gamePage.hidden = true
  scorePage.hidden = false
}

// Scores to the DOM
const scoresToDOM = () => {
  finalTimeDisplay = finalTime.toFixed(1) // Convert to seconds
  baseTime = timePlayed.toFixed(1) // Convert to seconds
  penaltyTime = penaltyTime.toFixed(1) // Convert to seconds
  baseTimeEl.textContent = `Base Time: ${baseTime}s`
  penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`
  finalTimeEl.textContent = `${finalTimeDisplay}s`
  updateBestScore()
  // Scroll to Top, go to Score Page
  itemContainer.scrollTo({ top: 0, behavior: "instant" })
  showScorePage()
}

// Stop the timer, process results, go to score page
function checkTime() {
  console.log(timePlayed)
  if (playerGuessArray.length == questionAmount) {
    clearInterval(timer)
    // Check for wrong guesses, add penalty time
    equationsArray.forEach((equation, index) => {
      if (equation.evaluated === playerGuessArray[index]) {
        // Correct guess, no penalty
      } else {
        // Incorrect guess, add penalty
        penaltyTime += 0.5
      }
    })
    finalTime = timePlayed + penaltyTime
    console.log(
      "time:",
      timePlayed,
      "penalty:",
      penaltyTime,
      "final:",
      finalTime
    )
    scoresToDOM()
  }
}

// Add a tenth of a second to timePlayed
const addTime = () => {
  timePlayed += 0.1
  checkTime()
}

// Start timer, add a tenth of a second to timePlayed
const startTimer = () => {
  // Reset time and clear any existing intervals
  timePlayed = 0
  penaltyTime = 0
  finalTime = 0
  timer = setInterval(addTime, 100)
  gamePage.removeEventListener("click", startTimer)
}

// Scroll and store the value in valueY
const select = (guessedTrue) => {
  console.log("player guess:", playerGuessArray)
  // Scroll 80 pixels
  valueY += 80
  itemContainer.scroll(0, valueY)
  // Add player guess to array
  return guessedTrue
    ? playerGuessArray.push("true")
    : playerGuessArray.push("false")
}

// Display Game Page
const showGamePage = () => {
  gamePage.hidden = false
  countdownPage.hidden = true
}

// Get Random Number up to a certain number
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount)
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations
  console.log("correct equations:", correctEquations)
  console.log("wrong equations:", wrongEquations)
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9) // the max is 9 because we want to multiply by 9
    secondNumber = getRandomInt(9) // the max is 9 because we want to multiply by 9
    const equationValue = firstNumber * secondNumber
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`
    equationObject = { value: equation, evaluated: "true" }
    equationsArray.push(equationObject)
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9) // the max is 9 because we want to multiply by 9
    secondNumber = getRandomInt(9) // the max is 9 because we want to multiply by 9
    const equationValue = firstNumber * secondNumber
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`
    const formatChoice = getRandomInt(3)
    const equation = wrongFormat[formatChoice]
    equationObject = { value: equation, evaluated: "false" }
    equationsArray.push(equationObject)
  }
  shuffle(equationsArray)
}

// Add equations to DOM
function equationsToDOM() {
  equationsArray.forEach((equation) => {
    // Item
    const item = document.createElement("div")
    item.classList.add("item")
    // Equation Text
    const equationText = document.createElement("h1")
    equationText.textContent = equation.value
    // Append
    item.appendChild(equationText)
    itemContainer.appendChild(item)
  })
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = ""
  // Spacer
  const topSpacer = document.createElement("div")
  topSpacer.classList.add("height-240")
  // Selected Item
  const selectedItem = document.createElement("div")
  selectedItem.classList.add("selected-item")
  // Append
  itemContainer.append(topSpacer, selectedItem)

  // Create Equations, Build Elements in DOM
  createEquations()
  equationsToDOM()

  // Set Blank Space Below
  const bottomSpacer = document.createElement("div")
  bottomSpacer.classList.add("height-500")
  itemContainer.appendChild(bottomSpacer)
}

// Displays 3, 2, 1, GO!
const countdownStart = () => {
  countdown.textContent = "3"
  setTimeout(() => {
    countdown.textContent = "2"
  }, 1000)
  setTimeout(() => {
    countdown.textContent = "1"
  }, 2000)
  setTimeout(() => {
    countdown.textContent = "GO!"
  }, 3000)
}

// Navigate from Splash Page to Countdown Page
const showCountdown = () => {
  countdownPage.hidden = false
  splashPage.hidden = true
  //populateGamePage()
  countdownStart()
  populateGamePage()
  setTimeout(showGamePage, 4000)
}

// Get the value from selected radio button
function getRadioValue() {
  let radioValue
  radioInputs.forEach((radioInput) => {
    if (radioInput.checked) {
      radioValue = radioInput.value
    }
  })
  return radioValue
}

// Form that decides amount of questions
function selectQuestionAmount(e) {
  e.preventDefault()
  questionAmount = getRadioValue()
  console.log("question amount:", questionAmount)
  if (questionAmount) {
    showCountdown()
  }
}

startForm.addEventListener("click", () => {
  radioContainers.forEach((radioEl) => {
    // Remove Selected Label Styling
    radioEl.classList.remove("selected-label")
    // Add it back if radio input is checked
    if (radioEl.children[1].checked) {
      radioEl.classList.add("selected-label")
    }
  })
})

// Event Listeners ✨
startForm.addEventListener("submit", selectQuestionAmount)
gamePage.addEventListener("click", startTimer)

// On Load
getSavedBestScores()
