class PageAnimation {
    
    constructor() {
        // animation element
        this.animationLayer = Array.from(document.getElementsByClassName("animation"));
        this.animationLayer.forEach((animationLayer, i) => {
            animationLayer.dataset.animationIndex = i;
        })

        // overlay element
        this.overlays = Array.from(document.getElementsByClassName("overlay"));
        this.overlays.forEach((overlay, i) => {
            overlay.dataset.overlayIndex = i;
        })

        // image element
        this.img = document.getElementById("secondImage");

        // charts array
        this.charts = getCharts();

        // 편견을 부수는 숫자 페이지의 number element
        this.numbers = [...document.getElementsByClassName("number grid_item1")];
        this.rectRow = this.numbers[0].getBoundingClientRect();
        this.rectCol = this.numbers[1].getBoundingClientRect();
        // 움직일 위치
        this.centerX = this.rectRow.left + this.rectRow.width/2;
        this.centerY = this.rectCol.top + this.rectCol.height/2;
        // 숫자의 위치
        this.numCoordinate = [];
        this.numbers.forEach(num => {
            let rectNum = num.getBoundingClientRect();
            this.numCoordinate.push({
                numX: rectNum.left+rectNum.width/2,
                numY: rectNum.top+rectNum.height/2
            })
        })
        // 편견을 부수는 숫자 원
        this.circle = document.getElementById("circle_text_container");
        this.circleText = this.circle.firstElementChild;

        // 첫번째 overlay
        this.overlayRect0 = this.overlays[0].getBoundingClientRect()
        this.overlayX0 = this.overlayRect0.left;
        this.overlayY0 = this.overlayRect0.top;
        // 편견을 부수는 숫자 원 위치
        this.circleRect = this.circle.getBoundingClientRect();
        this.lcX = this.circleRect.left;
        this.lcY = this.circleRect.top;
        // 숫자가 들어있는 원
        this.numCircle = this.overlays[1].firstElementChild;
        this.numCircleRect = this.numCircle.getBoundingClientRect();
        this.ncX = this.numCircleRect.left;
        this.ncY = this.numCircleRect.top;
        // 보정값
        this.correction = (this.circle.offsetWidth - this.numCircle.offsetWidth) / 2;
        // 두번째 overlay
        this.overlayRect1 = this.overlays[1].getBoundingClientRect();
        this.centerX2 = this.overlayRect1.left + this.lcX - this.overlayX0 + this.correction;
        this.centerY2 = this.overlayRect1.top + this.lcY - this.overlayY0 + this.correction;
        // 움직이는 방향과 거리
        this.distX = this.ncX - this.centerX2;
        this.distY = this.ncY - this.centerY2;

        // main_middle height
        this.bodyHeight = document.getElementById("main_middle").clientHeight;
        this.documentTopMove = this.bodyHeight - this.overlays[0].offsetHeight;
        this.imgTopMove = this.bodyHeight - this.img.offsetHeight;
    }

    imgParallaxScroll(i) {
        let ratio = Math.min(1, Math.max(0,(i-window.innerHeight)/this.documentTopMove));
        this.img.style.transform = `translate3d(0, ${this.imgTopMove*ratio}px, 0)`;
    }

    allPageAnimation() {
        this.overlays.forEach((overlay, i) => {
            if(i!==0) overlay.style.position = 'sticky';
        })
    }

    reset() {
        // 원 상태로 복구
        this.circle.style.transform = '';
        this.circleText.style.opacity = 1;
        this.overlays[0].style.opacity = 1;
        this.overlays[0].style.position = 'sticky';
    }

    firstPageAnimation(i) {
        // i: window.pageYoffset
        let ratio;
        let animationRect = this.animationLayer[0].getBoundingClientRect();
        let overlayRect = this.overlays[0].getBoundingClientRect();
        let diff = overlayRect.top - animationRect.top;
    
        // scroll에 따라 숫자 이동.
        if(diff <= window.innerHeight*2) {
            ratio = Math.min(Math.max(0, (i-window.innerHeight)/(window.innerHeight*2)), 1);
            this.numbers.forEach((num, j) => {
                num.style.transform = `translate(${(this.centerX-this.numCoordinate[j].numX)*Math.pow(ratio, 2)}px, ${(this.centerY-this.numCoordinate[j].numY)*Math.pow(ratio, 2)}px)`;
                num.style.opacity = `${1-ratio}`;
            })
            this.reset();
        }
        
        // 원 작아지는 애니메이션.
        if(diff >= window.innerHeight*2 && diff < window.innerHeight*3.5) {
            ratio = Math.min((i-window.innerHeight*3)/(window.innerHeight*2), 1);
            this.circle.style.transform = `scale(${(-75*ratio+275)/275})`;
            this.numbers.forEach(num => {
                num.style.opacity = 0;
            })
            this.overlays[0].style.opacity = 1;
            this.overlays[0].style.position = 'fixed';
        }
    
        if(diff >= window.innerHeight*3) {
            ratio = Math.min((i-window.innerHeight*4)/window.innerHeight, 1);
            this.circle.style.transform = `translate(${this.distX*ratio}px, ${this.distY*ratio}px) scale(${this.numCircle.offsetWidth/this.circle.offsetWidth})`;
            this.circleText.style.opacity = `${1-ratio}`;
            this.numbers.forEach((num, j) => {
                num.style.opacity = 0;
            })
            this.overlays[0].style.opacity = 1;
            this.overlays[0].style.position = 'fixed';
        }

        if(diff >= window.innerHeight*4) {
            this.overlays[0].style.opacity = 0;
        }
    }

    statPageAnimation(pageN) {
        let overlayChildren = Array.from(this.overlays[pageN].children);
        // animation layer
        let animeRect = this.animationLayer[pageN].getBoundingClientRect();
        // overlay layer
        let overlayRect = this.overlays[pageN].getBoundingClientRect();
        let diff = overlayRect.top - animeRect.top;
        // overlayRect.top, circle_text 
        if(overlayRect.top <= 0) {
            this.overlays[pageN].style.opacity = 1;
            this.overlays[pageN-1].style.opacity = 0;
            overlayChildren[0].firstElementChild.style.opacity = 1;
        } else {
            this.overlays[pageN].style.opacity = 0;
            overlayChildren.forEach((c, i) => {
                if(i == 0) {
                    c.firstElementChild.style.opacity = 0;
                } else {
                    c.style.opacity = 0;
                }
            })
        }
        // headline
        if(diff >= window.innerHeight) {
            overlayChildren[1].style.opacity = 1;
        } else {
            overlayChildren[1].style.opacity = 0;
        }
        // infographic
        if(diff >= window.innerHeight*2) {
            overlayChildren[2].style.opacity = 1;
            overlayChildren[3].style.opacity = 1;
            if(pageN > 1) this.charts[pageN-2].update();
        } else {
            overlayChildren[2].style.opacity = 0;
            overlayChildren[3].style.opacity = 0;
            if(pageN > 1) this.charts[pageN-2].reset();
        }
        // comment
        if(diff >= window.innerHeight*3) {
            overlayChildren[4].style.opacity = 1;
            if(pageN !== 4) this.overlays[pageN].style.position = 'fixed'; // animation layer 500vh 일때
        } else {
            overlayChildren[4].style.opacity = 0;
            if(pageN !== 4) this.overlays[pageN].style.position = "sticky";
        }
        // vanish
        if(diff >= window.innerHeight*4) {
            overlayChildren.forEach((ch, i) => {
                if(i == 0) {
                    ch.firstElementChild.style.opacity = 0;
                } else {
                    ch.style.opacity = 0;
                }
            })
            if(pageN > 1) this.charts[pageN-2].reset();
        }
    }
}
