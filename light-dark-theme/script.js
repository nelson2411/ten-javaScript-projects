const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

function imageMode(color) {
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_conceptual_idea_${color}.svg`;
  image3.src = `img/undraw_feeling_proud_${color}.svg`;
}

function toggleDarkLightMode(isDark) {
  nav.style.backgroundColor = isDark
    ? "rgba(0 0 0 / 50%)"
    : "rgba(255 255 255 / 50%)";
  textBox.style.backgroundColor = isDark
    ? "rgba(255 255 255 / 50%)"
    : "rgba(0 0 0 / 50%)";
  toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";
  isDark
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-soon");
  isDark ? imageMode("dark") : imageMode("light");

  imageMode("dark");
  toggleIcon.children[1].classList.replace("fa-moon", "fa-soon");
  imageMode("light");
}

// Switch Theme Dinamically
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggleDarkLightMode(true);
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    toggleDarkLightMode(false);
  }
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check localStorage for theme
const currenTheme = localStorage.getItem("theme");
if (currenTheme) {
  document.documentElement.setAttribute("data-theme", currenTheme);
  if (currenTheme === "dark") {
    toggleSwitch.checked = true;
    toggleDarkLightMode(true);
  }
}
