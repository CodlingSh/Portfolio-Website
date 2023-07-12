const projects = document.getElementsByClassName("projectBox");

const openProjectBox = async (element) => {

}

const toggleProjectBox = async (element) => {
    let duration;

    return new Promise((res) => {
        if (element.classList.contains("activeStyle")) {
            duration = 300;
        } else if (!element.classList.contains("activeStyle")) {
            duration = 10000;
        }
        element.classList.toggle("activeStyle");    
        toggleOpacityLayer();
        console.log(duration);
        setTimeout(res, duration);
    })
}

const projectOnClick = async (e) => {
    const ogPBox = e.currentTarget.parentElement;
    const clonePBox = ogPBox.cloneNode(true);
    const dynamicStyle = document.getElementById("jsStyle");

    let {top, left, width, height} = ogPBox.getBoundingClientRect();

    console.log(top, left, width, height);
    dynamicStyle.innerHTML = ".tempStyle {position: fixed; margin: 0; top: " + top + "px; left: " + left + "px; width: " + width + "px; height: " + height + "px;} .activeStyle {position: fixed; left: 31.5vw; top: 5vh; height: 90vh; width: 37vw; z-index: 9001;}"
    clonePBox.classList.add("tempStyle");
    ogPBox.parentElement.appendChild(clonePBox);
    document.body.classList.add("bodyLock");
    // setTimeout(() => {clonePBox.classList.toggle("activeStyle")}, 0);
    // toggleOpacityLayer();
    // console.log("test");
    // 
    // ogPBox.style.opacity = 0;
    // opacityLayer.style.zIndex = 9000;
    // 
        // 
// 
    // let closeBtn = clonePBox.getElementsByClassName("closeBtn")[0];
// 
    // closeBtn.addEventListener("click", async () => {
        // await toggleProjectBox(clonePBox);
        // clonePBox.remove();
        // ogPBox.style.opacity = 1;
        // document.body.classList.remove("bodyLock");
    // }, {once: true});
// 
    // opacityLayer.addEventListener("click", async () => {
        // await toggleProjectBox(clonePBox);
        // clonePBox.remove();
        // ogPBox.style.opacity = 1;
        // document.body.classList.remove("bodyLock");
    // }, {once: true});


}

Object.values(projects).forEach(pBox => {
    pBox.querySelector(".projectBtn").addEventListener("click", projectOnClick);
})