const express = require("express");
const app = express();
//const port = 3000;
var cors = require('cors');
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const uri = "mongodb+srv://dbMongo:pa55word@cluster0.trvjy.mongodb.net/booklist?retryWrites=true&w=majority";

const router = require('./router');

app.use(cors({
    origin: function(origin,callback){
      
    
      return callback(null, true);
    }
  
  }))
// whitelist
// let whitelist = ['http://localhost:3000', 'https://www.bliss-bakery.co.uk']
// // view engine setup
// app.use(cors({
//   origin: function(origin,callback){
    
//     //if(!origin) return callback(null, true);
//     if(whitelist.indexOf(origin) === -1){
      
//       var message = 'The CORS policy for this origin doesnt ' +
//                 'allow access from the particular origin.';
//       console.log(message,origin);
//       return callback(new Error(message), false);
//     }
//     return callback(null, true);
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

