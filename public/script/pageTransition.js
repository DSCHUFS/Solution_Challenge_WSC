gsap.registerPlugin(ScrollToPlugin);

let tl = gsap.timeline();

const btnOptions = [
    {
        btnSelector: "#toBeforeTest",
        pageSelector: ".before_test",
        offsetY: 150
    },
    {
        btnSelector: "#toAfterTest",
        pageSelector: ".after_test",
        offsetY: 150
    },
    {
        btnSelector: "#backToTop",
        pageSelector: "body",
        offsetY: 0
    },
    {
        btnSelector: "#submitBeforeTest",
        pageSelector: "#main_middle",
        offsetY: 0
    },
    {
        btnSelector: "#submitAfterTest",
        pageSelector: "#main_bottom",
        offsetY: 0
    }
]

function addPageTransition(btnSelector, pageSelector, offsetY) {
    const btn = document.querySelector(btnSelector);
    btn.addEventListener("click", e => {
        pageTransition(pageSelector, offsetY);
    })
}

function pageTransition(pageSelector, offsetY) {
    tl.set('#page-transition', { zIndex: 999 })
        .to('#page-transition', { opacity: 1, duration: 0.5 })
        .to(window, { duration: 0, scrollTo: { y: pageSelector, offsetY: offsetY } })
        .to('#page-transition', { opacity: 0, duration: 0.5 })
        .set('#page-transition', { zIndex: -1 });
}


btnOptions.forEach(({ btnSelector, pageSelector, offsetY }) => {
    addPageTransition(btnSelector, pageSelector, offsetY);
})