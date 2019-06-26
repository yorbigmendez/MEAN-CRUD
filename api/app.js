const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Connect to mongodb
mongoose.connect('mongodb+srv://admin:admin@cluster0-2wmts.mongodb.net/test_hrdb?retryWrites=true&w=majority', { useNewUrlParser: true });
const port = 3000;;

// Allows cross-origin domains to access this API
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

// BodyParser middleware
app.use(bodyParser.json());

app.use('/employee', require('./routes/employeeRouter.js'));
app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})
