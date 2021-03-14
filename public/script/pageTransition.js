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
        btnSelector: "#toAfterTest",
        pageSelector: ".after_test",
        offsetY: 0
    },
    {
        btnSelector: "#backToTop",
        pageSelector: "#main_top",
        offsetY: 0
    },
    {
        btnSelector: "#toTop",
        pageSelector: "#main_top",
        offsetY: 0
    },
    {
        btnSelector: "#transTomainMiddle",
        pageSelector: "#main_middle",
        offsetY: 0
    },
    {
        btnSelector: "#toMiddle",
        pageSelector: "#main_middle",
        offsetY: 0
    },
    {
        btnSelector: "#transTomainBottom",
        pageSelector: "#main_bottom",
        offsetY: 0
    },
    {
        btnSelector: "#toBottom",
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
    curPage = pageSelector;
}


btnOptions.forEach(({ btnSelector, pageSelector, offsetY }) => {
    addPageTransition(btnSelector, pageSelector, offsetY);
})

let pageSelector = ['#main_top', '.before_test', '#main_middle','.after_test', "#main_bottom"];
function currPageState() {
    let curYOffset = $(document).scrollTop();
    let height = window.innerHeight;
    let index = parseInt(curYOffset/height);
    console.log(index);
    return pageSelector[index];
}
//if reload
curPage = currPageState();

window.addEventListener("resize", e => {
    console.log(curPage);
    gsap.to(window, { duration: 0, scrollTo: { y: curPage} })
})

