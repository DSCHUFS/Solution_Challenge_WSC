gsap.registerPlugin(ScrollToPlugin);

const menu = document.querySelector("#menu");
let curPage = "#main_top";
menu.addEventListener("mouseover", (e) => {
    $('#path-menu').show();
})

menu.addEventListener("mouseleave", (e) => {
    $('#path-menu').hide();
})


let tl = gsap.timeline();

const btnOptions = [
    {
        btnSelector: "#toBeforeTest",
        pageSelector: ".before_test",
        offsetY: 0
    },
    {
        btnSelector: "#pathToBeforeTest",
        pageSelector: ".before_test",
        offsetY: 0
    },
    {
        btnSelector: "#toAfterTest",
        pageSelector: ".after_test",
        offsetY: 0
    },
    {
        btnSelector: "#pathToAfterTest",
        pageSelector: ".after_test",
        offsetY: 0
    },
    {
        btnSelector: "#backToTop",
        pageSelector: "#main_top",
        offsetY: 0
    },
    {
        btnSelector: "#pathToTop",
        pageSelector: "#main_top",
        offsetY: 0
    },
    {
        btnSelector: "#pathToBottom",
        pageSelector: "#main_bottom",
        offsetY: 0
    },
    {
        btnSelector: "#pathToMiddle",
        pageSelector: "#main_middle",
        offsetY: 0
    },
    {
        btnSelector: "#transTomainMiddle",
        pageSelector: "#main_middle",
        offsetY: 0
    },
    {
        btnSelector: "#transTomainBottom",
        pageSelector: "#main_bottom",
        offsetY: 0
    }
]


function pageTransition(pageSelector, offsetY) {
    gsap.timeline().set('#page-transition', { zIndex: 999 })
        .to('#page-transition', { opacity: 1, duration: 0.5 })
        .to('#root', { duration: 0, scrollTo: { y: pageSelector, offsetY: offsetY } })
        .to('#page-transition', { opacity: 0, duration: 0.5 })
        .set('#page-transition', { zIndex: -1 });
    curPage = pageSelector;
}

function addPageTransition(btnSelector, pageSelector, offsetY) {
    const btn = document.querySelector(btnSelector);
    btn.addEventListener("click", e => {
        pageTransition(pageSelector, offsetY);
        Cookies.set('curPage', pageSelector);
    })
}

btnOptions.forEach(({ btnSelector, pageSelector, offsetY }) => {
    addPageTransition(btnSelector, pageSelector, offsetY);
})

