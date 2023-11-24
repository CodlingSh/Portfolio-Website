const projectClick = async (e) => {
    const originalBox = e.currentTarget.parentElement.parentElement;
    const cloneBox = originalBox.cloneNode(true);
    
    e.preventDefault();
    let {top, left, width, height} = originalBox.getBoundingClientRect();
    
    // Prevent the page from scrolling
    document.body.classList.add("bodyLock");
    // Set initial style
    cloneBox.style.backgroundColor = "red";
    cloneBox.style.position = "fixed";
    cloneBox.style.top = `${top}px`;
    cloneBox.style.left = `${left}px`; 
    cloneBox.style.width = `${width}px`;
    cloneBox.style.height = `${height}px`;

    //Append modal to project_grid
    originalBox.parentElement.appendChild(cloneBox);

    // Set active style
    //cloneBox.style.top = `${top}px`;
    //cloneBox.style.left = `${left}px`; 
    setTimeout(() => {
        cloneBox.style.removeProperty("top");
        cloneBox.style.removeProperty("left");
        cloneBox.style.removeProperty("width");
        cloneBox.style.removeProperty("height");
        cloneBox.classList.add("activeStyle");
    }, 0);
}

projectBtns = document.getElementsByClassName("projectBtn")
projectBtnsArray = Array.from(projectBtns)

projectBtnsArray.forEach(element => {
    element.addEventListener("click", projectClick);
});
//console.log(projects)