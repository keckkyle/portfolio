const pageTitle = document.getElementById('pageTitle')
const titleText = document.querySelector('#pageTitle h2 span')
const closeTitleBtn = document.getElementById('pgTitleClose')
const chevron = document.getElementById('chevron')
const navToggle = document.getElementById('navToggle')
const navDropdown = document.getElementById('navDropdown')
const projects = document.getElementsByClassName('projectItem')
const nextProject = document.getElementById('next')
const navLinks = document.getElementsByClassName('navLink')
const myProjects = document.getElementById('myProjects')
const aboutMe = document.getElementById('aboutMe')
const contactMe = document.getElementById('contactMe')
const sections = document.querySelectorAll('section')
const content = document.getElementById('content')
const modal = document.getElementById('modal')
const closeModal = document.getElementById('closeModal')

let i = 0
let text = "Hello"

function deleteLetter(){
    let text = titleText.innerText;
    let len = text.length;
    titleText.innerText = text.slice(0,len-1)
    if(len > 0){
        setTimeout(deleteLetter,90)
    } else {
        setTimeout(typeText, 200)
    }
}

function typeText(){
    if (i < text.length) {
        titleText.innerHTML += text.charAt(i)
        i++
        setTimeout(typeText, 90)
    } else if (i === text.length && text === "Hello"){
        i = 0
        text = "I'm Kyle. I'm a web developer."
        setTimeout(deleteLetter, 200)
    } else {
        setTimeout(exitTitlePage, 1000)
    }
}

setTimeout(typeText,200)

closeTitleBtn.addEventListener("click", exitTitlePage)

function exitTitlePage(){
    setTimeout(()=>{
        pageTitle.style.transform = 'scaleY(0)'
        content.style.transform = 'scaleY(1)'
        if(window.innerWidth >= 780){
            displayAllProjects()
            checkContactMe()
        }
    }, 500)
}

navToggle.addEventListener('click', openMenu)

function openMenu(){
    if (chevron.style.transform === 'rotate(540deg)'){
        chevron.style.transform = 'rotate(0)'
        navDropdown.style.transform = "scaleY(0)"
    } else {
        chevron.style.transform = 'rotate(540deg)'
        navDropdown.style.transform = "scaleY(1)"
    }
}

nextProject.addEventListener('click', showNextProject)

let p=0
function showNextProject(){
    if(p === projects.length-1){
        projects[p].classList.add('hidden')
        projects[0].classList.remove('hidden')
        p = 0
    } else {
        projects[p].classList.add('hidden')
        projects[p+1].classList.remove('hidden')
        p += 1
    }
}

for(let i = 0; i < navLinks.length; i++){
    navLinks[i].addEventListener('click', navigation)
}

function navigation(event){
    if (window.innerWidth < 780) {
        chevron.style.transform = 'rotate(0)'
        navDropdown.style.transform = "scaleY(0)"
        for(let i = 0; i < navLinks.length; i++){
            sections[i].classList.add('noDisplay')
        }
        if( event.target.innerText === "My Projects"){
            displayOneProject()
            myProjects.classList.remove('noDisplay')
        } else if (event.target.innerText === "About Me"){
            aboutMe.classList.remove('noDisplay')
        } else if (event.target.innerText === "Contact Me"){
            contactMe.classList.remove('noDisplay')
        }
    } else {
        if( event.target.innerText === "My Projects"){
            aboutMe.classList.add('noDisplay')
            myProjects.classList.remove('noDisplay')
        } else if (event.target.innerText === "About Me"){
            aboutMe.classList.remove('noDisplay')
            myProjects.classList.add('noDisplay')
        } else if (event.target.innerText === "Contact Me"){
            contactMe.style.display = "flex"
            setTimeout(()=>{
                contactMe.style.opacity = "1"
            }, 1)
        }

    }
}

window.addEventListener('resize', function(){
    console.log(window.innerWidth)
    if(window.innerWidth >= 780){
        navDropdown.style.transform = "scaleY(1)"
        navDropdown.style.transition = "0s"
        chevron.style.transform = 'rotate(0deg)'
        checkContactMe()
        displayAllProjects()
    } else {
        navDropdown.style.transform = "scaleY(0)"
        if(contactMe.classList.value === "modalDisplay"){
            contactMe.classList.remove("modalDisplay")
            contactMe.classList.add("noDisplay")
            contactMe.style.display = "block"
            contactMe.style.opacity = "1"
        }
        setTimeout(()=>{
            displayOneProject()
            navDropdown.style.transition = "all 0.5s ease-in-out"
        }, 10)
    }
})

function displayAllProjects() {
    for(let i=0; i < projects.length; i++){
        projects[i].classList.add('hidden')
    }
    nextProject.style.display = 'none'
}

function displayOneProject() {
    if(nextProject.style.display === 'none'){
        for(let i=0; i < projects.length; i++){
            projects[i].classList.add('hidden')
        }
        projects[0].classList.remove('hidden')
        nextProject.style.display = 'flex'
    }
}

function checkContactMe() {
    if(contactMe.classList.value === ''){
        aboutMe.classList.remove('noDisplay')
        contactMe.classList.add('modalDisplay')
        contactMe.style.display = "flex"
        contactMe.style.opacity = "1"
    } else if(contactMe.classList.value === 'noDisplay') {
        contactMe.classList.add('modalDisplay')
        contactMe.classList.remove('noDisplay')
        contactMe.style.display = "none"
    }

}

closeModal.addEventListener('click', ()=>{
    contactMe.style.opacity = "0"
    setTimeout(()=>(contactMe.style.display = "none"),250)
})