// Define UI variables
const player = document.querySelector(".player")
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
const speed = document.querySelector(".player-speed")

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

let lastVolume = 1

// Volume Bar

const changeVolume = (e) => {
  // offsetX is the distance from the left of the element to the mouse pointer
  let volume = e.offsetX / volumeRange.offsetWidth
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0
  }
  if (volume > 0.9) {
    volume = 1
  }
  volumeBar.style.width = `${volume * 100}%`
  video.volume = volume
  // Change icon depending on volume
  volumeIcon.className = ""
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up")
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down")
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off")
  }

  lastVolume = volume
}

// Mute / Unmute

const toggleMute = () => {
  volumeIcon.className = ""
  if (video.volume) {
    lastVolume = video.volume
    video.volume = 0
    volumeBar.style.width = 0
    volumeIcon.classList.add("fas", "fa-volume-mute")
    volumeIcon.setAttribute("title", "Unmute")
  } else {
    video.volume = lastVolume
    volumeBar.style.width = `${lastVolume * 100}%`
    volumeIcon.classList.add("fas", "fa-volume-up")
    volumeIcon.setAttribute("title", "Mute")
  }
}

// Change Playback Speed -------------------- //

const changeSpeed = () => {
  video.playbackRate = speed.value
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen()
  }
  video.classList.add("video-fullscreen")
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen()
  }
  video.classList.remove("video-fullscreen")
}

let fullscreen = false

const toggleFullscreen = () => {
  !fullscreen ? openFullscreen(player) : closeFullscreen() // if fullscreen is false, open fullscreen, else close fullscreen
  fullscreen = !fullscreen
}

// Event Listeners
playBtn.addEventListener("click", togglePlay)
video.addEventListener("click", togglePlay)
video.addEventListener("timeupdate", updateProgress)
video.addEventListener("canplay", updateProgress)
progressRange.addEventListener("click", setProgress)
volumeRange.addEventListener("click", changeVolume)
volumeIcon.addEventListener("click", toggleMute)
speed.addEventListener("change", changeSpeed)
fullscreenBtn.addEventListener("click", toggleFullscreen)
