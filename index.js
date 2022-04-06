const express = require("express");
const app = express();
//const port = 3000;
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const uri = "mongodb+srv://dbMongo:pa55word@cluster0.trvjy.mongodb.net/booklist?retryWrites=true&w=majority";

const router = require('./router');

app.use(express.json());
app.use(router);

app.get('/test', (req, res) => res.send("Book list test!"));
//app.get('/', (req, res) => res.send("Hello Express!"));

mongoose.connect(uri);
app.listen(port, () =>
    console.log(`Example app listening on http://localhost:${port}`)
)

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function callback() {
    console.log("Database Connected");
})

