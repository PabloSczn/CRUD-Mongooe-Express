const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        console.log("Mongo Open!")
    })
    .catch(err => {
        console.log("Error occured in Mongo!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/dog', (req, res) => {
    res.send('Woof!');
})


app.listen(3000, () => {
    console.log("App listening in 3000")
})