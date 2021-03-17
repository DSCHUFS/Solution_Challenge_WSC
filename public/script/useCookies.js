function checkSubmitTest() {
    let cookies = Cookies.get();
    if (cookies.before) {
        $('#before-test-container').hide();
        $('#beforeResult').show();
    }

    if (cookies.test === "done") {
        $('#after-test-container').hide();
        $('#afterResult').show();
    }
}



function afterSubmitPageTransition() {
    let cookies = Cookies.get();
    if(cookies.curPage) {
        gsap.to('#root', { duration: 0, scrollTo: { y: cookies.curPage, offsetY: 0 } } );
    } else {
        gsap.to('#root', { duration: 0, scrollTo: { y: '#main_top', offsetY: 0 } } );
    }
}



