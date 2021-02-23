window.onload = () => {
    let pa = new PageAnimation();
    window.addEventListener('scroll', e => {
        let i = window.pageYOffset;
        pa.imgParallaxScroll(i);
        for(let j=0; j<5; j++) {
            if(j == 0) {
                pa.firstPageAnimation(i);
            } else {
                if(i >= window.innerHeight*(5*j-1) && i <= window.innerHeight * (5*j+6)) {
                    pa.statPageAnimation(j)
                };
            }
        }
    })
}