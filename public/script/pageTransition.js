gsap.registerPlugin(ScrollToPlugin);

const btnToBeforeTest = document.querySelector("#toBeforeTest");
let tl = gsap.timeline();
btnToBeforeTest.addEventListener("click", e => {
    tl.set('#page-transition', {zIndex:999})
    .to('#page-transition', {opacity: 1, duration:0.5})
    .to(window, {duration:0, scrollTo: {y: ".before_test", offsetY: 150}})
    .to('#page-transition', {opacity: 0, duration:0.5})
    .set('#page-transition', {zIndex:-1});
})

const btnToAfterTest = document.querySelector("#toAfterTest");
btnToAfterTest.addEventListener("click", e => {
    tl.set('#page-transition', {zIndex:999})
    .to('#page-transition', {opacity: 1, duration:0.5})
    .to(window, {duration:0, scrollTo: {y: ".after_test", offsetY: 150}})
    .to('#page-transition', {opacity: 0, duration:0.5})
    .set('#page-transition', {zIndex:-1});
})

const btnBackToTop = document.querySelector("#backToTop");
btnBackToTop.addEventListener("click", e => {
    tl.set('#page-transition', {zIndex:999})
    .to('#page-transition', {opacity: 1, duration:0.5})
    .to(window, {scrollTo: 0,duration:0})
    .to('#page-transition', {opacity: 0, duration:0.5})
    .set('#page-transition', {zIndex:-1});
})

const btnSubmitBeforeTest = document.querySelector("#submitBeforeTest");
btnSubmitBeforeTest.addEventListener("click", e => {
    tl.set('#page-transition', {zIndex:999})
    .to('#page-transition', {opacity: 1, duration:0.5})
    .to(window, {duration: 0, scrollTo: {y: "#main_middle"}})
    .to('#page-transition', {opacity: 0, duration:0.5})
    .set('#page-transition', {zIndex:-1});
})


const btnSubmitAfterTest = document.querySelector("#submitAfterTest");
btnSubmitAfterTest.addEventListener("click", e => {
    tl.set('#page-transition', {zIndex:999})
    .to('#page-transition', {opacity: 1, duration:0.5})
    .to(window, {duration: 0, scrollTo: {y: "#main_bottom"}})
    .to('#page-transition', {opacity: 0, duration:0.5})
    .set('#page-transition', {zIndex:-1});
})
