// Variables to hold the individual pages.
let about =  document.getElementById("aboutMe2");
let skills =  document.getElementById("mySkills2");
let projects = document.getElementById("myProjects2");
let contact = document.getElementById("contactMe2");
let resume = document.getElementById("myResume2");
// Array to hold the pages
let pageList = [about, projects]/*, contact, resume];*/
// Main section
let mainSection = document.getElementById("header");

/* 
WHAT NEEDS TO HAPPEN
    1. header disappears
    2. jump scrolling to top of the page
    3. make page visible
    4. scroll page to the top
*/

function showPage(currPage) {
    mainSection.addEventListener("transitionend", revealPage);
    mainSection.classList.add("mainSectionInvisible");
    function revealPage() {
        window.scrollTo(0,0);
        currPage.classList.add("pageIsVisible");
        currPage.classList.remove("pageOffScreen");
        mainSection.style.display = "none";
        mainSection.removeEventListener("transitionend", revealPage);
    }
}

/* 
WHAT NEEDS TO HAPPEN
    1. Page goes to the bottom
    2. page dissapears
    3. main section starts to fade back in
*/

function hidePage(currPage) {
    currPage.addEventListener("transitionend", removePage);
    currPage.classList.add("pageOffScreen");
    mainSection.style.display = "flex";
    function removePage() {
        currPage.classList.remove("pageIsVisible");
        mainSection.classList.remove("mainSectionInvisible");
        currPage.removeEventListener("transitionend", removePage);
    }
}

function checkHashChange(/*currentPage*/) {
    currentPage = window.location.hash;

    switch(currentPage) {
        case "#aboutMe":
            console.log("You are on the about me page");
            showPage(about);
            break;
        case "#mySkills":
            console.log("You are on the projects page");
            showPage(skills)
            break;
        case "#myProjects":
            console.log("You are on the projects page");
            showPage(projects)
            break;
        case "#contactMe":
            console.log("You are on the contact me page");
            showPage(contact)
            break;
        case "#myResume":
            console.log("You are on the resume page");
            showPage(resume)
            break;
    }
}



// Listen for hash changes and deliver the proper page
window.addEventListener("hashchange", checkHashChange);
window.addEventListener("load", checkHashChange);