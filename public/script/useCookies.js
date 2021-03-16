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

