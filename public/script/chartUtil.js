Chart.defaults.global.defaultFontColor = "rgba(0, 0, 0, 0.7)";
Chart.defaults.global.defaultFontFamily = "Noto Sans KR";
Chart.defaults.global.defaultFontSize = 13;

const people = [...(document.getElementsByClassName("img_person"))];

const control = Array.from(document.getElementsByClassName("control"));
let isClick = [false, false];
let className = [".img_person1", ".img_person2"]
function click() {
    control.forEach((c, i) => {
        c.addEventListener("click", e => {
            if(!isClick[i]) {
                c.lastElementChild.style.textDecoration = 'line-through';
                hide(className[i]);
            } else {
                c.lastElementChild.style.textDecoration = 'none';
                visible(className[i]);
            }
            isClick[i] = !isClick[i];
        })
    })
}

click();

function hide(className) {
    gsap.timeline()
        .to(className, {opacity:0 , stagger: 0.01, duration: 0.5});
}

function visible(className) {
    gsap.timeline()
        .to(className, {opacity:1, stagger: 0.01, duration: 0.5});
}

function hover() {
    people.forEach((person, i) => {
        if(i == 0) {
            addHoverEvent(person, '#hover_icon1');
            addLeaveEvent(person, '#hover_icon1');
        } else {
            addHoverEvent(person, '#hover_icon2');
            addLeaveEvent(person, '#hover_icon2');
        }
    })
}

function addHoverEvent(elem, anime) {
    elem.addEventListener("mouseover", e => {
        gsap.to(anime, {opacity: 1,  duration: 0.5});
    })
}

function addLeaveEvent(elem, anime) {
    elem.addEventListener("mouseleave", e => {
        gsap.to(anime, {opacity: 0,  duration: 0.5});
    })
}

hover();