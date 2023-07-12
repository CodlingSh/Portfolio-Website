const menuBtn = document.getElementById("navBtn");
const opacityLayer = document.getElementById("opacityLayer");

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
        opacityLayer.removeEventListener("click", toggleMenu);
    }
}

const toggleMenu = () => {
    document.body.classList.toggle("menuVisible");
    toggleOpacityLayer();
    opacityLayer.addEventListener("click", toggleMenu);
}

const mobileLinkClick = (section) => {
    window.location.assign = "#" + section;
    toggleMenu();
}

// Event Listeners
menuBtn.addEventListener("click", toggleMenu);
document.getElementById("homeLinkMobile").addEventListener("click", () => {mobileLinkClick("");});
document.getElementById("aboutLinkMobile").addEventListener("click", () => {mobileLinkClick("");});
document.getElementById("skillsLinkMobile").addEventListener("click", () => {mobileLinkClick("");});
document.getElementById("projectLinkMobile").addEventListener("click", () => {mobileLinkClick("");});
document.getElementById("contactLinkMobile").addEventListener("click", () => {mobileLinkClick("");});