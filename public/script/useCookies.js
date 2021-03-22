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
    if (cookies.curPage) {
        gsap.to('#root', { duration: 0, scrollTo: { y: cookies.curPage, offsetY: 0 } });
    } else {
        gsap.to('#root', { duration: 0, scrollTo: { y: '#main_top', offsetY: 0 } });
    }
}

function checkTestDone() {
    let ownScore = document.querySelectorAll('.own-score.chart-comment');
    let lastChartComment = document.querySelector('#last-score-comment');
    let notYet = document.querySelector('.not-yet-test');
    let cookies = Cookies.get();
    if (cookies.test === 'done') {
        ownScore.forEach(ownScore => {
            $(ownScore).show();
        })
        $(lastChartComment).show();
        $(notYet).hide();
    } else {
        ownScore.forEach(ownScore => {
            $(ownScore).hide();
        })
        $(lastChartComment).hide();
        $(notYet).show();
    }
}