// 
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
// 

// 
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
// 

// window.onload = pageLoaded;
// function pageLoaded() {
// }

// 
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
// 

// 
function ShowButton() {
  document.getElementById('button_on_hero').style.visibility = "visible"
}
// 

// 
var light_mod = false
function ChangeLightDark() {
  if (light_mod) {
    ChangeToDark()
    light_mod = false
  }
  else {
    ChangeToLight()
    light_mod = true;
  }
}
function ChangeToDark() {
  toGrey = document.querySelectorAll("#h2_on_hero, #copyright")
  toGrey.forEach(el => {
    el.style.color = "#ccd6f6"
  })
  toDark = document.querySelectorAll("#body")
  toDark.forEach(el => {
    el.style.backgroundColor = "#0a192f"
  })
  toWhite = document.querySelectorAll(".nav_mobile a, #about_me_text p,  #experience div h2, #experience h3")
  toWhite.forEach(el => {
    el.style.color = "white"
  })
  toTurquoise = document.querySelectorAll("#skills_section, #button_on_hero, #h1_on_hero, .projects button, .menu_item, .hidden h1, .show h1, .footer ul li a, .footer ul li, .footer_social, .footer, #logo, #logo_mobile")
  toTurquoise.forEach(el => {
    if (el.className === "footer_social") {
      el.style.filter = " invert(86%) sepia(102%) saturate(2397%) hue-rotate(440deg) brightness(100%) contrast(129%)"
    }
    if (el.id === "logo") {
      el.style.filter = "brightness(1)"
    }
    if (el.id === "logo_mobile") {
      el.style.filter = "brightness(1)"
    }
    if (el.className === "footer") {
      el.style.backgroundColor = "#0a192f"
    }
    if (el.id === "button_on_hero") {
      el.style.borderColor = "#64ffda"
      el.style.color = "#64ffda"
    }
    else
      el.style.color = "#64ffda"
  })
  document.getElementById('sun_image').style.display = "none"
  document.getElementById('moon_image').style.display = "flex"
  document.getElementById('birds_image').style.display = "none"
  document.getElementById('stars_image').style.display = "flex"
  document.getElementById('dark_light_button').innerHTML = "Light<br>mode"
}


function ChangeToLight() {
  toWheat = document.querySelectorAll("#body, .footer")
  toWheat.forEach(el => {
    el.style.backgroundColor = "wheat"
  })
  toDark = document.querySelectorAll(".nav_mobile a,  #skills_section, #button_on_hero, #h1_on_hero , #h2_on_hero, .projects button, .menu_item, .hidden h1, .show h1, #about_me_text p, #experience div h2, #experience h3, .footer ul li a, .footer ul li , .footer_social, #copyright, #logo, #logo_mobile")
  toDark.forEach(el => {
    if (el.id === "logo") {
      el.style.filter = "brightness(0.3)"
    }
    if (el.id === "logo_mobile") {
      el.style.filter = "brightness(0.3)"
    }
    if (el.className === "footer_social") {
      el.style.filter = "none"
    }
    if (el.id === "button_on_hero") {
      el.style.color = "blue"
      el.style.borderColor = "#0a192f"
    }
    if (el.id === "copyright") {
      el.style.color = "#2b2f3e"
    }
    else
      el.style.color = "#0a192f"
  })
  document.getElementById('dark_light_button').innerHTML = "Dark<br>mode"
  document.getElementById('sun_image').style.display = "flex"
  document.getElementById('moon_image').style.display = "none"
  document.getElementById('birds_image').style.display = "flex"
  document.getElementById('stars_image').style.display = "none"
}
// 

// 
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
// 

// 
circlesOdd = document.querySelectorAll('.container-circle-odd')
circlesEven = document.querySelectorAll('.container-circle-even')
circlesEven.forEach(el => { el.style.animation = "bounceDown 3s infinite" })
circlesOdd.forEach(el => { el.style.animation = "bounceUp 3s infinite" })
// 


// 
let moon = document.getElementById("moon_image")
window.addEventListener('scroll', () => {
  let value = window.scrollY
  moon.style.top = value * 1.05 + "px"
})

let sun = document.getElementById("sun_image")
window.addEventListener('scroll', () => {
  let value = window.scrollY
  sun.style.bottom = value * 1.05 + "px"
})