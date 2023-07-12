// let opacityLayer = document.getElementById("opacityLayer");
const projects = document.getElementsByClassName("projectBox");



const toggleExpansion = async (element, to, duration = 300) => {
    console.log("to.top = " + to.height.substring(0, 2));
    
    if (to.top == null && to.left == null) {
        to.top = (100 - Number(to.height.substring(0, 2))) / 2 + "vh";
        to.left = (100 - Number(to.width.substring(0, 2))) / 2 + "vw";
    }
    
    return new Promise((res) => {
        element.classList.add("activeProjectBox");
        // element.animate([{
        //     top: to.top,
        //     left: to.left,
        //     width: to.width,
        //     height: to.height,       
        // }], {duration, fill: 'forwards', ease: 'linear'})
        setTimeout(res, duration);
    })
}

const projectOnClick = async (e) => {
    const projectCard = e.currentTarget.parentElement;
    const projectClone = projectCard.cloneNode(true);

    let {top, left, width, height} = projectCard.getBoundingClientRect();

    projectClone.style.position = "fixed";
    projectClone.style.top = top + "px";
    projectClone.style.left = left + "px";
    projectClone.style.width = width + "px";
    projectClone.style.height = height + "px";
    projectClone.style.maxWidth = "none";
    projectClone.style.margin = "0";
    projectClone.style.zIndex = "9000";
    projectClone.querySelector(".closeBtn").style.opacity = "1";
    
    projectClone.querySelectorAll(".visible").forEach(element => {
        element.style.display = "none";
    });

    projectClone.querySelectorAll(".hidden").forEach(element => {
        element.style.display = "block";
    })

    projectCard.parentNode.appendChild(projectClone);
    projectCard.style.opacity = "0";
    document.body.classList.add("bodyLock");
    toggleOpacityLayer();
    await toggleExpansion(projectClone, {top: null, left: null, width: "40vw", height: "90vh"});

    // projectClone.classList.add("test");
    // projectClone.removeAttribute("style");

    projectClone.style.overflowY = "auto";

    const resizeVariables = async () => {
        // let {top, left, width, height} = projectCard.getBoundingClientRect();

        console.log("The top is at " + top);
        console.log("The left is at " + left);

        await toggleExpansion(projectClone, {top: null, left: null, width: "40vw", height: "90vh"});
        console.log("done");
    }

    window.addEventListener("resize", resizeVariables);

    projectClone.querySelector(".closeBtn").addEventListener("click", async () => {
        toggleOpacityLayer();
        projectClone.style.overflowY = "hidden";
        await toggleExpansion(projectClone, {top: top + "px", left: left + "px", width: width + "px", height: height + "px"})
        projectCard.style.opacity = 1;
        document.body.classList.remove("bodyLock");
        projectClone.remove();
    }, {once: true});
}

for (let i = 0; i < projects.length; i++) {
    console.log(projects[i]);
    projects[i].querySelector(".projectBtn").addEventListener("click", projectOnClick);
}