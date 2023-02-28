/*
Form Validator

*/

const form = document.getElementById("form")
const password1El = document.getElementById("password1")
const password2El = document.getElementById("password2")
const messageContainer = document.querySelector(".message-container")
const message = document.getElementById("message")

let isValid = false

const validateForm = () => {
  // Using Constraint API
  isValid = form.checkValidity()
  // Style main message for an error
  message.textContent = "Please fill out all fields."
  message.style.color = "red"
  messageContainer.style.borderColor = "red"
}

const processFormData = (e) => {
  e.preventDefault()
  // validate form
  validateForm()
}

// Event listener
form.addEventListener("submit", processFormData)
