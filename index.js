// document.getElementById('homepage_video').play();

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
const hiddenElementsOdd = document.querySelectorAll('.hidden')
hiddenElementsOdd.forEach((el) => observer.observe(el))

