const express = require('express');
const { runInNewContext } = require('vm');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();

//Cloud Firestore 초기화
var admin = require("firebase-admin");
var serviceAccount = require("./wsc-solutionchallenge-firebase-adminsdk-68gi6-f4eb7752e7.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

//Create our initial store
//테스트 참여자 수
db.collection("test").doc("user").set({
    count: 0
});
//before, after test 점수 비교하여 상승한 사람 수
db.collection("test").doc("score").set({
    increase: 0
});

//middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//main page
app.get('/', (req, res) => {
    res.render('index');
});

//before test 제출 (POST)
app.post('/before', (req, res) => {
    //답안지 받아옴(json으로 받아오면 될 듯!)

    //채점
    var result = req.body.score;
    console.log(result);

    //'before' cookie 채첨된 값으로 생성
    res.cookie('before', result);
    res.json(result);
});

//after test 제출 (POST)
app.post('/after', (req, res) => {
    //답안지 받아옴

    //채점
    var result = req.body.score;

    //update db test user count(1씩 증가)
    const userCount = db.collection("test").doc("user");
    userCount.update({
        count: admin.firestore.FieldValue.increment(1)
    });

    //before, after test 점수 저장
    var beforeScore = req.cookies.before;
    var afterScore;

    if(beforeScore === undefined){  //before test에 임하지 않고, after test에만 참여하려 했을 때
        res.error();
    } else if(beforeScore === "done already"){  //이미 두 테스트 모두 제출한 경우
        res.json("done already");
    } else {    
        afterScore = result;
    }

    console.log(beforeScore);
    console.log(afterScore);

    //db test 상승 여부 count update
    const scoreIncrease = db.collection("test").doc("score");

    //점수의 상승이 있었을 때만 1씩 증가
    if(afterScore - beforeScore > 0){
        scoreIncrease.update({
            increase: admin.firestore.FieldValue.increment(1)
        });
    }

    //after test 제출 후, before cookie에 특정 값 주어
    //두 테스트 모두 통과한 user와 before test에 임하지 않고 after test를 제출하려는 user 구분
    res.cookie('before', "done already");
    res.json(result);
});

app.listen(3000, () => {
    console.log("app is running on port 3000");
});