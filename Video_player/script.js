// Define UI variables
const video = document.querySelector("video")
const progressRange = document.querySelector(".progress-range")
const progressBar = document.querySelector(".progress-bar")
const playBtn = document.getElementById("play-btn")
const volumeIcon = document.getElementById("volume-icon")
const volumeRange = document.querySelector(".volume-range")
const volumeBar = document.querySelector(".volume-bar")
const currentTime = document.querySelector(".time-elapsed")
const duration = document.querySelector(".time-duration")
const fullscreenBtn = document.querySelector(".fullscreen")

// Play & Pause ----------------------------------- //

const showPlayIcon = () => {
  playBtn.classList.replace("fa-pause", "fa-play")
  playBtn.setAttribute("title", "Play")
}

function togglePlay() {
  if (video.paused) {
    video.play()
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", "Pause")
  } else {
    video.pause()
    showPlayIcon()
  }
}

// On Video End, show play button icon

video.addEventListener("ended", showPlayIcon)

// Progress Bar ---------------------------------- //

// update progress bar as video plays

// calculating display time

const displayTime = (time) => {
  const minutes = Math.floor(time / 60) // here we round down the minutes
  let seconds = Math.floor(time % 60) // here we round down the seconds, we use % in order to get the remainder of the division
  seconds = seconds > 9 ? seconds : `0${seconds}` // here we add a 0 in front of the seconds if they are less than 10
  return `${minutes}:${seconds}` // here we return the time in the format of minutes:seconds
}

const updateProgress = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
  currentTime.textContent = `${displayTime(video.currentTime)} /`
  duration.textContent = `${displayTime(video.duration)}`
}

// Click to seek within the video

const setProgress = (e) => {
  const newTime = e.offsetX / progressRange.offsetWidth // offsetX is the distance from the left of the element to the mouse pointer
  progressBar.style.width = `${newTime * 100}%`
  video.currentTime = newTime * video.duration
}

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// Event Listeners
playBtn.addEventListener("click", togglePlay)
video.addEventListener("click", togglePlay)
video.addEventListener("timeupdate", updateProgress)
video.addEventListener("canplay", updateProgress)
progressRange.addEventListener("click", setProgress)
