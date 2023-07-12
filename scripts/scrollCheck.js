const homeLink = document.getElementById("homeLink");
const aboutLink = document.getElementById("aboutLink");
const skillsLink = document.getElementById("skillsLink");
const projectLink = document.getElementById("projectLink");
const contactLink = document.getElementById("contactLink");
// DOM element locations relative to the page
let homeRect = window.scrollY + document.getElementById("landing").getBoundingClientRect().top;
let aboutRect = window.scrollY + document.getElementById("about").getBoundingClientRect().top;
let skillsRect = window.scrollY + document.getElementById("skills").getBoundingClientRect().top;
let projectsRect = window.scrollY + document.getElementById("projects").getBoundingClientRect().top;
let contactRect = window.scrollY + document.getElementById("contact").getBoundingClientRect().top;

let scanline = window.innerHeight;

// console.log(scanline);



console.log(homeRect + window.scrollY);
console.log(aboutRect + window.scrollY);
console.log(skillsRect + window.scrollY);
console.log(projectsRect + window.scrollY);
console.log(contactRect + window.scrollY);

// console.log("About is located at " + aboutRect.top);
// window.addEventListener("scroll", () => {
    // console.log(window.scrollY);
// })

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                func.apply(context, args);
                lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

const scrollFunction = () => {
    console.log(window.scrollY + scanline);
   
    // Check which section we are scrolled to
    if (window.scrollY + scanline < 1000) {
        homeLink.classList.add("active");
        aboutLink.classList.remove("active");
        skillsLink.classList.remove("active");
        projectLink.classList.remove("active");
        contactLink.classList.remove("active");

        console.log("home")
    } if (window.scrollY + scanline > aboutRect && window.scrollY + scanline < skillsRect) {
        homeLink.classList.remove("active");
        aboutLink.classList.add("active");
        skillsLink.classList.remove("active");
        projectLink.classList.remove("active");
        contactLink.classList.remove("active");

        console.log("about")
    } if (window.scrollY + scanline > skillsRect && window.scrollY + scanline < projectsRect) {
        homeLink.classList.remove("active");
        aboutLink.classList.remove("active");
        skillsLink.classList.add("active");
        projectLink.classList.remove("active");
        contactLink.classList.remove("active");

        console.log("skills")
    } if (window.scrollY + scanline > projectsRect && window.scrollY + scanline < contactRect) {
        homeLink.classList.remove("active");
        aboutLink.classList.remove("active");
        skillsLink.classList.remove("active");
        projectLink.classList.add("active");
        contactLink.classList.remove("active");

        console.log("projects")
    } if (window.scrollY + scanline > contactRect) {
        homeLink.classList.remove("active");
        aboutLink.classList.remove("active");
        skillsLink.classList.remove("active");
        projectLink.classList.remove("active");
        contactLink.classList.add("active");

        console.log("contact")
    } 
}

const resetOnResize = () => {
    console.clear();

    console.log("resize detected!");

    // DOM element locations relative to the page
    homeRect = window.scrollY + document.getElementById("landing").getBoundingClientRect().top;
    aboutRect = window.scrollY + document.getElementById("about").getBoundingClientRect().top;
    skillsRect = window.scrollY + document.getElementById("skills").getBoundingClientRect().top;
    projectsRect = window.scrollY + document.getElementById("projects").getBoundingClientRect().top;
    contactRect = window.scrollY + document.getElementById("contact").getBoundingClientRect().top;

    console.log(homeRect);
    console.log(aboutRect);
    console.log(skillsRect);
    console.log(projectsRect);
    console.log(contactRect);

    scanline = window.innerHeight;

    // toggleExpansion(projectClone, {top: null, left: null, width: "40vw", height: "90vh"});
    scrollFunction();
}
  
window.addEventListener("scroll", throttle(scrollFunction, 250));
window.addEventListener("resize", throttle(resetOnResize, 100));