const projects = document.getElementsByClassName("projectBox");

const projectOnClick = (e) => {
    const projectCard = e.currentTarget.parentElement;

    projectCard.classList.add("activeProjectBox");
}

for (let i = 0; i < projects.length; i++) {
    console.log(projects[i]);
    projects[i].querySelector(".projectBtn").addEventListener("click", projectOnClick);
}