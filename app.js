const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const mongoose = require('mongoose');
const ejs = require('ejs');


// Express Config
const app = express();
app.set('port', process.env.PORT || 8007);


// DB Config
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once( 'open' , function() {
    console.log("MongoDB connect");
});

mongoose.connect('mongodb://127.0.0.1/express_mongodb_prac',{
    useNewUrlParser: true ,
    useUnifiedTopology: true
});


// Template config
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({extend : false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/board'));


// File upload config
fs.readdir("uploads", (err) => {
    if (err) {
        fs.mkdirSync("uploads");
    }
});


// Server
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'Port Listening');
});