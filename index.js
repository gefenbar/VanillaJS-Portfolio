
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


window.onload = pageLoaded;
function pageLoaded() {

}
// var audio = document.createElement("AUDIO")
// document.addEventListener("click", () => {document.body.appendChild(audio)         
//   audio.play()
// }  )
// audio.src = "mp3/writer.wav"
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
setTimeout(ShowButton, 16000)
var writer_delay = 114
function ShowButton() {
  document.getElementById('button_on_hero').style.visibility = "visible"
}


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
            writer_delay -= 1
          }
        }, writer_delay)
      }
    }, _delay);
  }
}

function MobileNav() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

  x=document.querySelectorAll('#myLinks a')
  x.forEach(el=>el.addEventListener('click',()=>{
    var y = document.getElementById("myLinks").style.display="none"
}))