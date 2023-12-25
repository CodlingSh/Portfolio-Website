"use strict";
const menuBtn = document.getElementById("navBtn");
const dimOverlays = Array.from(document.getElementsByClassName("dimmingOverlay"));
const yearSpan = document.getElementById("currentYear");//Copyright year at bottom of page

const animateHeroSect = () => {
    const heroSect = document.getElementById("landing");

    heroSect.classList.add("page_loaded");
}

const toggleDim = () => {
    const dimOverlays = Array.from(document.getElementsByClassName("dimmingOverlay"));
    const currentOpacity = window.getComputedStyle(document.getElementsByClassName("dimmingOverlay")[0]).opacity;

    if (currentOpacity == "0") { // Turning the dim on
        dimOverlays.forEach(dimOverlay => {
            dimOverlay.style.pointerEvents = "auto";
            dimOverlay.style.opacity = "0.3";
        })
    } else { // Turning the dim off
        dimOverlays.forEach(dimOverlay => {
            dimOverlay.style.removeProperty("pointer-events");
            dimOverlay.style.opacity = "0";
        })
    }
}

const openModal = (e) => {
    const originalBox = e.currentTarget.parentElement.parentElement;
    const cloneBox = originalBox.cloneNode(true);
    let {top, left, width, height} = originalBox.getBoundingClientRect();

    const closeModal = () => {
        // Remove event listeners
        cloneBox.getElementsByClassName("close_btn")[0].addEventListener("click", closeModal);
        dimOverlays.forEach(dimOverlay => {
            dimOverlay.removeEventListener("click", closeModal);
        })

        toggleDim();
        cloneBox.classList.remove("activeStyle");
        cloneBox.classList.remove("modal_active");
        cloneBox.style.removeProperty("zIndex");
        cloneBox.style.removeProperty("transition");
        cloneBox.style.removeProperty("border-radius");
        cloneBox.style.removeProperty("overflow-y");
        
        setTimeout(() => {
            originalBox.style.removeProperty("opacity");
            document.body.classList.remove("bodyLock");
            cloneBox.remove();
        }, 300)
    }

    e.preventDefault();
    toggleDim();
    
    // Prevent the page from scrolling
    document.body.classList.add("bodyLock");
    // Set initial style
    cloneBox.style.position = "fixed";
    cloneBox.style.top = `${top}px`;
    cloneBox.style.left = `${left}px`; 
    cloneBox.style.width = `${width}px`;
    cloneBox.style.height = `${height}px`;
    cloneBox.style.zIndex = "9001";
    // Make original box invisible
    originalBox.style.opacity = 0;

    //Append modal to project_grid
    originalBox.parentElement.appendChild(cloneBox);

    // Set active style
    setTimeout(() => {
        cloneBox.classList.add("activeStyle");
        cloneBox.style.overflowY = "auto";
        //Hide certain original elements and reveal hidden elements by adding the "modal_active" class
        cloneBox.classList.add("modal_active");
    }, 1);
    
    setTimeout(() => {
        // cloneBox.style.zIndex = "9901";
        cloneBox.style.transition = "none";
    }, 300)

    // Set click events to close the modal
    cloneBox.getElementsByClassName("close_btn")[0].addEventListener("click", closeModal);
    dimOverlays.forEach(dimOverlay => {
        dimOverlay.addEventListener("click", closeModal);
    })
}

const toggleMenu = () => {
    if (!document.body.classList.contains("menuVisible")) { // If menu is closed when clicked
        document.body.classList.add("menuVisible");
        dimOverlays.forEach(dimOverlay => {
            dimOverlay.addEventListener("click", toggleMenu);
        })
    }
    else if (document.body.classList.contains("menuVisible")) { // If menu is open when clicked
        document.body.classList.remove("menuVisible");
        dimOverlays.forEach(dimOverlay => {
            dimOverlay.removeEventListener("click", toggleMenu);
        })
    }
    
    toggleDim();
}

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
    const scanline = window.innerHeight * 0.75;
    // DOM element locations relative to the page
    const homeRect = window.scrollY + document.getElementById("landing").getBoundingClientRect().top;
    const aboutRect = window.scrollY + document.getElementById("about").getBoundingClientRect().top;
    const skillsRect = window.scrollY + document.getElementById("skills").getBoundingClientRect().top;
    const projectsRect = window.scrollY + document.getElementById("projects").getBoundingClientRect().top;
    const contactRect = window.scrollY + document.getElementById("contact").getBoundingClientRect().top;

    if (window.scrollY + scanline > aboutRect && window.scrollY + scanline < skillsRect) {
        aboutLink.classList.add("active");
        skillsLink.classList.remove("active");
        projectLink.classList.remove("active");
        contactLink.classList.remove("active");
    } else if (window.scrollY + scanline > skillsRect && window.scrollY + scanline < projectsRect) {
        aboutLink.classList.remove("active");
        skillsLink.classList.add("active");
        projectLink.classList.remove("active");
        contactLink.classList.remove("active");
    } else if (window.scrollY + scanline > projectsRect && window.scrollY + scanline < contactRect) {
        aboutLink.classList.remove("active");
        skillsLink.classList.remove("active");
        projectLink.classList.add("active");
        contactLink.classList.remove("active");
    } else if (window.scrollY + scanline > contactRect) {
        aboutLink.classList.remove("active");
        skillsLink.classList.remove("active");
        projectLink.classList.remove("active");
        contactLink.classList.add("active");
    } else {
        aboutLink.classList.remove("active");
        skillsLink.classList.remove("active");
        projectLink.classList.remove("active");
        contactLink.classList.remove("active");  
    }
}

const validateForm = () => {
    let name = document.forms["contactForm"]["name"].value;
    let email = document.forms["contactForm"]["email"].value;
    let message = document.forms["contactForm"]["messageBox"].value;
    let thankMessage = document.getElementById("thankYouMessage");
    let emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.(?:[a-zA-Z]{2,3}|co\.uk)$/;
    //Error messages
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let messageError = document.getElementById("messageError");
    let errorMessages = document.getElementsByClassName("errorMessage");

    let isValid = true;

    // Check that the name input is valid
    if (name.length <= 0) {
        isValid = false;
        nameError.innerHTML = "Please insert your name";
    }

    // Check if email matches the standard email address
    if (!emailRegex.test(email)) {
        isValid = false;
        emailError.innerHTML = "Email address is invalid";
    }

    // Check that something was inserted into the email field
    if (email.length <= 0) {
        isValid = false;
        emailError.innerHTML = "Please insert an email address";
    }

    // Check that the message textarea is valid
    if (message.length <= 0) {
        isValid = false;
        messageError.innerHTML = "Please insert a message";
    }

    if (isValid) {
        thankMessage.style.zIndex = "2600";
        thankMessage.style.opacity = "100%";

        thankMessage.lastElementChild.addEventListener("click", () => {
            thankMessage.style.opacity = "0%";
            thankMessage.addEventListener("transitionend", () => {
                thankMessage.style.zIndex = "-2600";
            }, {once: true});
        }, {once: true});

        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].style.opacity = "0";
        }
        
        return true;
    } else {
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].style.opacity = "1";
        }

        return false;
    }
}

const linkClick = (e) => {
    e.preventDefault();
    const section = document.getElementById(e.target.href.split("#")[1]);
    section.scrollIntoView({behavior: "smooth"});
    if (e.target.className == "linkMobile") {
        toggleMenu();
    }
}

// Year for the footer
yearSpan.innerHTML = new Date().getFullYear();

// #####################
// ## EVENT LISTENERS ##
// #####################

// Add click event to the "More Info" buttons in the projectss
Array.from(document.getElementsByClassName("projectBtn")).forEach(element => {
    element.addEventListener("click", openModal)
})
// Add click event for the menu button
menuBtn.addEventListener("click", toggleMenu);
// Array to add click events to all the navigation links
Array.from(document.getElementsByClassName("linkMobile")).concat(Array.from(document.getElementsByClassName("link"))).forEach(element => {
    console.log("click event added");
    element.addEventListener("click", linkClick);
});
// Listen for scrolling to change the color of navigation links
window.addEventListener("scroll", throttle(scrollFunction, 250));
window.addEventListener("load", () => setTimeout(animateHeroSect, 100));