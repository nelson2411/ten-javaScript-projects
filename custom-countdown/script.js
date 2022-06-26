const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date input min with today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate DOM with countdown values
function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log("Distance: ", distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(
      "Days: ",
      days,
      "Hours: ",
      hours,
      "Minutes: ",
      minutes,
      "Seconds: ",
      seconds
    );
    // Populate our countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide input
    inputContainer.hidden = true;
    // Show countdown
    countdownEl.hidden = false;
  }, second);
}

// Take values from form input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log("Updating countdown...", countdownTitle, countdownDate);
  // Check for a valid date
  if (countdownDate === "") {
    alert("Please enter a valid date");
  } else {
    // Get number version of current Date, update the DOM
    countdownValue = new Date(countdownDate).getTime();
    console.log("Countdown value: ", countdownValue);
    updateDom();
  }
}

// Function that reset all values in input
function reset() {
  // Hide Countdowns, show input
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  // Stop the countdown
  clearInterval(countdownActive);
  // Reset values
  countdownTitle = "";
  countdownDate = "";
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
