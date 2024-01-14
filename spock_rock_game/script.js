// define the variables to manipulate the DOM
const playerScoreEl = document.getElementById("playerScore")
const playerChoiceEl = document.getElementById("playerChoice")
const computerScoreEl = document.getElementById("computerScore")
const computerChoiceEl = document.getElementById("computerChoice")
const resultText = document.getElementById("resultText")

const playerRock = document.getElementById("playerRock")
const playerPaper = document.getElementById("playerPaper")
const playerScissors = document.getElementById("playerScissors")
const playerLizard = document.getElementById("playerLizard")
const playerSpock = document.getElementById("playerSpock")

// Define the variables for the computer
const computerRock = document.getElementById("computerRock")
const computerPaper = document.getElementById("computerPaper")
const computerScissors = document.getElementById("computerScissors")
const computerLizard = document.getElementById("computerLizard")
const computerSpock = document.getElementById("computerSpock")

// Define the variables for the modal
const allGameIcons = document.querySelectorAll(".far")
console.log("allGameIcons", allGameIcons)

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
}

// Reset all 'selected' icons
const resetSelected = () => {
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected")
  })
}

// Pass player selection value and styling icons
const select = (playerChoice) => {
  // Reset selected icons
  resetSelected()
  // Add 'selected' styling & playerChoice
  switch (playerChoice) {
    case "rock":
      playerRock.classList.add("selected")
      playerChoiceEl.textContent = " --- Rock"
      break
    case "paper":
      playerPaper.classList.add("selected")
      playerChoiceEl.textContent = " --- Paper"
      break
    case "scissors":
      playerScissors.classList.add("selected")
      playerChoiceEl.textContent = " --- Scissors"
      break
    case "lizard":
      playerLizard.classList.add("selected")
      playerChoiceEl.textContent = " --- Lizard"
      break
    case "spock":
      playerSpock.classList.add("selected")
      playerChoiceEl.textContent = " --- Spock"
      break
    default:
      break
  }
}
