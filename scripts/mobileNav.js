let menuBtn = document.getElementById("navBtn");
let opacityLayer = document.getElementById("opacityLayer")

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
}

const toggleMenu = () => {
    document.body.classList.toggle("menuVisible");
    toggleOpacityLayer();
    opacityLayer.style.zIndex = 6502;
}

// const toggleOpacityLayer = () => {
    
//     if (opacityLayer.style.opacity == 0) { // Add the proper styles to the opacity layer
//         opacityLayer.style.height = "100vh";
//         opacityLayer.style.width = "100vw";
//         opacityLayer.style.opacity = 0.3;
//         // Add a click event to the opacity layer to remove the opacity layer
//         opacityLayer.addEventListener("click", toggleOpacityLayer, {once: true})
//     } else if (opacityLayer.style.opacity == 0.3) {
//         opacityLayer.style.opacity = 0;
        
        

//         // Check if we need to remove the side menu or a card
//         if (document.body.classList.contains("menuVisible")) {
//             console.log("ligma BALLS!")
//             toggleMenu();
//         }

//         opacityLayer.addEventListener("transitionend", () => {
//             opacityLayer.style.height = "0px";
//             opacityLayer.style.width = "0px";
//         }, {once: true})
//     }
// }

// const toggleMenu = () => {
//     document.body.classList.toggle("menuVisible");
//     console.log(document.getElementById("navMenu").classList.contains("menuVisible"));
//     toggleOpacityLayer();
// }

    // Add the click event
//     opacityLayer.addEventListener("click", () => {

//     }), {once: true};
// }

// const toggleMenu = () => {
//     document.body.classList.toggle("menuVisible");

//     if (!opacityLayer.classList.contains("nowExists") 
//     && !opacityLayer.classList.contains("turnedOn")) {
//         opacityLayer.classList.toggle("nowExists");
//         opacityLayer.classList.toggle("turnedOn");
        
//     } 
//     else {
//         opacityLayer.classList.toggle("turnedOn");
//         opacityLayer.addEventListener("transitionend", hideOpacityLayer);
//     }
// }

// const hideOpacityLayer = () => {
//     opacityLayer.classList.toggle("nowExists");
//     opacityLayer.removeEventListener("transitionend", hideOpacityLayer);
// }

// const showOpacityLayer = () => {
    
// }

// // Event listeners
menuBtn.addEventListener("click", toggleMenu);
// opacityLayer.addEventListener("click", toggleMenu);