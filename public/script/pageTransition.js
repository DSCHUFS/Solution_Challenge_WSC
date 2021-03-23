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

const btnOptions = [{
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
    }
]

btnOptions.forEach(({ btnSelector, pageSelector, offsetY }) => {
    addPageTransition(btnSelector, pageSelector, offsetY);
})


const page = ["#main_top", "#main_middle", "#main_bottom", ".before_test", ".after_test"];

page.forEach(p => {
    document.querySelector(p).style.height = window.innerHeight + 'px';
})