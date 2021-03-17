Cookies.set('lang', 'kr');
let krChange = document.querySelector('#kr');
let enChange = document.querySelector('#en');
let cookie = Cookies.get();

function chooseLang() {

    if(cookie.lang === "kr") {
        krChange.style.color = "#008B9F";
        enChange.style.color = "#B3B5B9";
    } else if(cookie.lang === "en") {
        enChange.style.color = "#008B9F";
        krChange.style.color = "#B3B5B9";
    }
}

chooseLang();

krChange.addEventListener("click", (e) => {
    Cookies.set('lang', 'kr');
    chooseLang();
})

krChange.addEventListener("mouseover", (e) => {
    krChange.style.color = "#008B9F";
})

krChange.addEventListener("mouseleave", (e) => {
    if(cookie.lang !== "kr") krChange.style.color = "#B3B5B9";
})

enChange.addEventListener("click", (e) => {
    Cookies.set('lang', 'en');
    chooseLang();
})

enChange.addEventListener("mouseover", (e) => {
    enChange.style.color = "#008B9F";
})

enChange.addEventListener("mouseleave", (e) => {
    if(cookie.lang !== "en") enChange.style.color = "#B3B5B9";
})