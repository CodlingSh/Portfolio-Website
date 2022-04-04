// Variables to hold the individual pages.
let about =  document.getElementById("aboutMe2");
let projects = document.getElementById("myProjects");
let contact = document.getElementById("contactMe");
let resume = document.getElementById("myResume");
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

function showPage() {
    let currentPage = window.location.hash;
    console.log(currentPage);

    if (currentPage === "#aboutMe") {
        mainSection.classList.add("mainSectionInvisible");

        mainSection.addEventListener("transitionend", () => {
            window.scrollTo(0,0);
            about.classList.add("pageIsVisible");
            about.classList.add("pageIsMoved");
        }, {once: true})

    } else if (currentPage === "#myProjects") {
        about.style.transform = "translateY(1000px)"
        mainSection.style.opacity = "0";
        projects.classList.toggle("isVisible");
        projects.classList.toggle("isMoved");
    } else if (currentPage === "#contactMe") {
        about.style.transform = "translateY(1000px)"
        mainSection.style.opacity = "0";
        about.classList.toggle("isVisible");
    } else if (currentPage === "#myResume") {
        about.style.transform = "translateY(1000px)"
        mainSection.style.opacity = "0";
        about.classList.toggle("isVisible");
    } //else {
        // about.classList.remove("isMoved");
        // mainSection.style.opacity = "1";

        // about.addEventListener("transitionend", () => {
        //     about.classList.remove("isVisible");
        //     mainSection.style.opacity = "1";
        //     alert("Transition is over");
        // }, {once: true})
        // The problem here is that this event listener is getting added on load
        
        // mainSection.style.opacity = "1";

        

        // about.classList.remove("isVisible");
        // about.classList.remove("isMoved");
        // projects.classList.remove("isVisible");
        // contact.classList.remove("isVisible");
        // resume.classList.remove("isVisible");
    //}
}

function hidePage(thePage) {
    
        // about.classList.remove("pageIsMoved");

        about.addEventListener("transitionend", () => {
            console.log("Click event has fired");
            about.classList.remove("pageIsMoved");
            // about.classList.remove("pageIsVisible");
            mainSection.classList.remove("mainSectionInvisible");
        }, {once: true});
        

    // for (i in pageList) {
    //     pageList[i].classList.remove("isMoved");

    //     pageList[i].addEventListener("transitionend", () => {
    //         console.log("This works!")
    //         pageList[i].classList.remove("isVisible");
    //     }, {once: true})
    // }
}

// Listen for hash changes and deliver the proper page
window.addEventListener("hashchange", showPage);
window.addEventListener("load", showPage);