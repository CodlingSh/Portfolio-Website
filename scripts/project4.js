const projects = document.getElementsByClassName("projectBox");

const closeProject = async (element) => {
    return new Promise((res) => {
        element.classList.remove("activeStyle");
        toggleOpacityLayer();
        setTimeout(res, 300);
    })
}

const projectOnClick = async (e) => {
    const originalBox = e.currentTarget.parentElement;
    const cloneBox = originalBox.cloneNode(true);
    const dynamicStyle = document.getElementById("jsStyle");
    const mobileHeight = window.innerHeight;

    // alert("height is " + mobileHeight);
    // console.log("height is " + mobileHeight * 0.035);
    
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
        /*left: 2.5vw; 
        top: 3.5vh;*/
        transform: translateX(calc(2.5vw - ${left}px)) translateY(calc(${mobileHeight * 0.035}px - ${top}px));
        height: ${mobileHeight * 0.93}px; 
        width: 95vw; 
        z-index: 9001;
    }
    
    @media only screen and (min-width: 730px) {
        .activeStyle {
            /*left: 32.5vw; 
            top: 3.5vh;*/
            transform: translateX(calc(32.5vw - ${left}px)) translateY(calc(3.5vh - ${top}px)); 
            height: 93vh; 
            width: 37vw; 
            z-index: 9001;
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

    closeBtn.addEventListener("click", async () => {
        await closeProject(cloneBox);
        document.body.classList.remove("bodyLock");
        cloneBox.classList.remove("initStyle");
        cloneBox.remove();
        originalBox.style.opacity = 1;
    }, {once: true});
}

Object.values(projects).forEach(pBox => {
    pBox.querySelector(".projectBtn").addEventListener("click", projectOnClick);
})