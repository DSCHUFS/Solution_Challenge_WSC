function checkMobile(){
 
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
 
    if ( varUA.indexOf('android') > -1) {
        //안드로이드
        return "android";
    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
        //IOS
        return "ios";
    } else {
        //아이폰, 안드로이드 외
        return "other";
    }
    
}

function checkKakao() {
    let userAgent = window.navigator.userAgent;
    let isKakao = userAgent.indexOf('KAKAOTALK');
    if(isKakao > -1) {
        return 'kakao'
    } else {
        return 'other'
    }
}

function externalBrowser() {
    if(checkMobile() === 'ios' && checkKakao() === 'kakao') {
        window.open(location.href, '_self');
    }
}

externalBrowser();