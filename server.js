const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { runInNewContext } = require('vm');
const cookieParser = require('cookie-parser');
const fs = require('fs');
let port = 8080;

//Cloud Firestore 초기화
var admin = require("firebase-admin");
var serviceAccount = require("./wsc-solutionchallenge-firebase-adminsdk-68gi6-f4eb7752e7.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

//middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//set socket communication
io.on("connection", (socket) => {
    console.log("connected!!!");
});

//main page
app.get('/', async function(req, res){
    const userRef = db.collection("test").doc("user");
    const userDoc = await userRef.get();
    const scoreRef = db.collection("test").doc("score");
    const scoreDoc = await scoreRef.get();
    var count = userDoc.data();
    var score = scoreDoc.data();
    console.log(count);
    console.log(score);
    res.render('index', {Count:count, Score:score});
});

//before test 제출 (POST)
app.post('/before', (req, res) => {
    //이미 before, after test 모두 제출한 경우
    if(req.cookies.before === "done")
        io.emit('alreadyAll',"hello");

    //before test를 제출할 수 있는 경우(처음 제출하는 경우)
    else if(req.cookies.before === undefined){
        //답안지 받아옴(json으로 받아오면 될 듯!)
        var ans = [
            req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4, 
            req.body.answer5, req.body.answer6, req.body.answer7
        ];
        var solution = ["장애인", "5%", "9", "X", "지체장애", "2007", "X"];
        //채점
        var result = 0;
        for(var i=0; i<7; i++){
            if(ans[i] === solution[i])
                result++;
        }
        console.log(result);

        //'before' cookie 채첨된 값으로 생성
        res.cookie('before', result);
        io.sockets.emit('completeBefore');
        res.json(result);
    }
    
    //이미 before test를 제출한 경우
    else
        io.sockets.emit('alreadyBefore');
});

//after test 제출 (POST)
app.post('/after', (req, res) => {
    //이미 before, after test 모두 제출한 경우
    if(req.cookies.before === "done")
        io.sockets.emit('alreadyAll');

    //before test를 제출안하고 after test 제출하려고 하는 경우
    else if(req.cookies.before === undefined)
        io.sockets.emit('goBefore');

    //after test를 제출할 수 있는 경우
    else{
        //답안지 받아옴
        var ans = [
            req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4, 
            req.body.answer5, req.body.answer6, req.body.answer7
        ];
        var solution = ["장애인", "5%", "9", "X", "지체장애", "2007", "X"];

        //채점
        var result = 0;
        for(var i=0; i<7; i++){
            if(ans[i] === solution[i])
                result++;
        }
        //before, after test 점수 저장
        var beforeScore = req.cookies.before;
        var afterScore = result;
        console.log(beforeScore);
        console.log(afterScore);

        //before, after test 모두 제출했으므로, bofore cookie "done"으로 갱신
        res.cookie('before', "done");
        res.json(result);

        //db update후, chart에 반영할 data 읽어오기
        getData(beforeScore, afterScore);
    }
});

//user count update
async function updateCount(){
    //update db test user count(1씩 증가)
    const userRef = db.collection("test").doc("user");
    await userRef.update({
        count: admin.firestore.FieldValue.increment(1)
    });
}

//점수분포 및 상승 여부 update
async function updateScore(beforeScore, afterScore){
    //점수 분포 update
    const scoreIncrease = db.collection("test").doc("score");
    if(beforeScore == 0)
        await scoreIncrease.update({ b0: admin.firestore.FieldValue.increment(1) });
    else if(beforeScore == 1)
        await scoreIncrease.update({ b1: admin.firestore.FieldValue.increment(1) }); 
    else if(beforeScore == 2)
        await scoreIncrease.update({ b2: admin.firestore.FieldValue.increment(1) });
    else if(beforeScore == 3)
        await scoreIncrease.update({ b3: admin.firestore.FieldValue.increment(1) });
    else if(beforeScore == 4)
        await scoreIncrease.update({ b4: admin.firestore.FieldValue.increment(1) });
    else if(beforeScore == 5)
        await scoreIncrease.update({ b5: admin.firestore.FieldValue.increment(1) });
    else if(beforeScore == 6)
        await scoreIncrease.update({ b6: admin.firestore.FieldValue.increment(1) });
    else if(beforeScore == 7)
        await scoreIncrease.update({ b7: admin.firestore.FieldValue.increment(1) });
    else if(beforeScore == 8)
        await scoreIncrease.update({ b8: admin.firestore.FieldValue.increment(1) });

    if(afterScore == 0)
        await scoreIncrease.update({ a0: admin.firestore.FieldValue.increment(1) });
    else if(afterScore == 1)
        await scoreIncrease.update({ a1: admin.firestore.FieldValue.increment(1) }); 
    else if(afterScore == 2)
        await scoreIncrease.update({ a2: admin.firestore.FieldValue.increment(1) });
    else if(afterScore == 3)
        await scoreIncrease.update({ a3: admin.firestore.FieldValue.increment(1) });
    else if(afterScore == 4)
        await scoreIncrease.update({ a4: admin.firestore.FieldValue.increment(1) });
    else if(afterScore == 5)
        await scoreIncrease.update({ a5: admin.firestore.FieldValue.increment(1) });
    else if(afterScore == 6)
        await scoreIncrease.update({ a6: admin.firestore.FieldValue.increment(1) });
    else if(afterScore == 7)
        await scoreIncrease.update({ a7: admin.firestore.FieldValue.increment(1) });
    else if(afterScore == 8)
        await scoreIncrease.update({ a8: admin.firestore.FieldValue.increment(1) });

    //점수의 상승이 있었을 때만 1씩 증가
    if(afterScore - beforeScore > 0){
        await scoreIncrease.update({
            increase: admin.firestore.FieldValue.increment(1)
        });
    }
}

//user count data 읽어오기
async function getUserCount(){
    //test에 참여한 user count update를 await
    await updateCount();
    const userRef = db.collection("test").doc("user");
    const userDoc = await userRef.get();
    return userDoc.data();
}

//score count data 읽어오기
async function getScore(beforeScore, afterScore){
    //score update를 await
    await updateScore(beforeScore, afterScore);
    const scoreRef = db.collection("test").doc("score");
    const scoreDoc = await scoreRef.get();
    return scoreDoc.data();
}

//firestore로부터 읽어들인 data 비동기로 저장 후, socket 통신
async function getData(beforeScore, afterScore){
    const userCount = await getUserCount();
    const score = await getScore(beforeScore, afterScore);
    console.log(userCount);
    console.log(score);
    io.sockets.emit('completeAfter',{Count:userCount, Score:score});
}

server.listen(port, () => {
    console.log("app is running on port "+ port);
});