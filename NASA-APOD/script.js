const resultsNav = document.getElementById("resultsNav")
const favoritesNav = document.getElementById("favoritesNav")
const imagesContainer = document.querySelector(".images-container")
const saveConfirmed = document.querySelector(".save-confirmed")
const loader = document.querySelector(".loader")

// NASA API
const count = 10
const apiKey = "DEMO_KEY"
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`

let resultsArray = []

function updateDOM() {
  resultsArray.forEach((result) => {
    // Card Container
    const card = document.createElement("div")
    card.classList.add("card")
    // Link that opens the image
    const link = document.createElement("a")
    link.href = result.hdurl
    link.title = "View Full Image"
    link.target = "_blank"
    // Image Element
    const image = document.createElement("img")
    image.src = result.url
    image.alt = "NASA Picture of the Day"
    image.loading = "lazy"
    image.classList.add("card-img-top")
    // Card Body
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    // Card Title
    const cardTitle = document.createElement("h5")
    cardTitle.classList.add("card-title")
    cardTitle.textContent = result.title
    // Save Text --> Button
    const saveText = document.createElement("p")
    saveText.classList.add("clickable")
    saveText.textContent = "Add to Favorites"
    // Card Text --> Description
    const cardText = document.createElement("p")
    cardText.textContent = result.explanation
    // Footer Container --> Date
    const footer = document.createElement("small")
    footer.classList.add("text-muted")
    // Date
    const date = document.createElement("strong")
    date.textContent = result.date
    // CopyRight --> NASA
    const copyRightResult =
      result.copyRight === undefined ? "" : result.copyRight
    const copyRight = document.createElement("span")
    copyRight.textContent = ` ${copyRightResult}`
    // Append Elements --> Link
    footer.append(date, copyRight)
    cardBody.append(cardTitle, saveText, cardText, footer)
    link.appendChild(image)
    card.append(link, cardBody)
    imagesContainer.appendChild(card)
  })
}

/* 
set the asynchrnous function to fetch the data from the API
Getting 10 images from the NASA API
*/

async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl)
    resultsArray = await response.json()
    updateDOM()
    console.log("resultsArray", resultsArray)
  } catch (error) {
    console.log("error", error)
  } finally {
    console.log("finally")
  }
}

// On Load
getNasaPictures()
