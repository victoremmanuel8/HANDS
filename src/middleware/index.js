const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use (express.static(path.join(__dirname, '../client')));

app.get ('/', (req, res) => {
    res.sendFile ('index.html');
});

app.listen (5000, () => {
    console.log ('LIstening on port 5000');
})