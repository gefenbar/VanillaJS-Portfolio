var text_first = "Hi, my name is"
var text_second = "Gefen Bar."
var text_third = "I'm a Software Developer."
var text_fourth = "I'm a Highly motivated and proactive software developer eager to contribute to a tech-leading company."
var type_first = document.getElementById("h1_on_hero")
var type_second = document.getElementById("h2_on_hero")
var type_third = document.getElementById("h3_on_hero")
var type_fourth = document.getElementById("h4_on_hero")
var text_place = 0

TypeWriter(type_first, text_first, 100)
setTimeout(function () { TypeWriter(type_second, text_second, 100) }, 1600)
setTimeout(function () { TypeWriter(type_third, text_third, 100) }, 3000)
setTimeout(function () { TypeWriter(type_fourth, text_fourth, 60) }, 5700)
setTimeout(ShowButton, 12000)
var writer_delay = 114


function TypeWriter(target, text, delay, clearText = false) {
  if (target.textContent === text) {
    return;
  }
  if (clearText) {
    target.textContent = "";
  }
  let _delay = 0;
  for (let i = 0; i < text.length; i++) {
    _delay += delay;
    window.setTimeout(function () {

      if (target.textContent != text) {
        target.textContent += "|";
        setTimeout(function () {
          target.textContent = target.textContent.replace("|", text[i])
          if (target == type_fourth) {
            writer_delay -= 6
          }
        }, writer_delay)
      }
    }, _delay);
  }
}











const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    }
    else {
      entry.target.classList.remove('show')
    }
  })
})
const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el))



const details = document.querySelectorAll("details");
details.forEach((targetDetail) => {
  targetDetail.addEventListener("click", () => {
    // Close all the details that are not targetDetail.
    details.forEach((detail) => {
      if (detail !== targetDetail) {
        detail.removeAttribute("open")
      }
    })
  })
})


function ShowButton() {
  document.getElementById('button_on_hero').style.visibility = "visible"
}

function MobileNav() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

x = document.querySelectorAll('#myLinks a')
x.forEach(el => el.addEventListener('click', () => {
  document.getElementById("myLinks").style.display = "none"
}))

function ChangeLightDark() {
  const body = document.body;
  const button = document.getElementById('dark_light_button');

  if (body.classList.contains('dark-mode')) {
    // Switch to light mode
    body.classList.remove('dark-mode');
    button.innerHTML = 'Light<br>mode';
  } else {
    // Switch to dark mode
    body.classList.add('dark-mode');
    button.innerHTML = 'Dark<br>mode';
  }
}

// Get the body element
const body = document.body;

// Get all elements that need to be changed to dark theme
const navBar = document.querySelector("#nav");
const mainContent = document.querySelector("body");
const exp_section = document.querySelector("details" );

console.log(navBar);
console.log(mainContent);
console.log(exp_section);

// Define styles for dark theme
const darkTheme = {
  "--primary-color": "black",
  "--secondary-color": "gray",
  "--tertiary-color": "blue",
  "--text-color": "white"
}
// Function to apply dark theme to all elements
function applyDarkTheme() {
  // Apply dark theme to body element
  Object.keys(darkTheme).forEach((key) => {
    body.style.setProperty(key, darkTheme[key]);
  });

  // Apply dark theme to other elements
  console.log(navBar);
  console.log(mainContent);
  console.log(exp_section);

  navBar.classList.add("navbar-dark");
  mainContent.classList.add("bg-dark", "text-white");
  exp_section.classList.add("bg-dark", "text-white");
}

// Function to remove dark theme from all elements
function removeDarkTheme() {
  // Remove dark theme from body element
  Object.keys(darkTheme).forEach((key) => {
    body.style.removeProperty(key);
  });

  // Remove dark theme from other elements
  navBar.classList.remove("navbar-dark");
  mainContent.classList.remove("bg-dark", "text-white");
  exp_section.classList.remove("bg-dark", "text-white");
}

// Function to toggle between light and dark theme
function toggleTheme() {
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    removeDarkTheme();
  } else {
    body.classList.add("dark-theme");
    applyDarkTheme();
  }
}

// Add event listener to toggle button
const toggleBtn = document.querySelector("#dark_light_button");
toggleBtn.addEventListener("click", toggleTheme);
toggleBtn.addEventListener("click", ChangeLightDark)
