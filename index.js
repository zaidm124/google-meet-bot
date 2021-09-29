const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const link = require('./link');
const theLiveTimer = require('../google-meet-bot/timer/timer');

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/joinButton', (req, res) => {
    res.sendFile(__dirname + '/joinButton.html');
});

app.post('/joinMeet', (req, res) => {
    var theLink = req.body.meetlink;
    link(theLink);
    res.redirect('/joinButton');
});

app.post('/activateBot', (req, res) => {
    setInterval(theLiveTimer, 1000);
    res.redirect('/joinButton');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});

