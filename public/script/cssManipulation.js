function translate3d(elem, x, y, z, ratio, pow) {
    let easing = Math.pow(ratio, pow);
    elem.style.transform = `translate3d(${x*easing}px, ${y*easing}px, ${z*easing}px)`;

    return elem;
}

function changeOpacity(elem, opac) {
    elem.style.opacity = opac;

    return elem;
}

function changePosition(elem, pos) {
    elem.style.position = pos;

    return elem;
}

function scale(elem, times) {
    elem.style.transform = ``;  
}

