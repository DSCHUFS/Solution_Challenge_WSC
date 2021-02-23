window.onload = () => {
    // from scroll.js
    let charts = scrollEvent();


    let overlays = Array.from(document.getElementsByClassName("overlay"));
    overlays.forEach((overlay, i) => {
        overlay.dataset.overlayIndex = i;
    })
    let overlaysHeight = overlays[0].offsetHeight;

    let animationLayer = Array.from(document.getElementsByClassName("animation"));
    animationLayer.forEach((animationLayer, i) => {
        animationLayer.dataset.animationIndex = i;
    })

    let img = document.getElementById("image");

    let i = 0;
    let bodyHeight = document.getElementById("main_middle").clientHeight;
    let documentTopMove = bodyHeight - overlaysHeight;
    let imgTopMove = bodyHeight - img.offsetHeight;
    let ratio = imgTopMove/documentTopMove;

    window.addEventListener("resize", e => {
        bodyHeight = document.getElementById("main_middle").clientHeight;
        documentTopMove = bodyHeight - overlaysHeight;
        imgTopMove = bodyHeight-img.offsetHeight;
        ratio = imgTopMove/documentTopMove;

        i = window.pageYOffset;
        img.style.top = `${i*ratio}px`;

        overlayX1 = overlays[0].getBoundingClientRect().left;
        overlayY1 = overlays[0].getBoundingClientRect().top;
        lcX = circle.getBoundingClientRect().left;
        lcY = circle.getBoundingClientRect().top;

        centerX2 = overlays[1].getBoundingClientRect().left + lcX - overlayX1;
        centerY2 = overlays[1].getBoundingClientRect().top + lcY - overlayY1;
        numCircle = overlays[1].children[0];
        ncX = numCircle.getBoundingClientRect().left;
        ncY = numCircle.getBoundingClientRect().top;
        distX = ncX - centerX2;
        distY = ncY - centerY2;
    })
    // not fixed overlay
    window.addEventListener("scroll", e => {
        i = window.pageYOffset;
        ratio = Math.min(1, i/documentTopMove);
        img.style.transform = `translate3d(0, ${imgTopMove*ratio}px, 0)`;
        allPageAnimation();
        
        if(i <= window.innerHeight*2) {
            firstPageAnimation1();
        } 
        if(i >= window.innerHeight*2 && i < window.innerHeight*3.5) {
            firstPageAnimation2();
        }
        if(i >= window.innerHeight*3 && i <window.innerHeight*4.5) {
            firstPageAnimation3();
        }
        // second page
        if(i >= window.innerHeight*4 && i <= window.innerHeight * 10) {
            secondPageAnimation();
        }

        if(i >= window.innerHeight*9 && i <= window.innerHeight * 15) {
            thirdPageAnimation();
        }

        if(i >= window.innerHeight*14 && i <= window.innerHeight * 20) {
            fourthPageAnimation();
        } 

        if(i >= window.innerHeight*19 && i <= window.innerHeight * 25) {
            fifthPageAnimation();
        } 
    });

    let numbers = [...document.getElementsByClassName("number grid_item1")];
    let centerX = numbers[0].getBoundingClientRect().left+numbers[0].getBoundingClientRect().width/2;
    let centerY = numbers[1].getBoundingClientRect().top+numbers[0].getBoundingClientRect().height/2;
    let rectNum;
    numCoordinate = [
        {numX:0, numY:0},
        {numX:0, numY:0},
        {numX:0, numY:0},
        {numX:0, numY:0}
    ]
    numbers.forEach((num, i) => {
        rectNum = num.getBoundingClientRect();
        numCoordinate[i].numX = rectNum.left + rectNum.width / 2;
        numCoordinate[i].numY = rectNum.top + rectNum.height / 2;
    })
    let circle = document.getElementsByClassName("text_container grid_item")[0];
    let circleText = circle.children[0];

    function firstPageAnimation1() {
        let ratio = Math.min(i/(window.innerHeight*2), 1);
        circle.style.transform = '';
        circleText.style.opacity = `1`;
        numbers.forEach((num, j) => {
            num.style.transform = `translate(${(centerX-numCoordinate[j].numX)*Math.pow(ratio, 2)}px, ${(centerY-numCoordinate[j].numY)*Math.pow(ratio, 2)}px)`;
            num.style.opacity = `${1-i/(window.innerHeight*2)}`
        })
        overlays[0].style.background = 1;
        overlays[0].style.position = 'fixed';
    }
    
    function firstPageAnimation2() {
        let ratio = Math.min(1,(i-window.innerHeight*2)/(window.innerHeight));
        circle.style.transform = `scale(${(-75*ratio+275)/275})`;

        numbers.forEach((num, j) => {
            num.style.opacity = `${0}`;
        })

        overlays[0].style.background = 1;
        overlays[0].style.position = 'fixed';
    }

    // 중간 큰 원 위치
    let overlayX1 = overlays[0].getBoundingClientRect().left;
    let overlayY1 = overlays[0].getBoundingClientRect().top;
    let lcX = circle.getBoundingClientRect().left;
    let lcY = circle.getBoundingClientRect().top;

    let centerX2 = overlays[1].getBoundingClientRect().left + lcX - overlayX1 + 37.5;
    let centerY2 = overlays[1].getBoundingClientRect().top + lcY - overlayY1 + 37.5;
    let numCircle = overlays[1].children[0];
    let ncX = numCircle.getBoundingClientRect().left;
    let ncY = numCircle.getBoundingClientRect().top;
    let distX = ncX - centerX2;
    let distY = ncY - centerY2;
    function firstPageAnimation3() {
        let ratio = Math.min(1, (i-window.innerHeight*3)/(window.innerHeight));
        circle.style.transform = `translate(${distX*ratio}px, ${distY*ratio}px) scale(${200/275}) `;
        circleText.style.opacity = `${1-ratio}`;
        overlays[0].style.opacity = 1;
        overlays[0].style.position = 'fixed';
    }

    function allPageAnimation() {
        numbers.forEach((num, j) => {
            num.style.opacity = `${0}`
        })

        overlays.forEach((page, i) => {
            if(i !== 0) page.style.opacity = 0;
            // else page.style.opacity = 1;
        })
        circle.style.transform = `translate(${distX}px, ${distY}px) scale(${200/275}) `;
        circleText.style.opacity = `${0}`;
    }

    let overlaychildren2 = Array.from(overlays[1].children);
    function secondPageAnimation() {
        let animeRect = animationLayer[1].getBoundingClientRect();
        let rect = overlays[1].getBoundingClientRect();
        let diff = animeRect.top-rect.top
        if(rect.top <= 0) {
            overlays[1].style.opacity = 1;
            overlays[0].style.opacity = 0;
            overlaychildren2[0].firstElementChild.style.opacity = 1;
            overlaychildren2[0].firstElementChild.style.transition = '0.5s';
        } else {
            overlays[1].style.opacity = 0;
            overlaychildren2.forEach((c,i) => {
                if(i == 0) {
                    c.firstElementChild.style.opacity = 0;
                } else {
                    c.style.opacity = 0;
                }
            })
        }

        if(diff <= -window.innerHeight) {
            overlaychildren2[1].style.opacity = 1;
            overlaychildren2[1].style.transition = `0.5s`;
        } else {
            overlaychildren2[1].style.opacity = 0;
        }

        if(diff <= -window.innerHeight*2) {
            overlaychildren2[2].style.opacity = 1;
            overlaychildren2[2].style.transition = `0.5s`;
            overlaychildren2[3].style.opacity = 1;
            overlaychildren2[3].style.transition = `0.5s`;
        } else {
            overlaychildren2[2].style.opacity = 0;
            overlaychildren2[3].style.opacity = 0;
        }

        if(diff <= -window.innerHeight*3) {
            overlaychildren2[4].style.opacity = 1;
            overlaychildren2[4].style.transition = `0.5s`;
            overlays[1].style.position = 'fixed'; // animation layer 500vh 일때
        } else {
            overlaychildren2[4].style.opacity = 0;
            overlays[1].style.position = 'sticky';
        }

        if(diff <= -window.innerHeight*4) {   
            overlaychildren2.forEach((c, i) => {
                if(i == 0) {
                    c.firstElementChild.style.opacity = 0;
                } else {
                    c.style.opacity = 0;
                }
            })
        }
    }
    
    let overlaychildren3 = Array.from(overlays[2].children);
    function thirdPageAnimation() {
        let animeRect = animationLayer[2].getBoundingClientRect();
        let rect = overlays[2].getBoundingClientRect();
        let diff = animeRect.top-rect.top
        if(rect.top <= 0) {
            overlays[1].style.opacity = 0; // 이전 통계 페이지 안보이게
            overlays[2].style.opacity = 1;
            overlaychildren3[0].firstElementChild.style.opacity = 1;
            overlaychildren3[0].firstElementChild.style.transition = '0.5s';
        } else {
            overlays[2].style.opacity = 0;
            overlaychildren3.forEach((c, i) => {
                if(i == 0) {
                    c.firstElementChild.style.opacity = 0;
                } else {
                    c.style.opacity = 0;
                }
            })
        }

        if(diff <= -window.innerHeight) {
            overlaychildren3[1].style.opacity = 1;
            overlaychildren3[1].style.transition = `0.5s`;
        } else {
            overlaychildren3[1].style.opacity = 0;
        }

        if(diff <= -window.innerHeight*2) {
            overlaychildren3[2].style.opacity = 1;
            overlaychildren3[2].style.transition = `0.5s`;
            overlaychildren3[3].style.opacity = 1;
            overlaychildren3[3].style.transition = `0.5s`;
            charts[0].update();
        } else {
            overlaychildren3[2].style.opacity = 0;
            overlaychildren3[3].style.opacity = 0;
            charts[0].reset();
        }

        if(diff <= -window.innerHeight*3) {
            overlaychildren3[4].style.opacity = 1;
            overlaychildren3[4].style.transition = `0.5s`;
            overlays[2].style.position = 'fixed'; // animation layer 500vh 일때
        } else {
            overlaychildren3[4].style.opacity = 0;
            overlays[2].style.position = 'sticky';
        }

        if(diff <= -window.innerHeight*4) {
            overlaychildren3.forEach((c, i) => {
                if(i == 0) {
                    c.firstElementChild.style.opacity = 0;
                } else {
                    c.style.opacity = 0;
                }
            })
            charts[0].reset();
        }
    }

    let overlaychildren4 = Array.from(overlays[3].children);
    function fourthPageAnimation() {
        let animeRect = animationLayer[3].getBoundingClientRect();
        let rect = overlays[3].getBoundingClientRect();
        let diff = animeRect.top-rect.top
        if(rect.top <= 0) {
            overlays[2].style.opacity = 0; // 이전 통계 페이지 안보이게
            overlays[3].style.opacity = 1;
            overlaychildren4[0].firstElementChild.style.opacity = 1;
            overlaychildren4[0].firstElementChild.style.transition = '0.5s';
        } else {
            overlays[3].style.opacity = 0;
            overlaychildren4.forEach((c, i) => {
                if(i == 0) {
                    c.firstElementChild.style.opacity = 0;
                } else {
                    c.style.opacity = 0;
                }
            })
        }

        if(diff <= -window.innerHeight) {
            overlaychildren4[1].style.opacity = 1;
            overlaychildren4[1].style.transition = `0.5s`;
        } else {
            overlaychildren4[1].style.opacity = 0;
        }

        if(diff <= -window.innerHeight*2) {
            overlaychildren4[2].style.opacity = 1;
            overlaychildren4[2].style.transition = `0.5s`;
            overlaychildren4[3].style.opacity = 1;
            overlaychildren4[3].style.transition = `0.5s`;
            charts[1].update();
        } else {
            overlaychildren4[2].style.opacity = 0;
            overlaychildren4[3].style.opacity = 0;
            charts[1].reset();
        }

        if(diff <= -window.innerHeight*3) {
            overlaychildren4[4].style.opacity = 1;
            overlaychildren4[4].style.transition = `0.5s`;
            overlays[3].style.position = 'fixed'; // animation layer 500vh 일때
        } else {
            overlaychildren4[4].style.opacity = 0;
            overlays[3].style.position = 'sticky';
        }

        if(diff <= -window.innerHeight*4) {
            overlaychildren4.forEach((c, i) => {
                if(i == 0) {
                    c.firstElementChild.style.opacity = 0;
                } else {
                    c.style.opacity = 0;
                }
            })
            charts[1].reset();
        }
    }

    let overlaychildren5 = Array.from(overlays[4].children);
    function fifthPageAnimation() {
        let animeRect = animationLayer[4].getBoundingClientRect();
        let rect = overlays[4].getBoundingClientRect();
        let diff = animeRect.top-rect.top
        if(rect.top <= 0) {
            overlays[0].style.position = 'sticky'; // 첫번째 페이지 안보이게
            overlays[3].style.opacity = 0; // 이전 통계 페이지 안보이게
            overlays[4].style.opacity = 1;
            overlaychildren5[0].firstElementChild.style.opacity = 1;
            overlaychildren5[0].firstElementChild.style.transition = '0.5s';
        } else {
            overlays[0].style.position = 'fixed';
            overlays[4].style.opacity = 0;
            overlaychildren5.forEach((c, i) => {
                if(i == 0) {
                    c.firstElementChild.style.opacity = 0;
                } else {
                    c.style.opacity = 0;
                }
            })
        }

        if(diff <= -window.innerHeight) {
            overlaychildren5[1].style.opacity = 1;
            overlaychildren5[1].style.transition = `0.5s`;
        } else {
            overlaychildren5[1].style.opacity = 0;
        }

        if(diff <= -window.innerHeight*2) {
            overlaychildren5[2].style.opacity = 1;
            overlaychildren5[2].style.transition = `0.5s`;
            overlaychildren5[3].style.opacity = 1;
            overlaychildren5[3].style.transition = `0.5s`;
            charts[2].update();
        } else {
            overlaychildren5[2].style.opacity = 0;
            overlaychildren5[3].style.opacity = 0;
            charts[2].reset();
        }

        if(diff <= -window.innerHeight*3) {
            overlaychildren5[4].style.opacity = 1;
            overlaychildren5[4].style.transition = `0.5s`;
        } else {
            overlaychildren5[4].style.opacity = 0;
        }

        if(diff <= -window.innerHeight*4.5) {
            overlaychildren5.forEach((c, i) => {
                if(i == 0) {
                    c.firstElementChild.style.opacity = 0;
                } else {
                    c.style.opacity = 0;
                }
            })
            charts[2].reset();
        }
    }
}




