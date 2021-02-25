//node email.js 실행시키면, 메일 간다.
const nodemailer = require('nodemailer');
var fs = require('fs');
var firebase = require('firebase');

//email 발신자 정보
const smtpServerURL = 'smtp.gmail.com' //"email SMTP 서버 주소"
const authUser = 'ykoou3040@gmail.com' //"email 계정 아이디 또는 이메일"
const authPass = '0016283040yk!!**' //"email 계정 비밀번호"
const fromEmail = "ykoou3040@gmail.com" //'보내는 사람 이메일 주소'

//firebase 설정 -> 새로 프로젝트 생성한다면, config부분만 바꿔주면 됨.
var config = {
    apiKey: "AIzaSyCZpU0QYlfVGumceSqfMFkVu8qWgdhos0s",
    authDomain: "emailjstest-e001a.firebaseapp.com",
    projectId: "emailjstest-e001a",
    storageBucket: "emailjstest-e001a.appspot.com",
    messagingSenderId: "80123653326",
    appId: "1:80123653326:web:5dde7b9911f6db88adb49f"
};
firebase.initializeApp(config);
var db = firebase.firestore();


//email send 코드
function sendEmail(toEmail, title) {    
    let transporter = nodemailer.createTransport({
        host: smtpServerURL,    //SMTP 서버 주소
        secure: true,           //보안 서버 사용 false로 적용시 port 옵션 추가 필요
        auth: {
            user: authUser,     //메일서버 계정
            pass: authPass      //메일서버 비번
        }
    });

    //testmail.html에 메일 내용 작성
    fs.readFile('testmail.html', {encoding: 'utf-8'}, function(err, html){
        if(err) {
            console.log(err);
        }else {
            let mailOptions = {
                from: fromEmail,        //보내는 사람 주소
                to: toEmail ,           //받는 사람 주소
                subject: title,         //제목
                html: html
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    //에러
                    console.log(error);
                }
                //전송 완료
                console.log("Finish sending email : " + info.response);        
                transporter.close()
            });
        }
    });
}
    
//firebase에서 받아온 이메일주소들을 반복문을 돌면서 sendEMail
// sendEmail("상대방@이메일주소", "메일 제목")

const emails = db.collection('emailall');
emails.get().then(function(snapshot) {
    if(snapshot) {
        snapshot.forEach(function(doc){
            let docs = doc.data();
            //console.log(doc.id);
            for(let item in docs) {
                console.log('key: ' + item);
                console.log('value: ' + docs[item]);
                var ea = docs[item];
                sendEmail(ea, 'FireBase TEST');
            }
        });
    } else{
        console.log("No document!");
    }
}).catch(function(error){
    console.log("Error getting document:", error);
});