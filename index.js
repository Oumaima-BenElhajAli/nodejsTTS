const express = require('express')
const bodyparser = require('body-parser')
const say = require('say')
const app = express()
var gtts = require('node-gtts')('en')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    var text = req.body.text
    say.speak(text, 'Alex', 1,'en')
    var path = require('path');
    var filename = Date.now()+'voice.mp3'
    var filepath = path.join(__dirname+"/Voices", filename);

    gtts.save(filepath, text, function() {
        console.log('save done');
    })
    
})

app.listen(5001, function () {
    console.log("Server is listening on Port 5001")
})