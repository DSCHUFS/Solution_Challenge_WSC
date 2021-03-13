let curLang = "kr";
let krChange = document.querySelector('#kr');
let enChange = document.querySelector('#en');

function chooseLang() {
    if(curLang === "kr") {
        krChange.style.color = "#008B9F";
        enChange.style.color = "#B3B5B9";
    } else if(curLang === "en") {
        enChange.style.color = "#008B9F";
        krChange.style.color = "#B3B5B9";
    }
}

chooseLang();

krChange.addEventListener("click", (e) => {
    curLang = "kr";
    chooseLang();
})

krChange.addEventListener("mouseover", (e) => {
    krChange.style.color = "#008B9F";
})

krChange.addEventListener("mouseleave", (e) => {
    if(curLang !== "kr") krChange.style.color = "#B3B5B9";
})

enChange.addEventListener("click", (e) => {
    curLang = "en";
    chooseLang();
})

enChange.addEventListener("mouseover", (e) => {
    enChange.style.color = "#008B9F";
})

enChange.addEventListener("mouseleave", (e) => {
    if(curLang !== "en") enChange.style.color = "#B3B5B9";
})