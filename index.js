const text_first = "Hi, my name is";
const text_second = "Gefen Bar";
const text_third = "I'm a Software Developer.";
const text_fourth = "I'm Highly motivated and proactive, eager to contribute to a tech-leading company.";

const type_first = document.getElementById("h1_on_hero");
const type_second = document.getElementById("h2_on_hero");
const type_third = document.getElementById("h3_on_hero");
const type_fourth = document.getElementById("h4_on_hero");
let text_place = 0;

TypeWriter(type_first, text_first, 100);
setTimeout(() => TypeWriter(type_second, text_second, 100), 1600);
setTimeout(() => TypeWriter(type_third, text_third, 100), 3000);
setTimeout(() => TypeWriter(type_fourth, text_fourth, 60), 5700);
setTimeout(ShowButton, 11000);
let writer_delay = 114;

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
    window.setTimeout(() => {
      if (target.textContent !== text) {
        target.textContent += "|";
        setTimeout(() => {
          target.textContent = target.textContent.replace("|", text[i]);
          if (target === type_fourth) {
            writer_delay -= 6;
          }
        }, writer_delay);
      }
    }, _delay);
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const details = document.querySelectorAll("details");
details.forEach((targetDetail) => {
  targetDetail.addEventListener("click", () => {
    details.forEach((detail) => {
      if (detail !== targetDetail) {
        detail.removeAttribute("open");
      }
    });
  });
});

function ShowButton() {
  document.getElementById('button_on_hero').style.visibility = "visible";
}

function MobileNav() {
  const x = document.getElementById("myLinks");
  x.style.display = (x.style.display === "block") ? "none" : "block";
}

const links = document.querySelectorAll('#myLinks a');
links.forEach((el) => el.addEventListener('click', () => {
  document.getElementById("myLinks").style.display = "none";
}));

const body = document.body;
const navBar = document.querySelector("#nav");
const navTexts = document.querySelectorAll("#nav ul li a.menu_item")
const mainContent = document.querySelector("body");
const sections = document.querySelectorAll("section")
const aboutMe = document.getElementById("about_me_container")
const experience = document.getElementById('experience')
const experienceContent = document.querySelectorAll('#experience div')
const headlines = document.querySelectorAll("h1,h2,h3,h4")
const footer = document.querySelector('footer')
const themeBtn = document.getElementById('dark_light_button')
const viewsCounter = document.querySelector('#view-count.loading')
const downloadsCounter = document.querySelector('#download-count.loading')

function applyDarkTheme() {
  experienceContent.forEach((obj) => obj.classList.add("dark"))
  navTexts.forEach((text) => text.classList.add("dark"))
  sections.forEach((section) => section.classList.add("dark"))
  headlines.forEach((head) => head.classList.add("dark"))
  footer.classList.add("dark")
  navBar.classList.add("dark");
  mainContent.classList.add("dark");
  aboutMe.classList.add("dark")
  experience.classList.add("dark")
  themeBtn.style.backgroundColor = 'white'
  themeBtn.style.color = '#16213E'
  viewsCounter.style.backgroundColor = 'white'
  viewsCounter.style.color = '#16213E'
  downloadsCounter.style.backgroundColor = 'white'
  downloadsCounter.style.color = '#16213E'
}

function removeDarkTheme() {
  experienceContent.forEach((obj) => obj.classList.remove("dark"))
  navTexts.forEach((text) => text.classList.remove("dark"))
  sections.forEach((section) => section.classList.remove("dark"))
  headlines.forEach((head) => head.classList.remove("dark"))
  footer.classList.remove("dark")
  navBar.classList.remove("dark");
  mainContent.classList.remove("dark");
  aboutMe.classList.remove("dark")
  experience.classList.remove("dark")
  themeBtn.style.backgroundColor = '#16213E'
  themeBtn.style.color = 'white'
  viewsCounter.style.backgroundColor = '#16213E'
  viewsCounter.style.color = 'white'
  downloadsCounter.style.backgroundColor = '#16213E'
  downloadsCounter.style.color = 'white'
}

function toggleTheme() {
  const button = document.querySelector('#dark_light_button');
  if (body.classList.contains("dark")) {
    removeDarkTheme()
    button.innerHTML = 'Dark <br> mode';
  } else {
    applyDarkTheme()
    button.innerHTML = 'Light <br> mode';
  }
}

const toggleBtn = document.querySelector("#dark_light_button");
toggleBtn.addEventListener("click", toggleTheme);

const functionEndpointView = '/.netlify/functions/viewCount';
const functionEndpointDownload = '/.netlify/functions/downloadCount';

async function updateViewCount() {
  try {
    const response = await fetch(functionEndpointView);
    const data = await response.json();
    const viewCount = data.viewCount;
    document.getElementById('view-count').textContent = viewCount;
  } catch (error) {
    console.error('Error updating view count:', error);
  }
}

async function updateDownloadCount() {
  try {
    const response = await fetch(functionEndpointDownload);
    const data = await response.json();
    const downloadCount = data.downloadCount;
    document.getElementById('download-count').textContent = downloadCount;
  } catch (error) {
    console.error('Error updating download count:', error);
  }
}

async function incrementDownloadCount() {
  try {
    await fetch(functionEndpointDownload, { method: 'POST' });
    updateDownloadCount(); // Update the download count after the increment
  } catch (error) {
    console.error('Error incrementing download count:', error);
  }
}

// Call the functions to update view and download counts on page load
updateViewCount();
updateDownloadCount(); // Initialize the download count on page load

document.getElementById("button_on_hero").addEventListener('click', incrementDownloadCount);
