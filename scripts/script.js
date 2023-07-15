const menuBtn = document.getElementById("navBtn");
const opacityLayer = document.getElementById("opacityLayer")
// DOM element locations relative to the page
let homeRect = window.scrollY + document.getElementById("landing").getBoundingClientRect().top;
let aboutRect = window.scrollY + document.getElementById("about").getBoundingClientRect().top;
let skillsRect = window.scrollY + document.getElementById("skills").getBoundingClientRect().top;
let projectsRect = window.scrollY + document.getElementById("projects").getBoundingClientRect().top;
let contactRect = window.scrollY + document.getElementById("contact").getBoundingClientRect().top;

const projects = document.getElementsByClassName("projectBox");

const getCurrentYear = () => {
    let yearSpan = document.getElementById("currentYear");
    let dateObj = new Date()

    yearSpan.innerHTML = dateObj.getFullYear();
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const toggleOpacityLayer = () => {
    if (!opacityLayer.classList.contains("turnOn")) {
        opacityLayer.classList.add("nowExists");
        opacityLayer.classList.add("turnOn");
    } 
    else {
        opacityLayer.classList.remove("turnOn");

        opacityLayer.addEventListener("transitionend", () => {
            opacityLayer.classList.remove("nowExists");
        }, {once: true});
    }
    console.log("toggled");
}

const toggleMenu = () => {
    if (!document.body.classList.contains("menuVisible")) { // If menu is closed when clicked
        document.body.classList.add("menuVisible");
        // Add event listen to opacity layer to close the menu.
        opacityLayer.addEventListener("click", toggleMenu, {once: true});

    }
    else if (document.body.classList.contains("menuVisible")) { // If menu is open when clicked
        document.body.classList.remove("menuVisible");
        opacityLayer.removeEventListener("click", toggleMenu);
    }
    toggleOpacityLayer();   
}

const mobileLinkClick = (section) => {
    window.location.assign = "#" + section;
    //opacityLayer.removeEventListener("click", closeMenu);
    toggleMenu();
}

const projectOnClick = async (e) => {
    const originalBox = e.currentTarget.parentElement;
    const cloneBox = originalBox.cloneNode(true);
    const dynamicStyle = document.getElementById("jsStyle");
    const mobileHeight = window.innerHeight;
    
    let {top, left, width, height} = originalBox.getBoundingClientRect();

    dynamicStyle.innerHTML = `.initStyle {
        position: fixed; 
        margin: 0; 
        top: ${top}px; 
        left: ${left}px;
        /*transform: translateX(${left}px) translateY(${top}px);*/
        width: ${width}px; 
        height: ${height}px;
        z-index: 6508;
    }

    .activeStyle {
        position: fixed;
        transform: translateX(calc(2.5vw - ${left}px)) translateY(calc(${mobileHeight * 0.035}px - ${top}px));
        height: ${mobileHeight * 0.93}px; 
        width: 95vw; 
        //z-index: 9001;
    }
    
    @media only screen and (min-width: 1100px) {
        .activeStyle {
            transform: translateX(calc(31vw - ${left}px)) translateY(calc(3.5vh - ${top}px)); 
            height: 93%; 
            width: 38%; 
            //z-index: 9001;
        }
    }
    `

    cloneBox.classList.add("initStyle");
    originalBox.style.opacity = 0;
    document.body.classList.add("bodyLock");
    originalBox.parentElement.appendChild(cloneBox);
    setTimeout(() => {cloneBox.classList.toggle("activeStyle")}, 1);
    toggleOpacityLayer();

    let closeBtn = cloneBox.getElementsByClassName("closeBtn")[0];

    const closeProject = async (element) => {
        return new Promise((res) => {
            element.classList.remove("activeStyle");
            toggleOpacityLayer();
            opacityLayer.removeEventListener("click", opacityLayerClick);
            setTimeout(res, 300);
        })
    }

    const opacityLayerClick = async () => {
        await closeProject(cloneBox);
        document.body.classList.remove("bodyLock");
        cloneBox.classList.remove("initStyle");
        cloneBox.remove();
        originalBox.style.opacity = 1;
        console.log("OPACITYLAYER CLICKED! " + Math.random());
    }
    
    delay(301).then(() => closeBtn.addEventListener("click", async () => {
        await closeProject(cloneBox);
        document.body.classList.remove("bodyLock");
        cloneBox.classList.remove("initStyle");
        cloneBox.remove();
        originalBox.style.opacity = 1;
    }, {once: true}));

    delay(301).then(() => opacityLayer.addEventListener("click", opacityLayerClick, {once: true}));
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
    let scanline = window.innerHeight * 0.75;

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

const resetOnResize = () => {
    console.clear();

    console.log("resize detected!");

    // DOM element locations relative to the page
    homeRect = window.scrollY + document.getElementById("landing").getBoundingClientRect().top;
    aboutRect = window.scrollY + document.getElementById("about").getBoundingClientRect().top;
    skillsRect = window.scrollY + document.getElementById("skills").getBoundingClientRect().top;
    projectsRect = window.scrollY + document.getElementById("projects").getBoundingClientRect().top;
    contactRect = window.scrollY + document.getElementById("contact").getBoundingClientRect().top;

    scanline = window.innerHeight;

    // toggleExpansion(projectClone, {top: null, left: null, width: "40vw", height: "90vh"});
    scrollFunction();
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

const scrollToSection = (sect) => {
    let section = document.getElementById(sect);
    section.scrollIntoView({behavior: "smooth"});
}

getCurrentYear();

// Event Listeners
Object.values(projects).forEach(pBox => {
    pBox.querySelector(".projectBtn").addEventListener("click", projectOnClick);
})

// Event Listener for Nav buttons
links = document.getElementsByClassName("link");

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", (event) => {
        event.preventDefault();
        scrollToSection(links[i].getAttribute("href").substring(1));
    })
}

menuBtn.addEventListener("click", toggleMenu);
document.getElementById("aboutLinkMobile").addEventListener("click", () => {mobileLinkClick("");});
document.getElementById("skillsLinkMobile").addEventListener("click", () => {mobileLinkClick("");});
document.getElementById("projectLinkMobile").addEventListener("click", () => {mobileLinkClick("");});
document.getElementById("contactLinkMobile").addEventListener("click", () => {mobileLinkClick("");});

window.addEventListener("scroll", throttle(scrollFunction, 250));
window.addEventListener("resize", throttle(resetOnResize, 100));