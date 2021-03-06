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

app.listen(3000, () => {
    console.log("app is running on port 3000");
});