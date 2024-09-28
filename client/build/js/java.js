function openPopup(popName) {
    document.getElementsByClassName(popName)[0].classList.add("active");
}

function closePopup(name) {
    document.getElementsByClassName(name)[0].classList.remove("active");
}

function openSelect(id) {
    document.getElementById(id).parentElement.childNodes[1].classList.toggle("open");
}

function openSubmenu(name) {
    let isopen = document.getElementById(name).classList.contains("open");

    document
        .getElementById(name)
        .parentElement.parentElement.querySelectorAll(".nav-content")
        .forEach((item) => {
            item.classList.remove("open");
        });

    if (isopen) {
        document.getElementById(name).classList.remove("open");
    } else {
        document.getElementById(name).classList.add("open");
    }
}
