const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/postdata', (req, res) => {
    console.log(req.body)
});

app.get('/api/test', (req, res) => {
    res.send('ok?')
})

app.listen(port, () => console.log(`Listening on port ${port}`));