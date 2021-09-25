const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const link = require('./link');

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/joinMeet', (req, res) => {
    var theLink = req.body.meetlink;
    link(theLink);
    res.redirect('/');

});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});

