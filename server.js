const express = require('express');
const { runInNewContext } = require('vm');

const app = express();

//middleware
app.use(express.static(__dirname + '/public'));

//main page
app.get('/', (req, res) => {
    fs.readFile('public/index.html', (error, data) =>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

//news letter page
app.get('/newsletter', (req, res) => {
    fs.readFile('public/newsletter.html', (error, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

//data page (추가적인 데이터 페이지)
app.get('/data', (req, res) => {
    fs.readFile('public/data.html', (error, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

app.listen(3000, () => {
    console.log("app is running on port 3000");
});